import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, DialogActions, DialogContent, Grid, Typography} from "@material-ui/core";
import DefaultSpinner from "../../../components/base/DefaultSpinner";
import DraggableDialog from "../../../components/base/DraggableDialog";
import {HotTable} from "@handsontable/react";
import config from "react-global-configuration";
import SupplierQuotationAPI from "../../../api/SupplierQuotationAPI";
import ProductAPI from "../../../api/ProductAPI";


const currency_options = config.get('currency_options', [])
const delivery_options = config.get('delivery_options', [])


SuppQuoBulkAddDialog.propTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
};

const hotAutoCatNo = (query, process)=>{
    ProductAPI.get_products_simple({keyword: query}).then(data=>{
        process(data.map(value=>value.cat_no))
    })
}

const columns = [
    {data:'id', title: 'ID', width:20, searchable: true, type:'text', readOnly: true},
    {data:'supplier_name', title: '供应商名称', width:80, searchable: true, type:'text'},
    // {data:'supplier_id', title: '供应商ID', width:80, searchable: true, type:'text'},
    {data:'cat_no', title: '货号', width:70, searchable: true, type:'autocomplete', required:true, source: hotAutoCatNo, strict: true},
    {data:'quantity', title: '数量(mg)', width:40, searchable: true, type:'numeric'},
    {data:'price', title: '价格', width:40, searchable: true, type:'numeric'},
    {data:'currency', title: '货币', width:50, searchable: true, type:'autocomplete', source: currency_options},
    {data:'delivery', title: '货期', width:80, searchable: true, type:'autocomplete', source: delivery_options},
    {data:'remark', title: '备注', width:100, searchable: true, type:'text'},
    {data:'with_vat', title: '增票', width:40, searchable: true, type:'checkbox'},
    {data:'synthetic', title: '定制合成', width:40, searchable: true, type:'checkbox'},
    {data:'expiry', title: '有效期', width:70, searchable: true, type:'date'},
    {data:'status', title: '状态', width:40, searchable: true, type:'text', readOnly: true},
    {data:'source_type', title: '来源', width:50, searchable: true, type:'text', readOnly: true},
    {data:'created_by', title: '新建人', width:40, searchable: true, type:'text', readOnly: true},
    {data:'created_at', title: '新建日期', width:70, searchable: true, type:'date', readOnly: true},
    {data:'modified_by', title: '修改人', width:40, searchable: true, type:'text', readOnly: true},
    {data:'modified_at', title: '修改日期', width:70, searchable: true, type:'date', readOnly: true},
]

function SuppQuoBulkAddDialog(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [disableSave, setDisableSave] = useState(false)
    const hot = useRef()

    useEffect(()=>{
        const {data} = props
        if(!props.open){
            setData([])
            setLoading(false)
            setDisableSave(false)
        }else if(!!data?.id){
            setData([data])
        }
    }, [props.open])

    const handleAddRow =()=>{
        setData(oldData=>[{
            source_type: '手动录入',
            inter_quotation_id: null,
            cat_no: "",
            currency: currency_options[0],
            delivery: delivery_options[0],
        }, ...oldData])
    }

    const handleSave =()=>{
        setLoading(true)
        SupplierQuotationAPI.bulk_upsert(data)
            .then((data)=>{
                setData(data)
                // setDisableSave(true)
            })
            .finally(()=>setLoading(false))
    }

    const handleDeleteRow = ()=>{
        const instance = hot.current.hotInstance
        if(!instance){return}
        const [[startRow, , endRow, ]] = instance.getSelected()
        setData(oldData=>(
            oldData.filter((value, index) => (!(index>=startRow && index <=endRow)))
        ))
    }

    return (
        <DraggableDialog
            title={<Typography>供应商报价录入</Typography>}
            handleClose={props.handleClose} open={props.open}
            maxWidth={'xl'}
        >
            <DefaultSpinner open={loading} />
            <DialogContent>
                <Grid container style={{minWidth: '1000px'}}>
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
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteRow}>删除行</Button>
                <Button onClick={handleAddRow}>新增行</Button>
                <Button onClick={handleSave} color={"secondary"} disabled={disableSave}>保存</Button>
            </DialogActions>
        </DraggableDialog>
    );
}

export default SuppQuoBulkAddDialog;