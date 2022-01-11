import React from 'react';
import GenTable from "../../../components/GenTable/GenTable";
import InternalQuotationAPI from "../../../api/InternalQuotationAPI";
import TextSearchField from "../../../components/GenTable/GTToolbarSearchField";
import GtSelectSearchField from "../../../components/GenTable/GTSelectSearchField";
import config from "react-global-configuration";

import KeepAlive from 'react-activation'
const columns = [
    {data: 'id', title: 'ID', width:40, searchable: true, type:'numeric'},
    {data: 'status', title: '状态', width:50, searchable: true, type:'text'},
    {data: 'handler', title: '负责人', width:60, searchable: true, type:'text'},
    {data: 'created_by', title: '报价人', width:60, searchable: true, type:'text'},
    {data: 'parent.created_by', title: '新建人', width:50, searchable: true, type:'text'},
    {data: 'parent.no', title: 'XJ单号', width:50, searchable: true, type:'text'},
    {data: 'parent.inq_no', title: 'SQ单号', width:50, searchable: true, type:'text'},

    {data: 'cat_no', title: '货号', width:90, searchable: true, type:'text'},
    {data: "en_name", title:"英文名", width:100, searchable: true, type:'text'},
    {data: "cn_name", title:"中文名", width:100, searchable: true, type:'text'},
    {data: "cas", title:"Cas", width:80, searchable: true, type:'text'},
    {data: "img", title:"结构式", width:200, searchable: false, type:'img'},
    // {data: "mf", title:"分子式", width:80, searchable: true, type:'text'},
    // {data: "mw", title:"分子量", width:60, searchable: true, type:'text'},
    {data: "package", title:"规格", width:50, searchable: true, type:'text'},
    {data: "quantity", title:"数量", width:50, searchable: true, type:'text'},
    {data: "cost", title:"成本", width:100, searchable: true, type:'numeric'},
    {data: "price", title:"市场价", width:100, searchable: true, type:'numeric'},
    {data: "delivery", title:"货期", width:50, searchable: true, type:'text'},
    {data: "remark", title:"备注", width:100, searchable: true, type:'text'},
    // {data: "storage", title:"储存温度", width:80, searchable: true, type:'text'},
    {data: "modified_by", title:"修改人", width:80, searchable: true, type:'text'},
    {data: "purity", title:"纯度", width:50, searchable: true, type:'text'},
    {data: "brand", title:"品牌", width:50, searchable: true, type:'text'},
]

const status_options = config.get('status_options', [])

const pddDefaultSearches = [
    {field: 'status', op: 'in', value: ['已报价',]},
]


SalesInternalQuotationTable.propTypes = {

};

function SalesInternalQuotationTable() {
    return (
        <KeepAlive name='SupplierQuotationNode'>
        <GenTable
            settings={{
                columns: columns,
                rowHeights: 80,
                readOnly: true,
            }}
            api={InternalQuotationAPI.get_list}
            actions={[
                GtSelectSearchField('status', '状态', status_options),
                TextSearchField('inq_inquiry_type', '询价类型', null, {width: '100px'}),
                TextSearchField('handler', '负责人', null, {width: '100px'}),
                TextSearchField('parent.no', '处理单号', null, {width: '150px'}),
                TextSearchField('parent.inq_no', '申请单号', null, {width: '150px'}),
                TextSearchField('brand', '品牌', null, {width: '150px'}),
            ]}
            defaultSearches={pddDefaultSearches}
        />
        </KeepAlive>
    );
}

export default SalesInternalQuotationTable;
