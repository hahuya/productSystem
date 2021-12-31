import React from 'react';
import GenTable from "../../../components/GenTable/GenTable";
import SupplierQuotationAPI from "../../../api/SupplierQuotationAPI";
import TextSearchField from "../../../components/GenTable/GTToolbarSearchField";
import SuppQuoBulkAddDialog from "../Dialog/SuppQuoBulkAddDialog";


const columns = [
    {data:'id', title: 'ID', width:40, searchable: true, type:'numeric'},
    {data:'supplier_name', title: '供应商名称', width:80, searchable: true, type:'text'},
    {data:'cat_no', title: '货号', width:70, searchable: true, type:'text'},
    {data:'quantity', title: '数量(mg)', width:40, searchable: true, type:'numeric'},
    {data:'price', title: '价格', width:40, searchable: true, type:'numeric'},
    {data:'delivery', title: '货期', width:40, searchable: true, type:'text'},
    {data:'remark', title: '备注', width:100, searchable: true, type:'text'},
    {data:'with_vat', title: '增票', width:40, searchable: true, type:'checkbox'},
    {data:'synthetic', title: '定制合成', width:40, searchable: true, type:'checkbox'},
    {data:'expiry', title: '有效期', width:40, searchable: true, type:'date'},
    {data:'status', title: '状态', width:40, searchable: true, type:'text'},
    {data:'source_type', title: '来源', width:50, searchable: true, type:'text'},
    {data:'currency', title: '货币', width:40, searchable: true, type:'text'},
    {data:'created_by', title: '新建人', width:40, searchable: true, type:'text'},
    {data:'created_at', title: '新建日期', width:70, searchable: true, type:'date'},
    {data:'modified_by', title: '修改人', width:40, searchable: true, type:'text'},
    {data:'modified_at', title: '修改日期', width:70, searchable: true, type:'date'},
]


SupplierQuotationTable.propTypes = {

};

function SupplierQuotationTable() {
    return (
        <GenTable
            settings={{
                columns: columns,
                rowHeights: 80,
                readOnly: true,
            }}
            api={SupplierQuotationAPI.get_list}
            DetailDialog={SuppQuoBulkAddDialog}
            actions={[
                TextSearchField('cat_no', '货号', null, {width: '100px'}),
            ]}
            // defaultSearches={defaultSearches}
        />
    );
}

export default SupplierQuotationTable;