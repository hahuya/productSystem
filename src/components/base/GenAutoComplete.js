import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Autocomplete} from "@material-ui/lab";
import {CircularProgress, TextField} from "@material-ui/core";


GenAutoComplete.propTypes = {
    label: PropTypes.string,
    getOptionLabel: PropTypes.func,
    getOptionSelected: PropTypes.func,
    api: PropTypes.func,
};

function GenAutoComplete(props) {
    const {api, label, ...otherProps} = props
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const [inputValue, setInputValue] = useState('')
    const loading = open && options.length === 0
    const elem = useRef()

    useEffect(()=>{
        const {api} = props
        let active = true;
        (async () => {
            const data = await api({keyword: inputValue});
            if (active) {
                setOptions(data || []);
            }
        })();
        return () => {
            active = false;
        };
    }, [inputValue])

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const onInputChange = (event, value, reason)=>{
        if ((reason === 'input')) {
            setInputValue(value)
        }
    }

    return (
        <Autocomplete
            ref={elem}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            options={options}
            filterOptions={(x) => x}
            onInputChange={onInputChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label||''}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            {...otherProps}
        />
    );
}

export default GenAutoComplete;