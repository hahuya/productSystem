import React, {useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import PropTypes from "prop-types";
let _ = require('lodash/core');


function PaperComponent(props) {
    const nodeRef = useRef(null);
    const handle = props['aria-labelledby']
    return (
        <Draggable nodeRef={nodeRef} handle={`#${handle}`} cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper ref={nodeRef} {...props} />
        </Draggable>
    );
}

DraggableDialog.propTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};


export default function DraggableDialog(props) {
    const {handleClose, open, title, ...otherProps} = props;
    const [id] = useState(_.uniqueId('dialog-'));

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby={id}
            {...otherProps}
        >
            <DialogTitle style={{ cursor: 'move' }} id={id}>
                {title}
            </DialogTitle>
            {props.children}
        </Dialog>
    );
}
