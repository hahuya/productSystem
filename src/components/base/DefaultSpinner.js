import React from 'react';
import {Backdrop, CircularProgress, makeStyles} from "@material-ui/core";


const useStyles = makeStyles((theme) =>({
    backdrop: {
        zIndex: theme.zIndex.modal + 1,
        color: '#fff',
    },
}));


DefaultSpinner.propTypes = {
};

function DefaultSpinner(props) {
    const classes = useStyles();
    return (
        <Backdrop
            className={classes.backdrop}
            open={props.open} onClick={()=>{}}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
}

export default DefaultSpinner;