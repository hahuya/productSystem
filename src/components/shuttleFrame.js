import React, {useImperativeHandle, forwardRef,useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';//入参数据类型检查

ShuttleFrameRender.propTypes = {
    resourceData: PropTypes.array,
    resultValue: PropTypes.array,
    testString: PropTypes.string
}

ShuttleFrameRender.defaultProps = {
    resourceData: [],
    resultValue: [],
    testString: '测试默认值-------！！！！！！！'
}
function ShuttleFrameRender(props,ref){
    const [testText, setTestText] = useState('useState的数据')
    let testArray = [1,2,3];
    let buildNode = (arr) =>{
        let result = [];
        arr.forEach((element,index)=>{
            result.push(<span>{element}</span>)
        })
        return result
    }
    useImperativeHandle(ref, () => ({
        getForm: () => {

          return '获取到了子组件---------------------'
        },
        changeText: () => {
            setTestText('changeText,父组件修改数据类型');
        }
      }))
    let clickText = '测试环境值';
    function testClickHandler(){
        console.log(clickText,'------------=======================')
        setTestText('组件内部修改值----------------------');
        return clickText;
    }
    return (
        <React.Fragment>
            <span onClick={testClickHandler}>穿梭框1111111</span>
            <p>{props.testString}</p>
            
            <div>{testText}</div>
            <div>
            {props.resourceData.map(element=>{
                return <span>{element}</span>
            })}
            {buildNode(testArray)}
            </div>
        </React.Fragment>
    )
}

export default forwardRef(ShuttleFrameRender);