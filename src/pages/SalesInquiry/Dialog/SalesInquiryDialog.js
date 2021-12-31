import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DraggableDialog from "../../../components/base/DraggableDialog";
import {DialogActions, DialogContent, Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormPart from "../../../components/base/FormPart";
import {useFormik} from "formik";
import CustomerInquiryAPI from "../../../api/CustomerInquiryAPI";
import DefaultSpinner from "../../../components/base/DefaultSpinner";
import SalesInquiryItemTable from "./SalesInquiryItemTable";
import {ContactField, CustomerField, DiscountField, SalesField} from "./inputFields";
import SalesActivities from "../../SalesActivity/Dialog/SalesActivities";
import ExportBtn from "../../../components/ExportBtn/ExportBtn";


const textFields = [
    {data: "code", label: "单据号", disabled: true, width: 2},
    {data: "created_by", label: "创建人", disabled: true, width: 1},
    {data: "customer_name", label: "客户名称", component: CustomerField, width: 2},
    {data: "sales_name", label: "销售人员", component: SalesField, width: 2},
    {data: "contact_name", label: "客户联系人", width: 1, component: ContactField},
    {data: "discount", label: "整单折扣", component: DiscountField, width: 1},
    {data: "remark", label: "备注", width: 3},
]
const initialValues = textFields.reduce((dict, item)=> {
    dict[item.data] = item.default || ''
    return dict
}, {})


SalesInquiryDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};

function SalesInquiryDialog(props) {
    const [loading, setLoading] = useState(false)
    const [forCreate, setForCreate] = useState(false)
    const [changed, setChanged] = useState(0)
    const [summary, setSummary] = useState({})
    const formik = useFormik({
        initialValues: {
            ...initialValues,
            children: []
        },
        onSubmit: () => {},
        onReset: values => {
            values['children'] = []
        }
    })

    useEffect(()=>{
        if(formik.values.children?.length>0){
            if(!!formik.values.sales_name){return}
            const first = formik.values.children[0]
            formik.setFieldValue('sales_name', first?.sales_name)
        }
    }, [formik.values.id, formik.values.children])

    useEffect(()=>{
        if(!!formik.values?.id){
            setForCreate(false)
        }else{
            setForCreate(true)
        }
    }, [formik.values?.id])


    useEffect(()=>{
        const {data} = props;
        if(props.open===false){
            formik.resetForm()
            return
        }
        if(!(data?.parent_id)){return}
        setLoading(true)
        setChanged(0)
        CustomerInquiryAPI.get_data(data)
            .then(data=> {
                if(!data || data==={}){return}
                formik.setValues(data)
            })
            .finally(()=>{setLoading(false)})
    },[props.open])

    const handleSave=()=>{
        let func
        if(forCreate){
            func = CustomerInquiryAPI.add_inquiry
        }else{
            func = CustomerInquiryAPI.edit_inquiry
        }
        setLoading(true)
        func(formik.values)
            .then(data=>{
                if(!data){return}
                formik.setValues(data)
                setForCreate(false)
                setChanged(0)
            })
            .finally(()=>{setLoading(false)})
    }

    const handleSubmit=()=>{
        setLoading(true)
        CustomerInquiryAPI.submit_inquiry(formik.values)
            .then(data=>{
                if(!data){return}
                formik.setValues(data)
            })
            .finally(()=>{setLoading(false)})
    }

    const handleDelete=()=>{
        if(!formik.values.id){return}
        setLoading(true)
        CustomerInquiryAPI.delete_inquiry(formik.values.id)
            .then(()=>props.handleClose())
            .finally(()=>setLoading(false))
    }

    const handleTemplateClick = (e, item)=>{
        CustomerInquiryAPI.export_quotation({inquiry_id: formik.values.id, template_id: item.id})
    }

    useEffect(()=>{
        const {children} = formik.values
        const validDiscounts = children?.map(item=>parseFloat(item.quotation?.discount))?.filter(item=>!!item)
        setSummary({
            count: children?.length - 1,
            sum_quantity: children?.map(item=>item.quantity).filter(item=>!!item).reduce((a, b)=>parseInt(a)+parseInt(b), 0),
            sum_offer_price: children?.map(item=>item.quantity * item.quotation?.offer_price).filter(item=>!!item).reduce((a,b)=>a+b, 0),
            count_inter_quo: children?.filter(item=>!!item?.inter_quo?.id).length,
            count_closed_inter_quo: children?.filter(item=>item?.inter_quo?.status==='已报价').length,
            avg_discount: validDiscounts?.reduce((a,b)=>(a+b), 0) / validDiscounts?.length
        })
    }, [changed, formik.values.id])

    return (
        <DraggableDialog
            title={<Typography>询价&报价面板 {formik.values?.id || ""}</Typography>}
            handleClose={props.handleClose} open={props.open}
            maxWidth={'xl'}
            fullWidth
        >
            <DefaultSpinner open={loading}/>
            <DialogContent>
                <FormPart fields={textFields} formik={formik} forCreate={forCreate}/>
                <SalesInquiryItemTable formik={formik} changed={Boolean(changed)} setChanged={setChanged}/>
                <SalesActivities customer_id={formik.values?.customer_id}/>
            </DialogContent>
            <DialogActions style={{justifyContent: 'space-between'}}>
                <Grid item>
                    <Typography>
                        <b>计数:</b> {summary.count}
                        | <b>数量合计:</b> {summary.sum_quantity}
                        | <b>报价合计:</b> {summary.sum_offer_price?.toFixed(2)}
                        | <b>平均折扣:</b> {summary.avg_discount?.toFixed(2)}
                        | <b>内部报价情况:</b> {summary.count_closed_inter_quo}/{summary.count_inter_quo}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button onClick={handleSave} color={changed===0?"primary":"secondary"}>保存</Button>
                    <Button onClick={handleSubmit} disabled={!formik.values.id}>提交</Button>
                    <ExportBtn template_type={'quotation'} onTemplateClick={handleTemplateClick} label={'导出报价单'}/>
                    <Button disabled>下推销售订单</Button>
                    <Button onClick={handleDelete} color={"secondary"}>删除</Button>
                </Grid>
            </DialogActions>
        </DraggableDialog>
    );
}

export default SalesInquiryDialog;