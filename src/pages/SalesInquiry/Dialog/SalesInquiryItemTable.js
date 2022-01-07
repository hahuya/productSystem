import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, CardHeader, Grid} from "@material-ui/core";
import {HotTable} from "@handsontable/react";
import {CASEditor, CatNoEditor, ChemImageEditor, PackageEditor} from "./editors";
import {get_api_name, get_inquiry_types} from "./autocomplete";
import Handsontable from "handsontable";
import {EllipsisTextRenderer, ImageRenderer} from "../../../components/GenTable/renderers";
import {CatNoFieldRenderer, IDColorRenderer, PackageFieldRenderer} from "./renderers";
import {useStyles} from "../styles";
import FuzzySearchPrdBtn from "./FuzzySearchPrdBtn";
import config from 'react-global-configuration';
import {afterChangesHandler} from "./afterChangesHandler";
import ImageTooltip from "../../../components/GenTable/ImageTooltip";


const cellTypes = {
    'chem_img': {
        renderer: ImageRenderer,
        editor: ChemImageEditor,
    },
    'inq_cat_no': {
        renderer: CatNoFieldRenderer,
        editor: CatNoEditor,
    },
    'inq_package': {
        renderer: PackageFieldRenderer,
        editor: PackageEditor
    }
}

for (let typeName in cellTypes) {
    Handsontable.cellTypes.registerCellType(typeName, cellTypes[typeName])
}

const quotation_status = config.get('quotation_status')

const columns = [
    {data: 'id', title: 'ID', width: 40, readOnly: true, renderer: IDColorRenderer},
    // {data: 'sales_name', title: '销售名称', width: 80, type: 'autocomplete', source: get_sales_name, strict: true, allowEmpty: false},
    {data: 'inquiry_type', title: '询价类型', width: 70, type: 'autocomplete', source: get_inquiry_types, strict: true},
    {data: 'api_name', title: 'API名称', width: 90, type: 'autocomplete', source: get_api_name, filter: false},
    {data: 'brand', title: '品牌', width: 50},
    {data: 'cat_no', title: '货号', width: 100, type: 'inq_cat_no', },
    {data: 'cn_name', title: '中文名', width: 100, type: 'text', renderer: EllipsisTextRenderer},
    {data: 'en_name', title: '英文名', width: 100, type: 'text', renderer: EllipsisTextRenderer},
    {data: 'cas', title: 'CAS号', width: 80, editor: CASEditor},
    {data: 'package', title: '规格', type: 'inq_package', width: 60},
    {data: 'quantity', title: '数量', type: 'numeric', width: 50},
    {data: 'quotation.cost', title: '成本', type: 'numeric', readOnly: true, width: 80},
    {data: 'quotation.price', title: '市场价', type: 'numeric', readOnly: true, width: 80},
    {data: 'quotation.offer_price', title: '报价', type: 'numeric', width: 80},
    {data: 'quotation.offer_price_sum', title: '报价小计', type: 'numeric', width: 80},
    {data: 'quotation.discount', title: '折扣', type: 'numeric', width: 80},
    {data: 'quotation.price_expiry_date', title: '价格有效期', type: 'date', width: 80},
    {data: 'quotation.delivery', title: '货期', type: 'text', width: 80},
    {data: 'inter_quo.price', title: '市场价', type: 'text', width: 80},
    {data: 'remark', title: '询价备注', type: 'text', width: 100, renderer: EllipsisTextRenderer},
    {data: 'inter_quo.remark', title: '处理备注', type: 'text', width: 80, readOnly: true, renderer: EllipsisTextRenderer},
    {data: 'direct_offer', title: '直接报价', type: 'checkbox', width: 60},
    {data: 'inter_quo.handler', title: '策划负责人', type: 'text', width: 80, readOnly: true},
    {data: 'inter_quo.status', title: '内部状态', type: 'text', width: 80, readOnly: true},
    {data: 'img', title: '结构式', type: 'chem_img', width: 150},
    {data: 'purity', title: '纯度', type: 'text', width: 60, renderer: EllipsisTextRenderer},
    {data: 'inter_quo.cat_no', title: '处理货号', type: 'text', width: 80, readOnly: true},
    {data: 'inter_quo.en_name', title: '处理英文名', type: 'text', width: 80, readOnly: true},
    {data: 'inter_quo.package', title: '处理规格', type: 'text', width: 80, readOnly: true},
    {data: 'inter_quo.img', title: '处理结构式', type: 'img', width: 80, readOnly: true},
    {data: 'quotation.status_info', title: '报价状态', type: 'autocomplete', source: quotation_status, width: 160},
    {data: 'quotation.remark', title: '报价备注', type: 'text', width: 80, renderer: EllipsisTextRenderer},
    {data: 'competitor_info', title: '竞品信息', type: 'text', width: 80},
    {data: 'competitor_price', title: '竞品价格', type: 'text', width: 80},
]

