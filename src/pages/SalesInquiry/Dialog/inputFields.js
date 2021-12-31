import React, {useState} from "react";
import GenAutoComplete from "../../../components/base/GenAutoComplete";
import CustomerAPI from "../../../api/CustomerAPI";
import SimpleAPI from "../../../api/SimpleAPI";
import {InputAdornment, TextField} from "@material-ui/core";


export function CustomerField(props){
    const {formik, label, value, name} = props

    const handleChange=(e, values)=>{
        if(values===null){return}
        formik.setFieldValue(name, values.name)
        formik.setFieldValue('customer_id', values.id)
        formik.setFieldValue('sales_name', values.handlers[0]?.username)
    }
    return (
        <GenAutoComplete
            label={label}
            fullWidth
            getOptionLabel={option=>option?.name || ''}
            value={{name: value}}
            api={CustomerAPI.get_customer_simple}
            onChange={handleChange}
        />
    )
}


export function SalesField(props){
    const {formik, label, value, name} = props

    const handleChange = (e, values)=>{
        if(values === null){return}
        formik.setFieldValue(name, values)
    }

    return (
        <GenAutoComplete
            label={label}
            fullWidth
            name={name}
            value={value||''}
            api={SimpleAPI.get_sales_name}
            onChange={handleChange}
        />
    )
}


export function DiscountField(props){
    const {formik, label, name} = props
    const [value, setValue] = useState(100)

    const handleChange=({target})=>{
        setValue(target.value)
    }

    const handleBlur=()=>{
        const {children} = formik.values
        formik.setFieldValue('children', children?.map((item, index)=>{
            if(index>=children.length -1){return item}
            const discount = parseFloat(value) / 100
            const price = parseFloat(item.quotation?.price)
            const quantity = parseFloat(item.quantity)
            const offer_price = price * discount
            item.quotation.offer_price = offer_price?offer_price.toFixed(2):null
            item.quotation.offer_price_sum = offer_price?(offer_price * quantity).toFixed(2):null
            item.quotation.discount = (!!price)?discount:null
            return item
        }))
    }
    return (
        <TextField
            type="number"
            label={label}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            InputProps={{
                inputProps: { min: 0 },
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
        />
    )
}


export function ContactField(props){
    const {formik, label, value, name, width} = props

    const handleChange = (e, values)=>{
        if(values === null){return}
        formik.setFieldValue(name, values.name)
        formik.setFieldValue('contact_id', values.id)
    }

    return (
        <GenAutoComplete
            label={label}
            style={{
                width: width || '100%',
                display: 'inline-flex',
            }}
            getOptionLabel={option=>option?.name || ''}
            value={{name: value}}
            api={CustomerAPI.get_customer_contacts_simple(formik.values.customer_name)}
            onChange={handleChange}
        />
    )
}
