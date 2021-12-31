import React, {useMemo, useState} from 'react';
import {Grid, makeStyles, Popper, TextField} from "@material-ui/core";
import GenAutoComplete from "../../../components/base/GenAutoComplete";
import ProductAPI from "../../../api/ProductAPI";
import {Autocomplete} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Forward30Icon from '@material-ui/icons/Forward30';
import {cost2price, price2cost} from "../../../utils/functions";
import config from "react-global-configuration";
import {ExtraTestsBtn} from "./ExtraTests";
const dateFormat = require("dateformat");

const delivery_options = config.get('delivery_options', [])
const purity_options = config.get('purity_options', [])
const styles = () => ({
    popper: {
        width: "fit-content"
    }
})

const FitContentPopper = function ({children, ...props}) {
    return <Popper {...props} style={styles.popper} placement="bottom-start" children={children}/>
}


export function CatNoField(props) {
    const {formik, label, value, width} = props
    return (
        <GenAutoComplete
            label={label}
            style={{
                width: width || '100%',
                display: 'inline-flex',
            }}
            PopperComponent={FitContentPopper}
            getOptionLabel={option=>option.cat_no?option.cat_no:''}
            value={{cat_no: value}}
            api={ProductAPI.get_products_simple}
            renderOption={(option) => (
                <React.Fragment>
                    {option.cat_no}|{option.en_name}|{option.cn_name}|{option.cas}
                </React.Fragment>
            )}
            onChange={(e, values)=>{
                if(values===null){return}
                formik.setValues(preState => ({
                    ...preState,
                    'cat_no': values.cat_no,
                    'cn_name': values.cn_name,
                    'en_name': values.en_name,
                    'cas': values.cas,
                    'img': values.img,
                    'remark': values.remark,  // TODO concat instead of replace?
                    'package': '',
                    'cost': '',
                    'price': '',
                    'delivery': '',
                    'purity': '',
                    'expiry': '',
                }))
            }}
        />
    )
}


export function PackageField(props){
    const [options, setOptions] = useState([])
    const {formik, label, value} = props

    const handleChange = (event, values) =>{
        if(values===null){return}
        formik.setValues(preValues => ({
            ...preValues,
            'package': values.package,
            'price': values.price,
            'cost': values.cost,
            'delivery': values.delivery,
            'purity': values.purity,
            'expiry': values.price_expiry_date,
            'remark': preValues.remark?`${preValues.remark} | ${values.remark}`:values.remark,
        }))
    }

    const handleBlur = (event)=>{
        const {defaultValue} = event.target
        formik.setFieldValue(props.name, defaultValue)
    }

    const refresh=()=>{
        const {cat_no} = formik.values
        if(!cat_no){return}
        ProductAPI.get_product_packages({cat_no})
            .then(data=>setOptions(data))
    }

    return (
        <Autocomplete
            options={options}
            style={{display: 'inline-flex',}}
            PopperComponent={FitContentPopper}
            freeSolo
            value={{package: value}}
            getOptionLabel={(option) => option.package}
            renderOption={(option) => (
                <Grid container direction={"row"} spacing={3}>
                    <Grid item>{option.package}</Grid>
                    <Grid item>
                        成本价：{option.cost} | 市场价：{option.price} | 货期：{option.delivery}
                    </Grid>
                </Grid>
            )}
            renderInput={(params) =>
                <TextField {...params} label={label} variant="outlined" />
            }
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={refresh}
            fullWidth
        />
    )
}


export function PurityField(props){
    const {formik, label, value} = props

    const handleChange = (event, values) =>{
        formik.setFieldValue(props.name, values)
    }

    const handleBlur = (event) =>{
        const {defaultValue} = event.target
        formik.setFieldValue(props.name, defaultValue)
    }

    return (
        <Autocomplete
            options={purity_options}
            style={{display: 'inline-flex',}}
            freeSolo
            fullWidth
            value={value}
            getOptionLabel={(option) => option}
            renderInput={(params) =>
                <TextField {...params} label={label} variant="outlined" />
            }
            onChange={handleChange}
            onBlur={handleBlur}
        />)
}


export function DeliveryField(props){
    const {formik, label, value} = props

    const handleChange = (event, values) =>{
        formik.setFieldValue(props.name, values)
    }

    const handleBlur = (event) =>{
        const {defaultValue} = event.target
        formik.setFieldValue(props.name, defaultValue)
    }

    return (
        <Autocomplete
            options={delivery_options}
            style={{display: 'inline-flex',}}
            freeSolo
            fullWidth
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


export function ExpiryField(props){
    const {formik, name, value} = props

    const handleRefresh = () =>{
        const now = new Date()
        now.setDate(now.getDate() + 30);
        const value = dateFormat(now, 'yyyy-mm-dd')
        formik.setFieldValue(props.name, value)
    }

    const memoComp = useMemo(()=>(
        <React.Fragment>
            <Grid item style={{flexGrow: 1}}>
                <TextField
                    {...props}
                    format={'yyyy-mm-dd'}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item>
                <IconButton onClick={handleRefresh}>
                    <Forward30Icon/>
                </IconButton>
            </Grid>
        </React.Fragment>
    ), [name, value])

    return (
        <Grid container direction={"row"} alignItems={"center"}>
            {memoComp}
        </Grid>
    )
}


export function PriceField(props){
    const {formik, ...otherProps} = props
    const handleBlur = () =>{
        const cost = formik.values['cost']
        if(!!parseFloat(cost)){return}
        formik.setFieldValue('cost', price2cost(formik.values[props.name] || 0))
    }
    return (
        <TextField
            {...otherProps}
            onBlur={handleBlur}
        />
    )
}

export function CostField(props){
    const {formik, ...otherProps} = props
    const handleBlur = () =>{
        const price = formik.values['price']
        if(!!parseFloat(price)){return}
        formik.setFieldValue('price', cost2price(formik.values[props.name] || 0))
    }
    return (
        <TextField
            {...otherProps}
            onBlur={handleBlur}
        />
    )
}


const useStyles = makeStyles(()=>({
    emphasizeTextFieldInput:{
        color: "red !important"
    }
}))

export function EmphasizeReadOnlyField(props){
    const classes = useStyles()
    return (
        <TextField
            {...props}
            InputProps={{className: classes.emphasizeTextFieldInput}}
        />
    )
}


export function RemarkField(props){
    const {formik, ...otherProps} = props
    return (
        <Grid container direction={"row"} spacing={1}>
            <Grid item style={{flexGrow: 1}}>
                <TextField
                    {...otherProps}
                    multiline
                    rows={2}
                />
            </Grid>
            <Grid item>
                <ExtraTestsBtn formik={formik}/>
            </Grid>
        </Grid>

    )
}