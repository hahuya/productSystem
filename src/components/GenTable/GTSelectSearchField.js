import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select} from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
    getContentAnchorEl: null,
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
        },
    },
};

GtSelectSearchBase.propTypes = {
    formik: PropTypes.object,
    field: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.object,
    options: PropTypes.array
};

export function GtSelectSearchBase(props) {
    const {formik, field, label, style, options} = props
    const [value, setValue] = useState(formik.values.searches.filter(item=>item.field===field)[0]?.value||[])
    const onSearch=()=>{
        onBlur()
        formik.setFieldValue('page', 0)
        formik.submitForm()
    }
    const onChange =(e)=>{
        const {target} = e
        setValue(target.value)
    }
    const onBlur=()=>{
        const searches = formik.values.searches.filter(item=>(item.field!==field))
        if(!value?.length && formik.values.searches.length !== searches.length){
            formik.setFieldValue('searches', searches)
            return
        }
        if(!!value?.length){
            formik.setFieldValue(
                'searches',
                [...searches, {field: field, op: 'in', value: value}]
            )
        }
    }
    return (
        <Grid>
            <FormControl style={style||{}}>
                <InputLabel id={`${field}_GtSelectSearchBase_InputLabel`}>{label}</InputLabel>
                <Select
                    multiple
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            onSearch()
                        }
                    }}
                    value={value || []}
                    MenuProps={MenuProps}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {options?.map(name=>(
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={value.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
}



const GtSelectSearchField = (field, label, options, style)=>(props)=>{
    return (
        <GtSelectSearchBase
            field={field}
            label={label}
            options={options}
            style={style || {width: '200px'}}
            {...props}
        />
    );
}

export default GtSelectSearchField;