import React from "react";
import ProductAPI from "../../../api/ProductAPI";
import GenAutoComplete from "../../../components/base/GenAutoComplete";


export function CatalogParentField(props) {
    const {formik, label, name} = props

    const handleChange = (e, value)=>{
        formik.setFieldValue(name, value)
    }

    return (
        <GenAutoComplete
            label={label}
            getOptionLabel={option=>option.id?`${option.prefix}|${option.cn_name}`:''}
            value={formik.values.parent||{}}
            api={ProductAPI.get_simple_catalogs}
            onChange={handleChange}
        />
    )
}