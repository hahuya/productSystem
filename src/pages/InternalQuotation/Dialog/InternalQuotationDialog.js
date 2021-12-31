import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import DraggableDialog from "../../../components/base/DraggableDialog";
import {
    Button,
    DialogActions,
    DialogContent, Grid,
    Typography,
} from "@material-ui/core";
import {useFormik} from "formik";
import InternalQuotationAPI from "../../../api/InternalQuotationAPI";
import InquiryInfo from "./InquiryInfo";
import InterQuotationForm from "./InterQuotationForm";
import PackageCostPricePanel from "../../ProductDialog/PackageCostPricePanel";
import DefaultSpinner from "../../../components/base/DefaultSpinner";
import ButtonWithModel from "../../../components/base/ButtonWithModel";

InternalQuotationDialog.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};

const initialValues = {
id: "",
cat_no: "",
cn_name: "",
en_name: "",
cas: "",
package: "",
quantity: "",
remark: "",
cost: "",
price: "",
delivery: "",
is_synthetic: "",
expiry: "",
}

const statusCannotSubmit = ['已报价', '已退单']

function InternalQuotationDialog(props) {
    const {data, open} = props
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            setLoading(true)
            InternalQuotationAPI.edit_data(values)
                .then(data=>{
                    if(!data || data === {}){return}
                    formik.setValues(data)
                })
                .finally(()=>setLoading(false))
        }
    })

    const canSubmitEditReject = statusCannotSubmit.indexOf(formik.values.status)===-1
    const canAlter = formik.values.status==='已报价'

    const handleSaveNSubmit = ()=>{
        setLoading(true)
        const {values} = formik
        InternalQuotationAPI.save_n_submit(values)
            .then(data=>{
                if(!data || data === {}){return}
                formik.setValues(data)
            })
            .finally(()=>setLoading(false))
    }

    const handleReject =()=>{
        const {values} = formik
        if(!values.remark){
            alert('请填写备注')
            return
        }
        setLoading(true)
        InternalQuotationAPI.reject(values)
            .then(data=>{
                if(!data || data === {}){return}
                formik.setValues(data)
            }).finally(()=>setLoading(false))
    }

    const handleAlter =()=>{
        const {values} = formik
        InternalQuotationAPI.alter(values)
            .then(data=>{
                if(!data || data === {}){return}
                formik.setValues(data)
            })
            .finally(()=>setLoading(false))
    }

    useEffect(()=>{
        const {data} = props;
        if(props.open===false){
            formik.resetForm()
            return
        }
        if(!(data?.id)){return}
        setLoading(true)
        InternalQuotationAPI.get_data(data)
            .then(data=> {
                if(!data || data==={}){return}
                formik.setValues(data)
            })
            .finally(()=>{setLoading(false)})
    },[open])


    const memoInquiryInfo = useMemo(()=><InquiryInfo formik={formik}/>, [loading])
    const memoSupplierInquiryTables = useMemo(
        ()=>(
            <PackageCostPricePanel
                cat_no={data?.cat_no || formik.values.cat_no}
                purity={formik.values.purity}
                inter_quo_id={data?.id}
                open={open}
            />),
        [data?.id, open, formik.values.cat_no]
    )

    return (
        <DraggableDialog
            title={<Typography>报价面板 状态：{formik.values.status || ''}</Typography>}
            handleClose={props.handleClose} open={props.open}
            maxWidth={'xl'}
        >
            <DefaultSpinner open={loading} />
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        {memoInquiryInfo}
                    </Grid>
                    <Grid item xs={6}>
                        <InterQuotationForm formik={formik} {...props}/>
                    </Grid>
                    <Grid item xs={12}>
                        {memoSupplierInquiryTables}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <ButtonWithModel
                    label="退单"
                    title={"确认退单"}
                    disabled={!canSubmitEditReject}
                >
                    <React.Fragment>
                        <DialogContent>
                            <Typography>请确认是否需要退单</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleReject} disabled={!canSubmitEditReject}>确认退单</Button>
                        </DialogActions>
                    </React.Fragment>
                </ButtonWithModel>
                <Button onClick={handleAlter} disabled={!canAlter}>变更</Button>
                <Button onClick={formik.submitForm} disabled={!canSubmitEditReject}>保存</Button>
                <Button onClick={handleSaveNSubmit} disabled={!canSubmitEditReject} color={"secondary"}>保存&提交</Button>
            </DialogActions>
        </DraggableDialog>
    );
}

export default InternalQuotationDialog;