import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import ReactECharts from "echarts-for-react";
import {transform} from 'echarts-stat';
import * as echarts from 'echarts';

echarts.registerTransform(transform.regression);

const unit_ratio = {
    'μg': 0.001,
    'μl': 1,
    'mg': 1,
    'g': 1000,
    'ml': 1000,
    'kg': 1000000,
    'l': 1000000,
}

function normalize_package(package_name) {
    // 转为mg为单位的数量
    const g = /(?<quantity>\d+(\.\d+)?)\s?(?<unit>[μmMkK]?[gGlLtT])/.exec(package_name)?.groups
    if(!g){return}
    const unit = (g.unit || 'mg').toLowerCase()
    return parseFloat(g.quantity) * unit_ratio[unit]
}

SupplierQuotationChart.propTypes = {
    quotations: PropTypes.arrayOf(PropTypes.object).isRequired,
    packages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function SupplierQuotationChart({quotations=[], packages=[]}) {
    const echartRef = useRef();

    useEffect(()=>{
        const getInstance = echartRef.current?.getEchartsInstance
        if(typeof getInstance !== 'function'){return}
        const echartInstance = echartRef.current?.getEchartsInstance();
        echartInstance.setOption(getOption())
    }, [quotations, packages])


    const processPackages=()=>{
        if(!packages) {return []}
        return packages.filter(item=>item.price!==0).map(item=>{
            const quantity = normalize_package(item.package)
            return [quantity, item.price]
        })
    }

    const processQuotations=()=>{
        if(!quotations){return []}
        let suppliers_set = new Set()
        const sortedRows = [...quotations].sort((a, b)=>(a.quantity - b.quantity))
        sortedRows.filter(item=>(!!item.supplier_name)).map(item=>suppliers_set.add(item.supplier_name))
        const suppliers = [...suppliers_set]
        const today = new Date()
        return suppliers.map(supplier_name=>{
            return {
                name: supplier_name, type: 'scatter',
                encode: {x: 0, y: 1, tooltip: [2, 0, 1, 3]},
                data: sortedRows.filter(item=>item.supplier_name===supplier_name)
                    .map(item=>(
                        [
                            item.quantity, item.price, item.supplier_name, item.created_at,
                            (today - Date.parse(item.created_at)) / (1000 * 3600 * 24)
                        ]))
            }
        })
    }


    const getOption=()=>{
        return {
            title: {text: '供应商报价记录'},
            xAxis: {name: '规格数量(mg)', nameLocation: 'center'},
            yAxis: {name: '供应商报价'}, nameLocation: 'center',
            legend: {},
            dataZoom: {},
            tooltip: {},
            dataset: [
                {source: processPackages(),},
                {
                    transform: {
                        type: 'ecStat:regression',
                        config: {
                            method: 'logarithmic'
                        }
                    }
                }
            ],
            series: [
                ...processQuotations(),
                {
                    name: 'PackagePrice', type: 'scatter',
                    datasetIndex: 0,
                    encode: {x: 0, y: 1, tooltip: [2, 0, ]},
                },
                {
                    name: '价格趋势线',
                    type: 'line',
                    smooth: true,
                    datasetIndex: 1,
                    symbolSize: 0.1,
                    symbol: 'circle',
                    label: { show: true, fontSize: 16 },
                    labelLayout: { dx: -80 },
                    encode: { label: 2, tooltip: 1 }
                }
            ],
            visualMap: {
                show: false,
                dimension: 4,
                inRange: {
                    colorLightness: [0.5, 0.85]
                }
            },
        }
    }

    return (
        <ReactECharts
            ref={echartRef}
            option={getOption()}
            style={{width: '100%',}}
        />
    );
}

export default SupplierQuotationChart;