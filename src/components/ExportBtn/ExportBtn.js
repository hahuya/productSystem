import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";
import TemplateExportAPI from "../../api/TemplateExportAPI";


ExportBtn.propTypes = {
    template_type: PropTypes.string.isRequired,
    onTemplateClick: PropTypes.func.isRequired,
};


function ExportBtn(props) {
    const {onTemplateClick, label} = props
    const [options, setOptions] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const anchorRef = useRef(null)

    const handleClose = ()=> {
        setOpen(false)
    }

    const handleListKeyDown = (event)=> {
        if (event.key === 'Tab') {
            event.preventDefault();
            handleClose()
        }
    }

    const handleOpen=()=>{
        const {template_type} = props
        setOpen(true)
        TemplateExportAPI.get_list(template_type)
            .then(data=>{
                if(!data){return}
                setOptions(data)
            })
    }

    const handleItemClick = (index)=> async (e)=> {
        setOpen(true)
        try{
            await onTemplateClick(e, options[index])
        }finally{
            setLoading(false)
        }
        handleClose()
    }

    return (
        <React.Fragment>
            <Button ref={anchorRef} onClick={handleOpen} disabled={loading}>{label}▼</Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex:3000}}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {options.map((value, index)=>(
                                        <MenuItem key={index} onClick={handleItemClick(index)}>{value.template_name}</MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}

export default ExportBtn;