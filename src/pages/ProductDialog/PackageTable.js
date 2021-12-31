import React, {useEffect, useRef, useState} from 'react';
import 'handsontable/dist/handsontable.full.css';
import PropTypes from 'prop-types';
import {Button, Grid, Typography} from "@material-ui/core";
import {HotTable} from "@handsontable/react";
import ProductAPI from "../../api/ProductAPI";
import {CostEditor, PriceEditor} from "./editors";
import config from "react-global-configuration";
import {EllipsisTextRenderer} from "../../components/GenTable/renderers";


const delivery_options = config.get('delivery_options', [])
const purity_options = config.get('purity_options', [])

const columns = [
    {data:'id', title: 'ID', width:20, searchable: true, type:'text', readOnly: true},
    {data:'brand', title: '品牌', width:30, searchable: true, type:'text', readOnly: true},
    {data:'cat_no', title: '货号', width:50, searchable: true, type:'text', readOnly: true},
    {data:'package', title: '规格', width:50, searchable: true, type:'text'},
    {data:'purity', title: '纯度', width:50, searchable: true, type:'autocomplete', source: purity_options},
    {data:'cost', title: '成本', width:50, searchable: true, type:'numeric', editor: CostEditor},
    {data:'price', title: '价格', width:50, searchable: true, type:'numeric', editor: PriceEditor},
    {data:'delivery', title: '货期', width:50, searchable: true, type:'autocomplete', source: delivery_options},
    {data:'price_expiry_date', title: '价格有效期', width:50, searchable: true, type:'date', },
    {data:'remark', title: '备注', width:50, searchable: true, type:'text', renderer: EllipsisTextRenderer},
    {data:'modified_at', title: '修改日期', width:50, searchable: true, type:'date', readOnly: true},
    {data:'created_by', title: '修改人', width:50, searchable: true, type:'text', readOnly: true},
]


PackageTable.propTypes = {
    cat_no: PropTypes.string.isRequired,
    purity: PropTypes.string,
};

function PackageTable(props) {
    const {cat_no, purity, onPackagesChange} = props
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [changedRows, setChangedRows] = useState([])
    const hot = useRef()

    useEffect(()=>{
        if(!cat_no){
            setData([])
            return
        }
        ProductAPI.get_product_packages({cat_no})
            .then(data=>setData(data))
            .catch(()=>{})

    }, [cat_no])

    useEffect(() => {
        if(typeof onPackagesChange !== 'function'){return}
        onPackagesChange(data)
    }, [data])

    const handleAdd = ()=>{
        setData(data=>data.concat([{
            cat_no: cat_no,
            brand: 'cato',
            purity: purity,
        }]))
        setChangedRows(data=>data.map(value => value+1))
    }

    const handleDelete = ()=>{
        const instance = hot.current?.hotInstance
        if(!instance){return}
        alert('还没搞')
    }

    const handleSave = ()=>{
        const {cat_no} = props
        if(!cat_no){return}
        let changedRowsSet = new Set(changedRows)
        const diff = data.filter((value, index)=>{
            if(!!value.package){return true}
            if(changedRowsSet.has(index)){return true}
        })
        setLoading(true)
        ProductAPI.upsert_product_packages({
            cat_no: cat_no,
            packages: diff
        }).then(value=>{
            if(!value){return}
            setData(value)
            setChangedRows([])
        }).finally(()=>{
            setLoading(false)
        })
    }

    const handleHotChange = (changes) => {
        if(!changes){return}
        let set = new Set(changedRows)
        changes.forEach(([row, , oldValue, newValue]) => {
            if(oldValue===newValue){return}
            if(set.has(row)){return}
            setChangedRows(data=>[...data, row])
            set.add(row)
        });
    }

    return (
        <React.Fragment>
            <Typography variant={'h5'}>产品规格</Typography>
            <Grid container direction={"row"} spacing={1}>
                <Grid item>
                    <Button onClick={handleAdd}>新增</Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleDelete}>删行</Button>
                </Grid>
                <Grid item>
                    <Button
                        color={"secondary"} disabled={changedRows.length===0 || loading}
                        onClick={handleSave}
                    >保存
                    </Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item style={{flexGrow: 1}}>
                    <HotTable
                        id="hot"
                        licenseKey={'non-commercial-and-evaluation'}
                        style={{overflowX: 'scroll'}}
                        ref={hot}
                        settings={{
                            height: 200,
                            width: '100%',
                            stretchH:"all",
                            colHeaders: true,
                            manualColumnResize: true,
                            manualColumnMove: true,
                            outsideClickDeselects: false,
                            columns:columns,
                        }}
                        data={data}
                        dateFormat={'YYYY-MM-DD'}
                        afterChange={handleHotChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default PackageTable;