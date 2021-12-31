import React, {useEffect, useMemo, useState} from "react";
import {Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import PropTypes from "prop-types";


CheckboxField.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
};

export function CheckboxField(props) {
    const [checked, setCheck] = useState(false)
    const {formik, value, onChange, label, fullWidth, ...otherProps} = props

    useEffect(()=>{
        if(props.value==='是' && !checked) {
            setCheck(true)
        }else if(props.value!=='是' && checked){
            setCheck(false)
        }
    }, [value])

    useEffect(()=>{
        formik.setFieldValue(props.name, checked ? '是' : '否')
    }, [checked])

    const handleChange = (event) =>{
        setCheck(event.target.checked)
    }

    const memoComp = useMemo(()=>(
        <FormControlLabel
            labelPlacement="start"
            label={label}
            control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    {...otherProps}
                />
            }
        />
    ), [label, value, checked])

    return (
        <React.Fragment>
            {memoComp}
        </React.Fragment>
    );
}

export function FastTextField(props){
    const {name, value, error, helperText, forCreate, ...otherProps} = props
    const memoTextField = useMemo(()=>(
        <TextField name={name} value={value} error={error} helperText={helperText} {...otherProps} />
    ), [name, value, error, helperText])
    return (
        <React.Fragment>
            {memoTextField}
        </React.Fragment>
    )
}