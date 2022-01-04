import React, { useState, useEffect, useRef } from 'react';
// import A from '@/components/shuttleFrame.js'

function RefChildren (){
    const [box, setBox] = useState({
        width: 500,
        height: 400,
      });
      const [redBox, setRedBox] = useState({
        width: 0,
        height: 0,
      })


    let boxRef = useRef({})
    function fetchSize(){
        console.log( boxRef.current.offsetWidth,'========------------ boxRef.current.offsetWidth--------==============',boxRef.current)
        boxRef.current.style.background = 'blue';
    }
    return (
        <div
          style={{
            width: `${box.width}px`,
            height: `${box.height}px`,
            background: '#ccc',
            margin: '20px',
            padding: '20px',
            fontSize: '18px',
          }}
        >
          <div
            style={{
              width: '70%',
              height: '70%',
              background: 'red',
              marginBottom: '20px',
              padding: '10px',
            }}
            ref={boxRef}
          >
            <p>红色区块</p>
            <p>当前宽为：{redBox.width}px</p>
            <p>当前高为：{redBox.height}px</p>
            <button onClick={fetchSize}>点击获取红色区块当前宽高</button>
          </div>
     
          <button
            onClick={() => {
              setBox({ width: box.width + 20, height: box.height + 20 });
            }}
          >
            点击更改灰色区块宽高
          </button>
        </div>
      );
}

export default RefChildren