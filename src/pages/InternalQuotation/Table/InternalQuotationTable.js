import React from 'react';
import GenTable from "../../../components/GenTable/GenTable";
import InternalQuotationAPI from "../../../api/InternalQuotationAPI";
import InternalQuotationDialog from "../Dialog/InternalQuotationDialog";
import TextSearchField from "../../../components/GenTable/GTToolbarSearchField";
import GtSelectSearchField from "../../../components/GenTable/GTSelectSearchField";
import config from "react-global-configuration";
import FilterExportBtn from "../../../components/ExportBtn/FilterExportBtn";


const columns = [
    {data:'id', title: 'ID', width:40, searchable: true, type:'numeric'},
    {data:'status', title: '状态', width:50, searchable: true, type:'text'},
    {data:'handler', title: '负责人', width:60, searchable: true, type:'text'},
    {data:'created_by', title: '报价人', width:60, searchable: true, type:'text'},
    {data:'parent.created_by', title: '新建人', width:50, searchable: true, type:'text'},
    {data:'parent.no', title: 'XJ单号', width:50, searchable: true, type:'text'},
    {data:'parent.inq_no', title: 'SQ单号', width:50, searchable: true, type:'text'},
    {data:'inq_inquiry_type', title: '询价类型', width:50, searchable: true, type:'text'},
    {data:'inq_sales_name', title: '销售名称', width:50, searchable: true, type:'text'},
    {data:'inq_cat_no', title: '询价货号', width:90, searchable: true, type:'text'},
    {data:'inq_api_name', title: '询价产品分类', width:50, searchable: true, type:'text'},
    {data:'inq_cn_name', title: '询价中文名', width:100, searchable: true, type:'text'},
    {data:'inq_en_name', title: '询价英文名', width:100, searchable: true, type:'text'},
    {data:'inq_cas', title: '询价cas', width:50, searchable: true, type:'text'},
    {data:'inq_img', title: '询价结构', width:200, searchable: false, type:'img'},
    {data:'inq_package', title: '询价规格', width:50, searchable: true, type:'text'},
    {data:'inq_quantity', title: '询价数量', width:50, searchable: true, type:'text'},
    {data:'inq_purity', title: '询价纯度', width:50, searchable: true, type:'text'},
    {data:'inq_remark', title: '询价备注', width:150, searchable: true, type:'text'},
    {data:'inq_create_date', title: '询价日期', width:50, searchable: true, type:'date'},

    {data:'cat_no', title: '货号', width:90, searchable: true, type:'text'},
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

const defaultSearches = [
    {field: 'status', op: 'in', value: ['未处理', '已处理未报价']},
    {field: 'brand', op: '=', value: 'cato'},
]


InternalQuotationTable.propTypes = {

};

function InternalQuotationTable() {
    return (
        <GenTable
            settings={{
                columns: columns,
                rowHeights: 80,
                readOnly: true,
            }}
            api={InternalQuotationAPI.get_list}
            DetailDialog={InternalQuotationDialog}
            actions={[
                GtSelectSearchField('status', '状态', status_options, {width: '150px'}),
                TextSearchField('inq_inquiry_type', '询价类型', null, {width: '100px'}),
                TextSearchField('handler', '负责人', null, {width: '100px'}),
                TextSearchField('parent.no', '处理单号', null, {width: '150px'}),
                TextSearchField('parent.inq_no', '申请单号', null, {width: '150px'}),
                TextSearchField('brand', '品牌', null, {width: '100px'}),
                FilterExportBtn('inter_quo_list', InternalQuotationAPI.export_list, '导出询价列表'),
            ]}
            defaultSearches={defaultSearches}
        />
    );
}

export default InternalQuotationTable;
