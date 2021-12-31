import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Handsontable from "handsontable";
import {ImageEditor} from "../../../components/GenTable/editors";
import ProductAPI from "../../../api/ProductAPI";
import {Grid, Menu, MenuItem, TextField} from "@material-ui/core";
import {useStyles} from "../styles";
import {get_inquiry_type} from "./utils";

const {TextEditor} = Handsontable.editors


export class CASEditor extends TextEditor{

    setValue(newValue) {
        super.setValue(newValue);
    }
}


export class ChemImageEditor extends ImageEditor{

    pasteListener = (e)=>{
        e.stopPropagation()
        e.preventDefault()
        const cd = e.clipboardData
        const moltext = cd.getData('text')
        if(moltext.length === 0){
            super.pasteListener(e)
            return
        }
        ProductAPI.get_struct_img({moltext})
            .then(data=>{
                if(!data || !data.img){return}
                this.setValue(data.img)
                this.instance.setSourceDataAtCell(this.row, 'moltext', moltext)
            })
    }
}


class SelectEditor extends TextEditor{
    SELECTOR_ID = 'selector_editor'

    close() {
        ReactDOM.unmountComponentAtNode(this.SELECT)
        super.close();
    }

    createElements() {
        super.createElements();
        this.SELECT = this.hot.rootDocument.createElement('div')
        this.SELECT.setAttribute('id', this.SELECTOR_ID)
        this.TEXTAREA_PARENT.appendChild(this.SELECT)
    }
}


export class CatNoEditor extends SelectEditor{
    SELECTOR_ID = 'cat_no_editor'

    handleClick=(index)=>()=>{
        const rowData = this.instance.getSourceDataAtRow(this.row)
        const products = rowData?.__candidate || []
        const product = products[index]
        // TODO

        const inquiry_type = get_inquiry_type(product?.brand, product?.cat_no)
        this.hot.setSourceDataAtCell(this.row, 'inquiry_type', inquiry_type)
        this.hot.setSourceDataAtCell(this.row, 'api_name', product?.catalog?.en_name)

        this.hot.setSourceDataAtCell(this.row, 'cat_no', product?.cat_no)
        this.hot.setSourceDataAtCell(this.row, 'img', product?.img)
        this.hot.setSourceDataAtCell(this.row, 'en_name', product?.en_name)
        this.hot.setSourceDataAtCell(this.row, 'cn_name', product?.cn_name)
        this.hot.setSourceDataAtCell(this.row, 'cas', product?.cas)

        const prd_package = product?.packages[0]
        this.hot.setSourceDataAtCell(this.row, 'package', prd_package?.package)
        this.hot.setSourceDataAtCell(this.row, 'quotation.cost', prd_package?.cost)
        this.hot.setSourceDataAtCell(this.row, 'quotation.price', prd_package?.price)
        this.hot.setSourceDataAtCell(this.row, 'quotation.offer_price', prd_package?.price)
        this.hot.setSourceDataAtCell(this.row, 'quotation.offer_price_sum', prd_package?.price * (rowData.quantity || 1))
        this.hot.setSourceDataAtCell(this.row, 'quotation.delivery', prd_package?.delivery)
        this.hot.setSourceDataAtCell(this.row, 'quotation.price_expiry_date', prd_package?.price_expiry_date)
        if(!!prd_package?.price_expiry_date){
            const price_expiry_date = new Date(prd_package?.price_expiry_date)
            const today = new Date()
            this.hot.setSourceDataAtCell(this.row, 'direct_offer', price_expiry_date>today)
        }
        this.close()
    }


    beginEditing(initialValues, e){
        super.beginEditing(initialValues, e)

        const rowData = this.instance.getSourceDataAtRow(this.row)
        ReactDOM.render(
            <ProductSelector
                products={rowData?.__candidate || []} handleClick={this.handleClick} anchorEl={this.SELECT}
                value={this.getValue()}
                setValue={(v)=>this.setValue(v)}
                onClose={()=>{this.close()}}
            />,
            this.SELECT
        )
    }
}


