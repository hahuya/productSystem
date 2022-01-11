import React from 'react';
import GenTable from "../../../components/GenTable/GenTable";
import CustomerInquiryAPI from "../../../api/CustomerInquiryAPI";
import SalesInquiryDialog from "../Dialog/SalesInquiryDialog";
import InquiryImportBtn from "./actions/InquiryImportBtn";
import TextSearchField from "../../../components/GenTable/GTToolbarSearchField";
import GtSelectSearchField from "../../../components/GenTable/GTSelectSearchField";
import config from 'react-global-configuration';
import {EllipsisTextRenderer} from "../../../components/GenTable/renderers";
import {IDColorRenderer} from "../Dialog/renderers";
import ColorLegend from "./actions/ColorLegend";

import KeepAlive from 'react-activation'
SalesInquiryTable.propTypes = {
    
};

const status_options = config.get('status_options', [])

const columns = [
    {data: 'id', title: 'ID', width:30, searchable: true, type: 'numeric', renderer: IDColorRenderer},
    {data: 'quotation.status_info', title: '报价状态', width:80, searchable: true, type: 'text'},
    {data: 'parent.customer_name', title: '客户名称', width:80, searchable: true, type: 'text'},
    {data: 'inter_quo.status', title: '处理状态', width:60, searchable: true, type: 'text'},
    {data: 'inter_quo.handler', title: '负责人', width:60, searchable: true, type: 'text'},
    {data: 'parent.code', title: '询价单号', width:80, searchable: true, type: 'text'},
    {data: 'inquiry_type', title: '询单类型', width:40, searchable: true, type: 'text'},
    {data: 'sales_name', title: '销售名称', width:40, searchable: true, type: 'text'},
    {data: 'api_name', title: 'API名称', width:40, searchable: true, type: 'text'},
    {data: 'cat_no', title: '货号', width:80, searchable: true, type: 'text'},
    {data: 'cn_name', title: '中文名', width:80, searchable: true, type: 'text', renderer: EllipsisTextRenderer},
    {data: 'en_name', title: '英文名', width:80, searchable: true, type: 'text', renderer: EllipsisTextRenderer},
    {data: 'cas', title: 'cas', width:80, searchable: true, type: 'text'},
    {data: 'img', title: '结构式', width:120, searchable: true, type: 'img'},
    {data: 'package', title: '规格', width:40, searchable: true, type: 'text', renderer: EllipsisTextRenderer},
    {data: 'quantity', title: '数量', width:40, searchable: true, type: 'numeric'},
    {data: 'quotation.package', title: '报价规格', width:80, searchable: true, type: 'text'},
    {data: 'quotation.offer_price', title: '报价单价', width:80, searchable: true, type: 'numeric'},
    {data: 'quotation.offer_price_sum', title: '报价小计', width:80, searchable: true, type: 'numeric'},
    {data: 'inter_quo.price', title: '市场价', width:80, searchable: true, type: 'text'},
    {data: 'inter_quo.remark', title: '处理备注', width:60, searchable: true, renderer: EllipsisTextRenderer},
    {data: 'quotation.discount', title: '折扣', width:40, searchable: true, type: 'numeric'},
    {data: 'quotation.delivery', title: '报价货期', width:80, searchable: true, type: 'numeric'},
    {data: 'quotation.price_expiry_date', title: '报价有效期', width:80, searchable: true, type: 'numeric'},
    {data: 'purity', title: '纯度', width:40, searchable: true, type: 'text'},
    {data: 'inter_quo.cat_no', title: '处理货号', searchable: true, type: 'text', width: 80, readOnly: true},
    {data: 'inter_quo.en_name', title: '处理英文名', searchable: true, type: 'text', width: 80, readOnly: true},
    {data: 'inter_quo.package', title: '处理规格', searchable: true, type: 'text', width: 80, readOnly: true},
    {data: 'inter_quo.img', title: '处理结构式', type: 'img', width: 80, readOnly: true},
    {data: 'remark', title: '备注', width:160, searchable: true, type: 'text', renderer: EllipsisTextRenderer},
    {data: 'create_date', title: '新建日期', width:80, searchable: true, type: 'date'},
    {data: 'brand', title: '品牌', width:40, searchable: true, type: 'text'},
    {data: 'valid_mark', title: '状态', width:40, searchable: true, type: 'text'},
    {data: 'parent.remark', title: '表头备注', width:40, searchable: true, type: 'text', renderer: EllipsisTextRenderer},
]

function SalesInquiryTable() {
    return (
        <KeepAlive name='SupplierNode'>
        <GenTable
            settings={{
                columns: columns,
                rowHeights: 80,
                readOnly: true,
            }}
            api={CustomerInquiryAPI.get_list}
            DetailDialog={SalesInquiryDialog}
            actions={[
                InquiryImportBtn,
                GtSelectSearchField('inter_quo.status', '处理状态', status_options),
                TextSearchField('parent.customer_name', '客户名称', null, {width: '150px'}),
                TextSearchField('parent.code', '询单号', null, {width: '150px'}),
                ColorLegend,
            ]}
            perPage={50}
        />
        </KeepAlive>
    );
}

export default SalesInquiryTable;