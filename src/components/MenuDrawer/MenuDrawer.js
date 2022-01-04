import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Toolbar } from "@material-ui/core";
import {useStyles} from "../../themes/styles";
import clsx from "clsx";
import DrawerItems from "./DrawerItems";


const menu_items = [
    {label: '产品管理', url: '', children: [
            {label: '产品列表', url: '/product'},
            {label: '产品分类列表', url: '/product_catalog'},
        ]},
    {label: '客户询报价管理', url: '', children: [
            {label: '客户询价列表', url: '/customer_inquiry'},
            {label: '客户历史报价列表', url: '/customer_quotation_history'},
        ]},
    {label: '内部询报价管理', url: '', children: [
            {label: '询价列表', url: '/inter_quotation'},
        ]},
    {label: '供应商管理', url: '', children: [
            {label: '供应商列表', url: '/supplier'},
            {label: '供应商报价列表', url: '/supplier_quotation'},
        ]},
    {label: '进销存管理', url: '', children: [
            {label: '采购订单列表', url: '/purchase_order'},
        ],
    },
]


MenuDrawer.propTypes = {
    open: PropTypes.bool,
};

function MenuDrawer(props) {
    const classes = useStyles()
    const {open}=props

    return (
        <React.Fragment>
            <Drawer
                variant="permanent"
                anchor="left"
                open={props.open}
                className={classes.drawer}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <DrawerItems items={menu_items} {...props}/>
                </div>
            </Drawer>
        </React.Fragment>
    );
}

export default MenuDrawer;