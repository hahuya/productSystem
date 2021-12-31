import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useFormik} from "formik";
import DraggableDialog from "../../../components/base/DraggableDialog";
import DefaultSpinner from "../../../components/base/DefaultSpinner";
import ProductCatalogAPI from "../../../api/ProductCatalogAPI";
import {DialogActions, DialogContent} from "@material-ui/core";
import ProductCatalogForm from "./ProductCatalogForm";
import Button from "@material-ui/core/Button";



const initialValues = {
    id: '',
    prefix: '',
    handler: '',
    cn_name: '',
    en_name: '',
}


ProductCatalogDialog.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};

function ProductCatalogDialog(props) {
    const [loading, setLoading] = useState(false)
    const [forCreate, setForCreate] = useState(true)
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            let func
            if(forCreate){
                func = ProductCatalogAPI.add
            }else {
                func = ProductCatalogAPI.edit
            }
            func(values)
                .then(data=>{
                    if(!data || data==={}){return}
                    formik.setValues(data)
                    if(forCreate){
                        setForCreate(false)
                    }
                })
                .finally(()=>{setLoading(false)})
        }
    })

    useEffect(()=>{
        const {data} = props;
        if(props.open===false){
            formik.resetForm()
            return
        }
        if(!(data?.id)){
            setForCreate(true)
            return
        }
        setLoading(true)
        ProductCatalogAPI.get(data)
            .then(data=>{
                if(!data || data==={}){return}
                formik.setValues(data)
                setForCreate(false)
            })
            .finally(()=>setLoading(false))
    }, [props.open])
    return (
        <DraggableDialog
            title={"产品分类信息"}
            handleClose={props.handleClose} open={props.open}
            maxWidth={'lg'}
        >
            <DefaultSpinner open={loading} />
            <DialogContent>
                <ProductCatalogForm formik={formik} {...props}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={formik.submitForm}>保存</Button>
            </DialogActions>
        </DraggableDialog>
    );
}

export default ProductCatalogDialog;