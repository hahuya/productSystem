import React from 'react';
import GenTable from '../../../components/GenTable/GenTable';
import PurchaseOrderAPI from '../../../api/PurchaseOrderAPI';
import {POInfoImportBtn} from './actions';


const columns = [
    {data: 'id', title: 'ID', width:50, searchable: true, type:'numeric'},
    {data: 'parent.code', title: '采购单号', width:100, searchable: true, type:'text'},
    {data: 'parent.vendor_name', title: '供应商名称', width:50, searchable: true, type:'text'},
    {data: 'parent.contact_name', title: '联系人', width:50, searchable: true, type:'text'},
    {data: 'parent.remark', title: '表头备注', width:50, searchable: true, type:'text'},
    {data: 'cat_no', title: '货号', width:100, searchable: true, type:'text'},
    {data: 'remark', title:'备注', width:100, searchable: true, type:'text'},
    {data: 'quantity', title:'数量', width:50, searchable: true, type:'text'},
    {data: 'total_price', title:'含税金额小计', width:80, searchable: true, type:'numeric'},
    {data: 'extra_info.batch', title:'供应商批次', width:100, searchable: true, type:'text'},
    {data: 'extra_info.invoice_number', title:'供应商合同号', width:100, searchable: true, type:'text'},
]

function PurchaseOrderTable() {
    return (
        <GenTable
            settings={{
                columns: columns,
                rowHeights: 35,
                readOnly: true,
            }}
            api={PurchaseOrderAPI.get_list}
            actions={[POInfoImportBtn, ]}
        />
    );
}

export default PurchaseOrderTable;