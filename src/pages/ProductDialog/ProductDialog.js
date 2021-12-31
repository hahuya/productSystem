import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ProductForm from "./ProductForm";
import ProductAPI from "../../api/ProductAPI";
import DraggableDialog from "../../components/base/DraggableDialog";
import {useFormik} from "formik";
import * as yup from 'yup';
import DefaultSpinner from "../../components/base/DefaultSpinner";


const initialValues = {
    cat_no: '',
    en_name: '',
    cn_name: '',
    cls_code: '',
    mw: '',
    mf: '',
    cas: 'N/A',
    storage: '2℃ ~ 8℃',
    purity: '>95%',
    raw_material: '',
    smiles: '',
    ghs_icon01: 'NA',
    ghs_icon02: 'NA',
    ghs_icon03: 'NA',
    remark: '',
    handler: '',
    website_available: '',
    brand: 'cato',
    mass_day: '3',
    mass_unit: '年',
    company: '',
    mol_text: '',
    confirmed: '',
    catalog: {},
}

const validationSchema = yup.object({
    cat_no: yup.string().required('请输入存货编码'),
    en_name: yup.string().required('请输入产品英文名'),
    cn_name: yup.string().required('请输入产品中文名'),
    // cas: yup.string().required('请输入产品cas号'),
    cls_code: yup.string().required('请输入存货大类编码')
})


ProductDialog.propTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    data: PropTypes.object
};

function ProductDialog(props) {
    const [loading, setLoading] = useState(false)
    const [forCreate, setForCreate] = useState(true)
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: values => {
            setLoading(true)
            let func
            if(forCreate){
                func = ProductAPI.add_product
            }else {
                func = ProductAPI.edit_product
            }
            func(values)
                .then(data=>{
                    if(!data || data==={}){return}
                    formik.setValues(data)
                    if(forCreate){
                        setForCreate(false)
                    }
                })
                .catch(e=>alert(e))
                .finally(()=>{setLoading(false)})
        }
    })

    useEffect(()=>{
        const {data} = props;
        if(props.open===false){
            formik.resetForm()
            return
        }
        if(!(data?.cat_no)){
            setForCreate(true)
            return
        }
        setLoading(true)
        ProductAPI.get_product(data)
            .then(data=> {
                if(!data || data==={}){return}
                formik.setValues(data)
                setForCreate(false)
            })
            .finally(()=>{setLoading(false)})
    },[props.open])
    return (
        <DraggableDialog
            title={"产品信息"}
            handleClose={props.handleClose} open={props.open}
            maxWidth={'lg'}
        >
            <DefaultSpinner open={loading} />
            <ProductForm formik={formik} forCreate={forCreate}/>
        </DraggableDialog>
    );
}

export default ProductDialog;