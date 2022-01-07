//穿梭框组件
import React, {useImperativeHandle, forwardRef, useEffect, useRef, useState} from 'react';
import '@/style/shuttleFrame.scss'
import {deepClone} from '@/utils/test.js'

const ShuttleFrameComponent = (props,ref) =>{
    //设计原理：源数据为基准，以id为身份标志，右边结果集为过滤条件，第一层变量为源数据，第二层变量为分配展示数据，第三层变量为搜索数据（页面显示数据），点击左右穿梭按钮时，数据赋值给第二层变量
    //点击穿梭按钮时默认重置搜索条件为空
    useImperativeHandle(ref, () => ({
        getResultData: () => {
          return showRigthData
        },
    }))
    const {resourceData,resultData} = props;

    let rigthSignArray = resultData.map(value=>value.id);

    const [showLeftData,setShowLeftData] = useState(resourceData.filter(value=>{
        return rigthSignArray.indexOf(value.id) == -1
    }));//左边栏显示数据(左边搜索数据)
    const [showRigthData,setShowRigthData] = useState(resultData);//右边栏显示数据(右边搜索数据)
    const [leftResourceData,setLeftResourceData] = useState(resourceData.filter(value=>{
        return rigthSignArray.indexOf(value.id) == -1
    }));//左边栏未加搜索条件的数据
    const [rigthResourceData,setRigthResourceData] = useState(resultData);//右边栏未加搜索条件数据
    const [leftAllCheck,setLeftAllCheck] = useState(false);//左边头部全选
    const [rigthAllCheck,setRigthAllCheck] = useState(false);//右边头部全选
    const [leftInputValue,setLeftInputValue] = useState('');//左边搜索栏
    const [rigthInputValue,setRigthInputValue] = useState('');//右边搜索栏

    const leftCheckNumber = showLeftData.filter(value=>value.checked).length;//左边栏选中数量
    const rigthCheckNumber = showRigthData.filter(value=>value.checked).length;//右边栏选中数量
    const leftShowNumber = showLeftData.length;//左边栏总数
    const rigthShowNumber = showRigthData.length;//右边栏总数
    
    //行复选框
    const changeCheckboxHandler = (index, type)=>()=>{
        let buildSignObject = {
            'left':{
                'value':showLeftData,
                'handler':setShowLeftData
            },
            'rigth':{
                'value':showRigthData,
                'handler':setShowRigthData
            }
        };
        let buildData = deepClone(buildSignObject[type].value);
        buildData[index].checked = !buildData[index].checked;
        buildSignObject[type].handler(deepClone(buildData))
    }
    //穿梭按钮
    const buttonToRigthHandler = ()=>{
        //向右添加数据
        let transferData = showLeftData.filter(value=>value.checked);
        setRigthResourceData([...showRigthData,...transferData]);
        setShowRigthData([...showRigthData,...transferData]);
        let rigthSignArray = [];//结果集的身份id索引数组
        [...showRigthData,...transferData].forEach(value =>{
            rigthSignArray.push(value.id);
        })
        let leftResultData = resourceData.filter(value=>{
            return rigthSignArray.indexOf(value.id) == -1
        })
        setLeftResourceData(deepClone(leftResultData));//赋值左边栏二级结果
        setShowLeftData(deepClone(leftResultData));
        inputEmptyHandler();
    }
    const buttonToLeftHandler = ()=>{
        //向左添加数据
        let rigthResultData = showRigthData.filter(value=>!value.checked);
        setRigthResourceData(rigthResultData);
        setShowRigthData(rigthResultData);
        let rigthSignArray = [];//结果集的身份id索引数组
        rigthResultData.forEach(value =>{
            rigthSignArray.push(value.id);
        })
        setLeftResourceData(resourceData.filter(value=>{
                return rigthSignArray.indexOf(value.id) == -1
            })
        )
        setShowLeftData(resourceData.filter(value=>{
            return rigthSignArray.indexOf(value.id) == -1
        }))
        inputEmptyHandler();
    }
    //搜索框全部置空
    function inputEmptyHandler(){
        setLeftInputValue('');
        setRigthInputValue('')
    }
    //头部复选框
    const allCheckHandler=(type)=>()=>{
        let buildSignObject = {
            'left':{
                'value':leftAllCheck,
                'handler':setLeftAllCheck,
                'rowList':showLeftData,
                'rowListHandler':setShowLeftData
            },
            'rigth':{
                'value':rigthAllCheck,
                'handler':setRigthAllCheck,
                'rowList':showRigthData,
                'rowListHandler':setShowRigthData
            }
        };
        console.log(type,'=======----------中国银行广州东风西路支行-----------',buildSignObject[type].rowList)
        if(buildSignObject[type].rowList.length == 0){
            buildSignObject[type].handler(false);
            return false
        }
        buildSignObject[type].handler(!buildSignObject[type].value);
        buildSignObject[type].rowListHandler(buildSignObject[type].rowList.map(value=>{
            value.checked = !buildSignObject[type].value;
            return value
        }))
    }
    //搜索输入框
    const searchChangeHandler = (type)=>(e)=>{
        let buildSignObject = {
            'left':{
                'value':leftInputValue,
                'handler':setLeftInputValue
            },
            'rigth':{
                'value':rigthInputValue,
                'handler':setRigthInputValue
            }
        };
        buildSignObject[type].handler(e.target.value)
    }
    //输入框键盘事件
    function keyDownHandler(e,type){
        let buildSignObject = {
            'left':{
                'inputValue':leftInputValue,
                'value':leftResourceData,
                'handler':setShowLeftData
            },
            'rigth':{
                'inputValue':rigthInputValue,
                'value':rigthResourceData,
                'handler':setShowRigthData
            }
        };
        if(e.key == 'Enter'){
            if(buildSignObject[type].inputValue.length == 0){
                buildSignObject[type].handler(buildSignObject[type].value)
                return false
            }
            buildSignObject[type].handler(buildSignObject[type].value.filter(element=> element.lable.indexOf(buildSignObject[type].inputValue) != -1))
        }
    }
    //没啥意义，为了解决控制台警告
    function changeSignHandler(){}

    useEffect(_=>{
        // console.log(showLeftData,'------------showLeftData=====useEffect====useEffect===showLeftData-----------',resourceData)
    }, [])
    
    return (
        <div className='shuttle_frame_container'>
            <div className='shuttle_frame_left shuttle_frame_box'>
                <div className='shuttle_frame_box_header'>
                    <div className='box_header_checkbox'>
                        <input type='checkbox' checked={leftAllCheck} onChange={allCheckHandler('left')}/>
                        <span className='box_header_text'>可选内容</span>
                    </div>
                    <span className='box_header_number'>{leftCheckNumber}/{leftShowNumber}</span>
                </div>
                <div className='shuttle_frame_box_search'>
                    <input type='text' className='search_input_style' placeholder='请输入内容' value={leftInputValue} onChange={searchChangeHandler('left')} onKeyDown={e=>keyDownHandler(e,'left')}/>
                    <i className='iconfont icon-fangdajing search_icon_style'></i>
                </div>
                <div className='shuttle_frame_box_body'>
                    {showLeftData.map((element,index)=>{
                        return <div className='box_body_row' key={`${index}left`} onClick={changeCheckboxHandler(index,'left')}>
                            <input type='checkbox' checked={element.checked} className='box_body_row_checkbox' onChange={changeSignHandler}/>
                            <span className='box_body_row_text'>{element.lable}</span>
                        </div>
                    })}
                </div>
            </div>
            <div className='shuttle_frame_buttons'>
                <div className='inner_sleeve_box'>
                    <span className={`transfer_buttons iconfont icon-xianxingtubiaozhizuomoban-08 ${rigthCheckNumber?'active_button':''}`} onClick={buttonToLeftHandler} key='leftButton'></span>
                    <span className={`transfer_buttons iconfont icon-xianxingtubiaozhizuomoban-09 ${leftCheckNumber?'active_button':''}`} onClick={buttonToRigthHandler} key='rigthButton'></span>
                </div>
            </div>
            <div className='shuttle_frame_rigth shuttle_frame_box'>
                <div className='shuttle_frame_box_header'>
                    <div className='box_header_checkbox'>
                        <input type='checkbox' checked={rigthAllCheck} onChange={allCheckHandler('rigth')}/>
                        <span className='box_header_text'>选中内容</span>
                    </div>
                    <span className='box_header_number'>{rigthCheckNumber}/{rigthShowNumber}</span>
                </div>
                <div className='shuttle_frame_box_search'>
                    <input type='text' className='search_input_style' placeholder='请输入内容' value={rigthInputValue} onChange={searchChangeHandler('rigth')} onKeyDown={e=>keyDownHandler(e,'rigth')}/>
                    <i className='iconfont icon-fangdajing search_icon_style'></i>
                </div>
                <div className='shuttle_frame_box_body'>
                    {showRigthData.map((element,index)=>{
                        return <div className='box_body_row' key={`${index}left`} onClick={changeCheckboxHandler(index,'rigth')}>
                            <input type='checkbox' checked={element.checked} className='box_body_row_checkbox' onChange={changeSignHandler}/>
                            <span className='box_body_row_text'>{element.lable}</span>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )

}
export default forwardRef(ShuttleFrameComponent)
