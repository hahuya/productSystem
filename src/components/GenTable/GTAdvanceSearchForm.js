import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    DialogActions,
    DialogContent,
    Grid, Icon,
    Select,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import produce from "immer";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";

const operators = {
    '=': {name:'=', value:'='},
    'in': {name:'in', value:'in'},
    'contains': {name:'contains', value:'contains'},
    'is': {name:'is', value:'is'},
    '>':{name:'>', value:'>'},
    '>=':{name:'≥', value:'>='},
    '<':{name:'<', value:'<'},
    '<=':{name:'≤', value:'<='},
    'is_null':{name:'is NULL', value:'is_null'},
    'not_null':{name:'not NULL', value:'not_null'},
    'is_true':{name:'is true', value:'is_true'},
    'not_true':{name:'not true', value:'not_true'},
};

const operator_options = {
    'text': ['contains', '=', '>', '>=', '<=', '<', 'is_null', 'not_null', 'in'],
    'numeric': ['=', '>', '>=', '<=', '<', 'is_null', 'not_null'],
    'checkbox': ['is',],
    'date': ['>', '>=', '=', '<=', '<', 'is_null', 'not_null'],
}

function getDefaultOp(type){
    const tmp = operator_options[type]
    if(tmp===undefined){
        return '='
    }
    return tmp[0]
}


function TypeEditor(props) {
    const {index, type, value, op, handleOpChange, handleValueChange} = props
    const op_options = operator_options[type]?.map(value=>operators[value])||[]
    return (
        <React.Fragment>
            <Grid item>
                <Select value={op} onChange={handleOpChange(index)}>
                    {op_options.map(value=>(
                        <option key={value} value={value.value}>{value.name}</option>
                    ))}
                </Select>
            </Grid>
            <Grid item>
                <input type={"text"} value={value} onChange={handleValueChange(index)}/>
            </Grid>
        </React.Fragment>
    )
}


SearchItem.propTypes = {
    searches: PropTypes.array,
    setSearches: PropTypes.func,
    index: PropTypes.number,
};

function SearchItem(props) {
    const {
        index, searches, handleCheckChange, handleOpChange, handleValueChange,
        handleOrderTypeChange
    } = props;
    const item = searches[index]

    return (
        <Grid container direction={'row'} spacing={2} alignItems={"baseline"} justify={"space-between"}>
            <Grid item>
                <Grid container direction={'row'} spacing={1} alignItems={"baseline"}>
                    <Grid item>
                        <Checkbox checked={item.checked} onClick={handleCheckChange(index)}/>
                    </Grid>
                    <Grid item>
                        <Typography>{item.title}</Typography>
                    </Grid>
                    <TypeEditor
                        index={index} {...item}
                        handleOpChange={handleOpChange} handleValueChange={handleValueChange}
                    />
                </Grid>
            </Grid>
            <Grid item>
                <Grid item>
                    <ToggleButtonGroup
                        value={item?.order_type || 'na'}
                        exclusive
                        onChange={handleOrderTypeChange(index)}
                    >
                        <ToggleButton value={"na"}>
                            <Icon>N</Icon>
                        </ToggleButton>
                        <ToggleButton value={"asc"}>
                            <Icon>正序</Icon>
                        </ToggleButton>
                        <ToggleButton value={"desc"}>
                            <Icon>倒序</Icon>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
        </Grid>
    );
}


GTAdvanceSearchForm.propTypes = {
    formik: PropTypes.object,
    settings: PropTypes.object,
};

function GTAdvanceSearchForm(props) {
    const {formik, settings, handleClose} = props;
    const columns = settings?.columns||[];

    const [searches, setSearches] = useState(
        columns.filter(value=>!!value.searchable).map((value, index) => {
            const [cur_search] = formik.values.searches.filter(item=>item.field===value.data)
            const [cur_ordering] = formik.values.ordering.filter(item=>item.field===value.data)
            return {
                index: index,
                checked: !!cur_search,
                field: value.data,
                title: value.title,
                op: cur_search?.op || getDefaultOp(value.type),
                type: value.type||'text',
                value: cur_search?.value||'',
                order_type: cur_ordering?.order_type || 'na'
            }
        }))

    const handleCheckChange =(index)=>()=>{
        setSearches(produce(draft=>{
            draft[index].checked = !draft[index].checked
        }))
    }

    const handleOpChange=(index)=>(e)=>{
        const {value} = e.target
        setSearches(produce(draft=>{
            draft[index].op = value
        }))
    }

    const handleValueChange=(index)=>(e)=>{
        const {value} = e.target
        setSearches(produce(draft=>{
            draft[index].value = value
        }))
    }

    const handleOrderTypeChange=(index)=>(e, value)=>{
        setSearches(produce(draft=>{
            draft[index].order_type = value
        }))
    }

    const changeForm = ()=>{
        formik.setFieldValue('keyword', '')
        formik.setFieldValue('searches', searches.filter(value => !!value.checked)
            .map(value=>({
                field: value.field,
                op: value.op,
                value: value.value,
            }))
        )
        formik.setFieldValue('ordering', searches.filter(value=>(!!value?.order_type && value.order_type !== 'na'))
            .map(value=>({
                field: value.field,
                order_type: value.order_type
            })))
    }

    const changeSearches =()=>{
        changeForm()
        handleClose()
    };

    const handleSearch=()=>{
        changeForm()
        formik.setFieldValue('page', 0)
        formik.submitForm()
        handleClose()
    }

    const handleCleanOrdering=()=>{
        setSearches(produce(draft=>{
            searches.map((value, index)=>{
                draft[index].order_type = 'na'
            })
        }))
    }

    const clickHandler = ()=>{
        console.log(searches,'========settings========searches---------------searches============settings===========',settings)
    }
    return (
        <React.Fragment>
            <p onClick={clickHandler}>测试--------------</p>
            <DialogContent>
                <Grid container direction={"row"}>
                    {searches.map((value, index )=>(
                        <Grid item md={12} key={`${index}searches`}>
                            <SearchItem
                                key={value.field}
                                index={index} searches={searches}
                                handleCheckChange={handleCheckChange}
                                handleOpChange={handleOpChange}
                                handleValueChange={handleValueChange}
                                handleOrderTypeChange={handleOrderTypeChange}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCleanOrdering}>Clean Ordering</Button>
                <Button color="secondary" onClick={handleSearch}>Search</Button>
                <Button onClick={changeSearches}>OK</Button>
            </DialogActions>
        </React.Fragment>
    );
}

export default GTAdvanceSearchForm;