SalesInquiryItemTable.propTypes = {
    formik: PropTypes.object.isRequired,
};

function SalesInquiryItemTable(props) {
    const hot = useRef()
    const {formik, setChanged} = props
    const [fixedColumnsLeft, setFixedColumnsLeft] = useState(5)
    const [expandedImg, setExpandedImg] = useState('')

    const classes = useStyles()

    const handleDeleteRows = (key, options)=>{
        const [{start, end}] = options
        formik.setFieldValue('children',
            formik.values.children?.filter((item, index)=>!!item?.id || index<start.row || index>end.row)
        )
    }

    const fixColumnsLeft = (key, options)=>{
        const [{start}] = options
        const instance = hot.current?.hotInstance
        if(!instance){return}
        setFixedColumnsLeft(start.col + 1)
    }

    const handleMouseOver = (e, {row, col})=>{
        const instance = hot.current?.hotInstance
        if(!instance){return}
        const data_type = instance.getDataType(row, col, row, col)
        if(data_type==='img' || data_type==='chem_img'){
            const value = instance.getDataAtCell(row, col)
            setExpandedImg(value)
        }else{
            setExpandedImg('')
        }
    }

    return (
        <Grid item>
            <Card className={classes.SalesInquiryItemTable}>
                <CardHeader
                    title={"询价明细"}
                    action={<FuzzySearchPrdBtn formik={formik} />}
                />
                
                <CardContent>
                    <Grid container>
                        <Grid item style={{flexGrow: 1}}>
                            <HotTable
                                className={classes.InquiryItemTable}
                                id="inquiry_item"
                                licenseKey={'non-commercial-and-evaluation'}
                                ref={hot}
                                data={formik.values.children}
                                minSpareRows={1}
                                dateFormat={'YYYY-MM-DD'}
                                height={400}
                                width={'100%'}
                                rowHeights={60}
                                fixedColumnsLeft={fixedColumnsLeft}
                                colHeaders={true}
                                contextMenu={{
                                    items: {
                                        'deleteRows': {name: 'Delete Empty Rows', callback: handleDeleteRows},
                                        'fixColumnsLeft': {name: 'Fix Columns Left', callback: fixColumnsLeft}
                                    }
                                }}
                                manualColumnResize={true}
                                manualColumnMove={true}
                                outsideClickDeselects={false}
                                columns={columns}
                                afterChange={(changes, source)=>{
                                    if(source!=='loadData'){
                                        setChanged((prevState)=>prevState+1)
                                        afterChangesHandler(hot, changes)
                                    }
                                }}
                                afterOnCellMouseOver={handleMouseOver}
                                afterOnCellMouseOut={()=>{setExpandedImg('')}}
                            />
                        </Grid>
                        <Grid item>
                            <ImageTooltip show={!!expandedImg} src={expandedImg}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default SalesInquiryItemTable;