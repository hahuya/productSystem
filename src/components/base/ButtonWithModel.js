import React, {useMemo} from "react";
import Button from "@material-ui/core/Button";
import DraggableDialog from "./DraggableDialog";
import PropTypes from "prop-types";



ButtonWithModel.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    onOpen: PropTypes.func,
    disabled: PropTypes.bool,
}

export default function ButtonWithModel(props){
    const {disabled, ...otherProps} = props
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        const {onOpen} = props
        setOpen(true)
        if(typeof onOpen === 'function'){
            onOpen()
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen} disabled={disabled}>
                {props.label}
            </Button>
            <DraggableDialog
                title={props.title}
                open={open}
                handleClose={handleClose}
                {...otherProps}
            >
                {React.cloneElement(props.children, {handleClose})}
            </DraggableDialog>
        </div>
    )
}

export function ButtonOpenDialog(props){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const memoDialog = useMemo(()=>React.cloneElement(props.children, {open, handleClose, ...props}), [open])
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                {props.label}
            </Button>
            {/*{React.cloneElement(props.children, {open, handleClose, ...props})}*/}
            {memoDialog}
        </div>
    )
}