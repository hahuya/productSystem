import React, { useRef,useState } from 'react';
import ShutterForm from '@/components/shuttleFrame.js'
import GenTable from "../../components/GenTable/GenTable";
import ChildrenNodeObject from "./children"
import KeepAlive from 'react-activation'
import ShuttleFrameComponent from "@/components/ShuttleFrameComponent.js"
import {useDispatch, useSelector,} from "react-redux";
import {setTabList} from '@/redux/commen/index.js'




function SupplierManageRender(props){

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


    const [show, setShow] = useState(true);
    const [count,setCount] = useState(0);
    let that = this;
    let parentTest = '父级传送变量';
    let parentResource = ['卧龙低伏','烛阴震身'];
    let shuttleFrameRef = useRef({});
    let shuttleFrameComponentRef = useRef([]);
    let dispatch = useDispatch();


    const tabList = useSelector(({commenStore}) =>commenStore.tabList)



    function getChildrenHandler(){
        let returnData = shuttleFrameComponentRef;
        console.log(props.location,'======returnData----------returnData==========')
        // shuttleFrameRef.current.changeText();
        dispatch(setTabList({'tabList':['卧龙低伏123']}))
    }
    const testHandler = ()=>{
        let buildData = Array.from(tabList.tabList);//类数组转化为数组
        buildData.push('水波不兴123')
        console.log(tabList,'===============Assignment to constant variable-----------------',tabList.tabList,buildData)
        
        dispatch(setTabList({'tabList':buildData}))
        setCount(1)
    }
    return (
        <KeepAlive name='SupplierNode'>
            <div>
                    <span onClick={testHandler}>-------------{count}-----------</span>
                    <span onClick={getChildrenHandler}>供应商列表</span>
                    <ShuttleFrameComponent ref={shuttleFrameComponentRef} resourceData={resourceData} resultData={rigthTestData}/>
                    <ChildrenNodeObject/>
                    <div style={{"marginTop":"200px"}}></div>
                
            </div>
        </KeepAlive>
    )
}

export default SupplierManageRender;