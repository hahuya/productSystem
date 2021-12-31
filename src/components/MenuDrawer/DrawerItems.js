import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Collapse,
    Divider,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setSubTitle} from "../../redux/subTitle/subTitleSlice";
import {useStyles} from "../../themes/styles";

function DrawerItem(props) {
    const {item, className} = props
    const [open, setOpen] = useState()
    const history = useHistory()
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleClick = () => {
        if(!item.children){
            history.push(item.url)
            dispatch(setSubTitle(item.label))
        }else{
            setOpen(!open);
        }
    };

    return (
        <React.Fragment>
            <Tooltip title={<Typography >{item.label}</Typography>} arrow placement="right">
                <ListItem className={className} button key={item.label} onClick={handleClick}>
                    <ListItemIcon><Icon>{item.label}</Icon></ListItemIcon>
                    <ListItemText primary={item.label}/>
                </ListItem>
            </Tooltip>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {item.children?.map((value, index)=>(
                    <DrawerItem className={classes.subDrawerItem} key={index} item={value}/>
                ))}
            </Collapse>
        </React.Fragment>
    )
}


DrawerItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

function DrawerItems(props) {
    const {items} = props
    return (
        <React.Fragment>
            {items.map((item, index)=>(
                <React.Fragment key={index}>
                    <List>
                        <DrawerItem item={item} {...props}/>
                    </List>
                    <Divider />
                </React.Fragment>
            ))}
        </React.Fragment>
    );
}

export default DrawerItems;