import React from 'react';
import PropTypes from 'prop-types';
import MouseTooltip from "react-sticky-mouse-tooltip";

ImageTooltip.propTypes = {
    show: PropTypes.bool,
    src: PropTypes.string,
};

function ImageTooltip(props) {
    const {show, src} = props
    return (
        <MouseTooltip
            visible={!!show}
            offsetX={15}
            offsetY={10}
            style={{background: 'white', zIndex: 30, border: '1px solid grey'}}
        >
            <div>
                <img style={{maxWidth: '100%', height: 150}} src={src} alt={"n/a"}/>
            </div>
        </MouseTooltip>
    );
}

export default ImageTooltip;