import React from 'react';
import PropTypes from 'prop-types';
import {Grid, TextField} from "@material-ui/core";
import {CatalogParentField} from "./fieldTypes";

ProductCatalogForm.propTypes = {
    formik: PropTypes.object,
};


const fields = [
    {label: "父类", field: 'parent', component: CatalogParentField},
    {label: "前缀", field: 'prefix', },
    {label: "中文名", field: 'cn_name', },
    {label: "英文名", field: 'en_name', },
    {label: "负责人", field: 'handler', },
]


function ProductCatalogForm(props) {
    const {formik} = props

    return (
        <Grid container direction={"column"}>
            {fields.map((item, index) =>{
                const {field, component, ...otherProps} = item
                const Component = component || TextField
                return (
                    <Grid item key={index}>
                        <Component
                            id={field}
                            name={field}
                            value={formik.values[field] || ""}
                            onChange={formik.handleChange}
                            formik={formik}
                            {...otherProps}
                        />
                    </Grid>
                )
            })}
        </Grid>
    );
}

export default ProductCatalogForm;