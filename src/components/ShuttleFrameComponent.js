//穿梭框组件
import React, {useEffect, useRef, useState} from 'react';
import '@/style/shuttleFrame.scss'

const ShuttleFrameComponent = (props) =>{
    return (
        <div className='shuttle_frame_container'>
            <div className='shuttle_frame_left'>左边</div>
            <div className='shuttle_frame_rigth'>右边</div>
        </div>
    )

}
export default ShuttleFrameComponent
