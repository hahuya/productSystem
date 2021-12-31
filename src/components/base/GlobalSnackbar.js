import React from 'react';
import {IconButton, Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {closeErrorMsg} from "../../redux/errorMsg/errMsgSlice";
import CloseIcon from '@material-ui/icons/Close';


GlobalSnackbar.propTypes = {
    
};

function GlobalSnackbar() {
    const open = useSelector(state => state.errMsg.open)
    const msg = useSelector(state => state.errMsg.msg)
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {return;}
        dispatch(closeErrorMsg())
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={msg}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );
}


export default GlobalSnackbar;