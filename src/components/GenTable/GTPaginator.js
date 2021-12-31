import React from 'react';
import PropTypes from 'prop-types';
import {useStyles} from "./styles";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {denseTheme} from "../../themes/DenseTheme";
import {Button} from "@material-ui/core";

const per_pages = [
    50, 100, 200, 500, 1000
]

GTPaginator.propTypes = {
    formik: PropTypes.object,
};

function GTPaginator(props) {
    const classes = useStyles();
    const theme = denseTheme;
    const {formik} = props;
    const handleFirstPageButtonClick=()=>{
        formik.setFieldValue('page', 0)
        formik.submitForm()
    }

    const handleBackButtonClick=()=>{
        formik.setFieldValue('page', formik.values.page - 1)
        formik.submitForm()

    }
    const handleNextButtonClick=()=>{
        formik.setFieldValue('page', formik.values.page + 1)
        formik.submitForm()
    }
    const handleLastPageButtonClick=()=>{
        formik.setFieldValue('page', Math.ceil(props.count / formik.values.per_page) - 1)
        formik.submitForm()
    }

    return (
        <div className={classes.GTPaginator}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={formik.values.page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={formik.values.page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={formik.values.page >= Math.ceil(props.count / formik.values.per_page) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={formik.values.page >= Math.ceil(props.count / formik.values.per_page) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
            <label >Total records: {props.count} </label>
            <label htmlFor={'per_age'}>Per Page: </label>
            <select
                id={'per_page'} name={'per_page'}
                value={formik.values.per_page} onChange={formik.handleChange}
            >
                {per_pages.map(value=>(
                    <option value={value} key={value}>{value}</option>
                ))}
            </select>
            <label htmlFor={'page'}>Page: </label>
            <input
                id={'page'} name={'page'} width={50} type="number" style={{width: 80}} min={0}
                value={formik.values.page} onChange={formik.handleChange}
            />
            <Button onClick={formik.submitForm}>Go</Button>
        </div>
    );
}

export default GTPaginator;