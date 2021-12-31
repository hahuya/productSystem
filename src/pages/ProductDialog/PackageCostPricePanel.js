import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import {HotTable} from "@handsontable/react";
import InternalQuotationAPI from "../../api/InternalQuotationAPI";
import PackageTable from "./PackageTable";
import SupplierQuotationChart from "../InternalQuotation/Dialog/SupplierQuotationChart";
import config from 'react-global-configuration';
import ProductAPI from "../../api/ProductAPI";
import SupplierQuotationAPI from "../../api/SupplierQuotationAPI";

const currency_options = config.get('currency_options', [])
const delivery_options = config.get('delivery_options', [])


const columns = [
    {data:'id', title: 'ID', width:20, searchable: true, type:'numeric', readOnly: true},
    {data:'source_type', title: '来源', width:35, searchable: true, type:'text', readOnly: true},
    // {data:'supplier_id', title: '供应商ID', width:20, searchable: true, type:'numeric', hidden:true},
    {data:'inter_quotation_id', title: '报价单ID', width:25, searchable: true, type:'numeric',hidden:true, readOnly: true},
    {data:'supplier_name', title: '供应商名称', width:50, searchable: true, type:'text',},
    {data:'cat_no', title: '货号', width:50, searchable: true, type:'text'},
    {data:'quantity', title: '数量(mg)', width:40, searchable: true, type:'numeric',},
    {data:'price', title: '含税价格', width:50, searchable: true, type:'numeric',},
    {data:'currency', title: '货币', width:30, searchable: true, type:'autocomplete', source: currency_options},
    {data:'delivery', title: '货期', width:50, searchable: true, type:'autocomplete', source: delivery_options},
    {data:'with_vat', title: '增票', width:30, searchable: true, type:'checkbox', },
    {data:'synthetic', title: '定制', width:30, searchable: true, type:'checkbox', },
    {data:'expiry', title: '价格有效期', width:50, searchable: true, type:'date'},
    {data:'remark', title: '备注', width:50, searchable: true, type:'text',},
    {data:'status', title: '状态', width:20, searchable: true, type:'text', },
    {data:'modified_by', title: '修改人', width:30, searchable: true, type:'text', readOnly: true},
    {data:'modified_at', title: '修改日期', width:50, searchable: true, type:'date', readOnly: true},
    {data:'created_by', title: '创建人', width:30, searchable: true, type:'text', readOnly: true},
    {data:'created_at', title: '创建日期', width:50, searchable: true, type:'date', readOnly: true},
]


PackageCostPricePanel.propTypes = {
    inter_quo_id: PropTypes.number,
    cat_no: PropTypes.string,
    purity: PropTypes.string,
};

function PackageCostPricePanel(props) {
    const {inter_quo_id, cat_no, purity} = props
    const [quotations, setQuotations] = useState([])
    const [packages, setPackages] = useState([])
    const [changedRows, setChangedRows] = useState([])
    const hot = useRef()

    const refreshQuotations = ()=>{
        if(!!inter_quo_id){
            InternalQuotationAPI.get_related_supplier_quotations({
                id: inter_quo_id,
                cat_no: cat_no,
            }).then(data=> {(data && setQuotations(data))})
        }else{
            ProductAPI.get_supplier_quotation({cat_no})
                .then(data=> {(data && setQuotations(data.data))})
        }
    }

    useEffect(()=>{
        if(!cat_no && !inter_quo_id){
            setQuotations([])
            return
        }
        refreshQuotations()
    }, [inter_quo_id, cat_no])

    const handleAdd = () =>{
        setQuotations(items=>[{
            source_type: '手动录入',
            inter_quotation_id: inter_quo_id,
            cat_no: cat_no || "",
            currency: currency_options[0],
            delivery: delivery_options[0],
        }, ...items])
        setChangedRows(data=>data.map(value => value+1))
    }

    const handleSave = () =>{
        let changedRowsSet = new Set(changedRows)
        const diff = quotations.filter((value, index)=>{
            if(!value.id && !!value.supplier_name){return true}
            if(changedRowsSet.has(index)){return true}
        })
        if(!diff || diff.length===0){return}
        if(!!inter_quo_id){
            InternalQuotationAPI.upsert_related_supplier_quotations({
                id: inter_quo_id, data: diff, cat_no: cat_no
            })
                .then(data=> {
                    if(!data){return}
                    setQuotations(data)
                    setChangedRows([])
                })
        }else{
            SupplierQuotationAPI.bulk_upsert(quotations).then(data=> {
                setQuotations(data)
                setChangedRows([])
            })
        }
    }

    const handleHotChange = (changes) =>{
        if(!changes){return}
        let set = new Set(changedRows)
        changes.forEach(([row, , oldValue, newValue]) => {
            if(oldValue===newValue){return}
            if(set.has(row)){return}
            setChangedRows(data=>[...data, row])
            set.add(row)
        });
    }

    const handleRevoke = () => {
        const instance = hot.current?.hotInstance
        if(!instance){return}
        const [[start_row, , , ]] = instance.getSelected()
        const record = instance.getSourceDataAtRow(start_row)
        if(!record.id){return}
        SupplierQuotationAPI.revoke(record.id)
            .then(()=>{
                refreshQuotations()
            })
    }

    return (
        <Card>
            <CardContent>
                <Grid container direction={"row"}>
                    <Grid item xs={6}>
                        <SupplierQuotationChart quotations={quotations} packages={packages}/>
                    </Grid>
                    <Grid item xs={6}>
                        <PackageTable cat_no={cat_no} purity={purity} onPackagesChange={(data)=>setPackages(data)}/>
                    </Grid>
                </Grid>
                <Typography variant={"h5"}>供应商询报价记录</Typography>
                <Grid container direction={"row"} spacing={1}>
                    <Grid item>
                        <Button color={"secondary"} disabled={changedRows.length===0} onClick={handleSave}>保存</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleAdd}>新增</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleRevoke}>作废</Button>
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
                                stretchH: "all",
                                colHeaders: true,
                                manualColumnResize: true,
                                manualColumnMove: true,
                                outsideClickDeselects: false,
                                columns:columns,
                                afterChange: handleHotChange
                            }}
                            dateFormat={'YYYY-MM-DD'}
                            data={quotations}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default PackageCostPricePanel;