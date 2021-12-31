import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {Grid, TextField} from "@material-ui/core";

GtToolbarSearchFieldBase.propTypes = {
    formik: PropTypes.object,
    field: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.object,
};

export function GtToolbarSearchFieldBase(props) {
    const {formik, field, label, op, style} = props
    const [value, setValue] = useState(formik.values.searches.filter(item=>item.field===field)[0]?.value)

    const onChange = (e)=>{
        const {target} = e
        setValue(target.value)
    }

    const onSearch=()=>{
        onBlur()
        formik.setFieldValue('page', 0)
        formik.submitForm()
    }

    const onBlur = ()=>{
        const searches = formik.values.searches.filter(item=>(item.field!==field))
        if(!value && formik.values.searches.length !== searches.length){
            formik.setFieldValue('searches', searches)
            return
        }
        if(!!value){
            formik.setFieldValue(
                'searches',
                [...searches, {field: field, op: op||'contains', value: value}]
            )
        }
    }

    const childrenWithProps = useMemo(()=>React.Children.map(props.children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(
                child, {
                    onChange: onChange,
                    onBlur: onBlur,
                    onKeyPress: (event => {if(event.key === 'Enter'){onSearch()}}),
                    value: value||'',
                    style: style,
                    label: label,
                });
        }
        return child;
    }), [label, field, value]);

    return (
        <Grid>
            {childrenWithProps}
        </Grid>
    );
}

const TextSearchField = (field, label, op, style) => (props)=>{

    return (
        <GtToolbarSearchFieldBase
            field={field}
            label={label}
            op={op}
            style={style}
            {...props}
        >
            <TextField />
        </GtToolbarSearchFieldBase>
    )
}

export default TextSearchField


