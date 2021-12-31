import React from 'react';
import GenTable from "../../../components/GenTable/GenTable";
import ProductCatalogAPI from "../../../api/ProductCatalogAPI";
import ProductCatalogDialog from "../dialog/ProductCatalogDialog";


const columns = [
    {data:'id', title: 'ID', width:50, searchable: true, type:'text'},
    {data:'handler', title: '负责人', width:50, searchable: true, type:'text'},
    {data:'prefix', title: '货号前缀', width:50, searchable: true, type:'text'},
    {data: "en_name", title:"英文名", width:100, searchable: true, type:'text'},
    {data: "cn_name", title:"中文名", width:100, searchable: true, type:'text'},
    {data: "atc_code", title:"ATC Code", width:100, searchable: true, type:'text'},
]


function ProductCatalogTable() {
    return (
        <GenTable
            settings={{
                columns: columns,
                rowHeights: 35,
                readOnly: true,
            }}
            api={ProductCatalogAPI.get_list}
            DetailDialog={ProductCatalogDialog}
            actions={[]}
        />
    );
}

export default ProductCatalogTable;