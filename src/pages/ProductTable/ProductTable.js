import React, {useState} from 'react';
import ProductAPI from "../../api/ProductAPI";
import ProductDialog from "../ProductDialog/ProductDialog";
import ProductImportBtnDialog from "./actions/ProductImportBtnDialog";
import GenTable from "../../components/GenTable/GenTable";
import ProductSyncBtn from "./actions/ProductSyncBtn";
import TextSearchField from "../../components/GenTable/GTToolbarSearchField";
import ShuttleFrame from '@/components/shuttleFrame.js'
import {deepClone} from '@/utils/test.js'


import KeepAlive from 'react-activation'
const columns = [
    {data:'handler', title: '负责人', width:50, searchable: true, type:'text'},
    {data:'cat_no', title: '货号', width:50, searchable: true, type:'text'},
    {data: "en_name", title:"英文名", width:100, searchable: true, type:'text'},
    {data: "cn_name", title:"中文名", width:100, searchable: true, type:'text'},
    {data: "cas", title:"Cas", width:80, searchable: true, type:'text'},
    {data: "img", title:"结构式", width:200, searchable: false, type:'img'},
    {data: "mf", title:"分子式", width:80, searchable: true, type:'text'},
    {data: "mw", title:"分子量", width:60, searchable: true, type:'text'},
    {data: "remark", title:"备注", width:100, searchable: true, type:'text'},
    {data: "storage", title:"储存温度", width:80, searchable: true, type:'text'},
    {data: "modified_by", title:"修改人", width:80, searchable: true, type:'text'},
    {data: "purity", title:"纯度", width:50, searchable: true, type:'text'},
    {data: "brand", title:"品牌", width:50, searchable: true, type:'text'},
]

function ProductTable() {
    const [showColums, setShowColums] = useState(columns);

    const successCallBackHandler = (data)=>{
        setShowColums(data)
    }

    return (
        <React.Fragment>
            <KeepAlive name='ProductNode'>
            <ShuttleFrame resourceData={deepClone(columns)} resultData={showColums} successCallBack={successCallBackHandler} primaryKey='data' lable='title'/>
            <GenTable
                settings={{
                    columns: showColums,
                    rowHeights: 150,
                    readOnly: true,
                }}
                api={ProductAPI.get_products}
                DetailDialog={ProductDialog}
                actions={[
                    ProductImportBtnDialog,
                    ProductSyncBtn,
                    TextSearchField('cat_no', '货号', null, {width: '150px'}),
                    TextSearchField('cas', 'CAS号', null, {width: '150px'}),
                ]}
            />
            </KeepAlive>
        </React.Fragment>
    );
}

export default ProductTable;