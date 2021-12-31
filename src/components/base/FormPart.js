import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {Grid} from "@material-ui/core";
import {FastTextField} from "./inputFields";

FormPart.propTypes = {
    formik: PropTypes.object,
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    forCreate: PropTypes.bool,
};

function FormPart(props) {
    const {formik, fields, forCreate, ...otherProps} = props
    const refs = useRef([]);

    const changeFocus = (index)=>{
        if(index +1 >=fields.length){
            formik.submitForm()
            refs.current[0]?.focus()
        }
        for(let i=index+1; i<fields.length; i++){
            const instance = refs.current[i]
            if(instance?.disabled){continue}
            instance?.focus()
            break
        }
    }

    const handleEnter = (index) => (event) =>{
        if (event.key === 'Enter') {
            changeFocus(index);
        }
    }

    return (
        <Grid container direction={"row"} spacing={1} {...otherProps}>
            {fields.map((value, index) => {
                const {data, label, width, component, ...otherSubProps} = value
                const Component = component || FastTextField
                return (
                    <Grid item xs={width || undefined} key={`${index}-${data}`}>
                        <Component
                            id={data}
                            name={data}
                            label={label}
                            value={formik.values[data]||''}
                            onChange={formik.handleChange}
                            formik={formik}
                            forCreate={forCreate}
                            error={formik.touched[value.data] && Boolean(formik.errors[value.data])}
                            helperText={formik.touched[value.data] && formik.errors[value.data]}
                            onKeyPress= {handleEnter(index)}
                            inputRef={el=>{refs.current[index]=el}}
                            fullWidth
                            {...otherSubProps }
                        />
                    </Grid>
                )
            })}
        </Grid>
    );
}

export default FormPart;