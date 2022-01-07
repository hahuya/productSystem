import React, {useEffect, useMemo, useRef, useState} from 'react';
import ShuttleFrameComponent from '@/components/ShuttleFrameComponent.js'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import '@/style/dialogShuttleFrame.scss'
function ShuttleFrameRender(props,ref){


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

    let shuttleFrameComponentRef = useRef([]);
    const [open, setOpen] = useState(false)
    const openHandler = ()=>{
        console.log('=============-----------------wwwwwwwww------=================')
        setOpen(true)
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    const saveHandler = ()=>{
        let resultData = shuttleFrameComponentRef.current.getResultData();
        if(props.successCallBack && typeof(props.successCallBack) == 'function' && resultData.length != 0){
            props.successCallBack(resultData)
        }
        setOpen(false)
    }
    return (
        <React.Fragment>
            <span className='edit_button' onClick={openHandler}>编辑</span>
            <Dialog onClose={handleClose} open={open}>
               <DialogTitle>列表穿梭框</DialogTitle>
               <div className='dialog_frame_box'>
                    <ShuttleFrameComponent ref={shuttleFrameComponentRef} resourceData={props.resourceData} resultData={props.resultData} primaryKey={props.primaryKey} lable={props.lable}/>
               </div>
               <div className='footer_container'>
                   <span className='button_style save_btn' onClick={saveHandler}>保存</span>
                   <span className='button_style close_btn' onClick={handleClose}>关闭</span>
               </div>
            </Dialog>
        </React.Fragment>
    )
}

export default ShuttleFrameRender;