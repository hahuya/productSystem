import GenAutoComplete from "../../components/base/GenAutoComplete";
import ProductAPI from "../../api/ProductAPI";
import {Button, Grid, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import config from 'react-global-configuration';
import {Autocomplete} from "@material-ui/lab";
import {FastTextField} from "../../components/base/inputFields";
import ChemicalAPI from "../../api/ChemicalAPI";
import {useDispatch} from "react-redux";
import {endLoading, startLoading} from "../../redux/globalLoading/globalLoadingSlice";


export function CatalogField(props){
    const {formik, label} = props
    return (
        <GenAutoComplete
            label={label}
            getOptionLabel={option=>option.id?option.prefix + '|' + option.cn_name:''}
            value={formik.values.catalog||{}}
            api={ProductAPI.get_simple_catalogs}
            onChange={(e, value)=>{
                formik.setFieldValue('catalog', value)
                formik.setFieldValue('handler', value?.handler||"")
            }}
        />
    )
}

export function CatNoField(props){
    const {formik, fullWidth, forCreate, ...otherProps} = props

    const onGetCatNo =()=>{
        const cls_id = formik.values.catalog?.id
        if(!cls_id){return}
        ProductAPI.get_valid_cat_no({cls_id})
            .then(
                data=> {
                    if(!formik.values.cat_no){
                        formik.setFieldValue('cat_no', data || [])
                    }
                }
            )
    }
    return (
        <Grid container direction={"row"} alignItems={"center"} spacing={1}>
            <Grid item>
                <TextField {...otherProps} disabled={!props.forCreate}/>
            </Grid>
            <Grid item>
                <Button onClick={onGetCatNo} variant={"contained"} color={"primary"} disabled={!forCreate}>生成货号</Button>
            </Grid>
        </Grid>
    )
}


export function ClsCode(props){
    const {formik, ...otherProps} = props
    useEffect(()=>{
        if(typeof formik.values?.cat_no?.startsWith !== 'function'){return}
        if(!formik.values.cls_code &&
            (
                formik.values.cat_no.startsWith('C3D') ||
                formik.values.cat_no.startsWith('C4X')
            )){
            formik.setFieldValue('cls_code', '0302')
        }
    }, [formik.values.cat_no])
    return (
        <TextField {...otherProps}/>
    )
}


export function StorageCondition(props){
    const {formik, label, value} = props
    const [storage_conditions, setStorageConditions] = useState([])

    const handleChange = (event, values) =>{
        formik.setFieldValue(props.name, values)
    }

    const handleBlur = (event) =>{
        const {defaultValue} = event.target
        formik.setFieldValue(props.name, defaultValue)
    }

    useEffect(()=>{
        const storage_conditions = config.get('storage_conditions', [])
        setStorageConditions(storage_conditions)
    }, [])

    return (
        <Autocomplete
            options={storage_conditions}
            freeSolo
            value={value}
            getOptionLabel={(option) => option}
            renderInput={(params) =>
                <TextField {...params} label={label} variant="outlined" />
            }
            onChange={handleChange}
            onBlur={handleBlur}
        />
    )
}


export function CASField(props){
    const {formik, width, ...otherProps} = props
    const dispatch = useDispatch()

    const handleSearch=()=>{
        const {cas} = formik.values
        dispatch(startLoading())
        ChemicalAPI.get_moltext_by_cas(cas).then(data=>{
            if(!data){return}
            formik.setFieldValue('mol_text', data.moltext)
        }).catch(()=>{}).finally(()=>{
            dispatch(endLoading())
        })
    }
    const disableBtn = !formik.values?.cas || !!formik.values?.mol_text || formik.values?.cas === 'N/A'

    return (
        <Grid container direction="row" alignItems={"center"} spacing={2}>
            <Grid item>
                <FastTextField {...otherProps} fullWidth={true}/>
            </Grid>
            <Grid item>
                <Button
                    disabled={disableBtn}
                    onClick={handleSearch}
                >试试手气</Button>
            </Grid>
        </Grid>
    )
}