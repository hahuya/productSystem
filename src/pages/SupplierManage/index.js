import React, { useRef } from 'react';
import ShuttleFrame from '@/components/shuttleFrame.js'
import GenTable from "../../components/GenTable/GenTable";
import ChildrenNodeObject from "./children"

import ShuttleFrameComponent from "@/components/ShuttleFrameComponent.js"

function SupplierManageRender(){

    let resourceData = [
        {
            id:1,
            lable:'有效期',
            checked:false
        },{
            id:2,
            lable:'纯度',
            checked:false
        },{
            id:3,
            lable:'图谱',
            checked:false
        },{
            id:4,
            lable:'单位',
            checked:false
        },{
            id:5,
            lable:'规格',
            checked:false
        },{
            id:6,
            lable:'结构式',
            checked:false
        },{
            id:7,
            lable:'分子量',
            checked:false
        },{
            id:8,
            lable:'周期',
            checked:false
        },
    ];


    let rigthTestData=[{
        id:6,
        lable:'结构式',
        checked:false
    },{
        id:7,
        lable:'分子量',
        checked:false
    },];



    let that = this;
    let parentTest = '父级传送变量';
    let parentResource = ['卧龙低伏','烛阴震身'];
    let shuttleFrameRef = useRef({});
    let shuttleFrameComponentRef = useRef([]);
    function getChildrenHandler(){
        let returnData = shuttleFrameComponentRef;
        console.log(returnData.current.getResultData(),'======returnData----------returnData==========',that)
        // shuttleFrameRef.current.changeText();
    }
    return (
        <div>
            <span onClick={getChildrenHandler}>供应商列表</span>
            <ShuttleFrameComponent ref={shuttleFrameComponentRef} resourceData={resourceData} resultData={rigthTestData}/>
            {/* <ShuttleFrame ref={shuttleFrameRef} testString={parentTest} resourceData={parentResource}/>
            <ChildrenNodeObject/> */}
            <div style={{"marginTop":"200px"}}></div>
            
        </div>
    )
}

export default SupplierManageRender;