function ProductSelector(props){
    const {products, handleClick, onClose, value, setValue} = props
    const classes = useStyles()
    const [inputValue, setInitialValue] = useState(value || '')

    const handleClose = ()=>{
        if(!!inputValue){
            setValue(inputValue)
        }
        onClose()
    }

    return (
        <Menu open={!!products?.length} disablePortal className={classes.SelectorRoot} onClose={handleClose}>
            <TextField
                label={"货号"} variant={"outlined"} value={inputValue}
                onChange={({target})=> {
                    setInitialValue(target.value)
                }}
                size={"small"}
            />
            {products?.map((item, index)=>(
                <MenuItem key={index} style={{width: '800px'}}>
                    <Grid container direction={"row"} className={classes.HtCatNoFieldItem} onClick={handleClick(index)}>
                        <Grid item xs={1}>{item.brand}</Grid>
                        <Grid item xs={4}>
                            {item.cat_no} | {item.cas || 'N/A'}<br/>
                            {item.en_name}<br/>
                            {item.cn_name}
                        </Grid>
                        <Grid item xs={4} className={classes.HtCatNoItemDiv}>
                            <img src={item.img} alt={'n/a'}/>
                        </Grid>
                    </Grid>
                </MenuItem>
            ))}
        </Menu>
    )
}


export class PackageEditor extends SelectEditor{
    SELECTOR_ID = 'package_selector'

    handleClick = (index)=>()=>{
        const rowData = this.instance.getSourceDataAtRow(this.row)
        const product = rowData?.__candidate?.find(item=>item.cat_no === rowData.cat_no) || {}
        const prd_package = product?.packages[index]
        this.hot.setSourceDataAtCell(this.row, 'package', prd_package?.package)
        this.hot.setSourceDataAtCell(this.row, 'quotation.package', prd_package?.package)
        this.hot.setSourceDataAtCell(this.row, 'quotation.cost', prd_package?.cost)
        this.hot.setSourceDataAtCell(this.row, 'quotation.price', prd_package?.price)
        this.hot.setSourceDataAtCell(this.row, 'quotation.offer_price', prd_package?.price)
        this.hot.setSourceDataAtCell(this.row, 'quotation.offer_price_sum', prd_package?.price * (rowData?.quantity || 1))
        this.hot.setSourceDataAtCell(this.row, 'quotation.discount', 1)
        this.hot.setSourceDataAtCell(this.row, 'quotation.delivery', prd_package?.delivery)
        this.hot.setSourceDataAtCell(this.row, 'quotation.price_expiry_date', prd_package?.price_expiry_date)
        if(!!prd_package?.price_expiry_date){
            const price_expiry_date = new Date(prd_package?.price_expiry_date)
            const today = new Date()
            this.hot.setSourceDataAtCell(this.row, 'direct_offer', price_expiry_date>today)
        }
        this.close()
    }

    beginEditing(initialValues, e){
        super.beginEditing(initialValues, e)
        const rowData = this.instance.getSourceDataAtRow(this.row)
        const product = rowData?.__candidate?.find(item=>item.cat_no === rowData.cat_no) || {}
        ReactDOM.render(
            <PackageSelector
                options={product?.packages} handleClick={this.handleClick} anchorEl={this.SELECT}
                value={this.getValue()}
                setValue={(v)=>{this.setValue(v)}}
                onClose={()=>{this.close()}}
            />,
            this.SELECT
        )
    }
}


function PackageSelector(props){
    const {options, handleClick, anchorEl, onClose, value, setValue} = props
    const [inputValue, setInitialValue] = useState(value || '')
    const classes = useStyles()

    const handleClose=()=>{
        if(!!inputValue){
            setValue(inputValue)
        }
        onClose()
    }
    return (
        <Menu open={!!options?.length}
              disablePortal disableAutoFocusItem autoFocus={false}
              className={classes.SelectorRoot} anchorEl={anchorEl} onClose={handleClose}
        >
            <TextField
                label={"规格"} variant={"outlined"} value={inputValue}
                onChange={({target})=> {
                    setInitialValue(target.value)
                }}
                onKeyDown={e=>e.stopPropagation()}
                size={"small"}
                autoFocus
            />
            {options?.map((item,index)=>(
                <MenuItem key={index} onClick={handleClick(index)}>
                    <Grid container>
                        <Grid item>
                            {item?.package} | 成本: {item?.cost} | 市场价: {item?.price} | {item?.delivery} | {item?.price_expiry_date}
                        </Grid>
                    </Grid>
                </MenuItem>
            ))}
        </Menu>
    )
}
