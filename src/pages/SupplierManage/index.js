import React, { useRef } from 'react';
import ShuttleFrame from '../../components/shuttleFrame.js'
import GenTable from "../../components/GenTable/GenTable";
import ChildrenNodeObject from "./children" 

function SupplierManageRender(){
    let that = this;
    let parentTest = '父级传送变量';
    let parentResource = ['卧龙低伏','烛阴震身'];
    let shuttleFrameRef = useRef({});
    function getChildrenHandler(){
        let returnData = shuttleFrameRef;
        console.log(shuttleFrameRef.current,'======returnData----------returnData==========',that)
        shuttleFrameRef.current.changeText();
    }
    return (
        <div>
            <span onClick={getChildrenHandler}>供应商列表</span>
            <ShuttleFrame ref={shuttleFrameRef} testString={parentTest} resourceData={parentResource}/>
            <ChildrenNodeObject/>
        </div>
    )
}

export default SupplierManageRender;