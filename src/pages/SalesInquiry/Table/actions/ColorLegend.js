import React from 'react';
import {blue, green, red, yellow, purple} from '../../styles'
import {Grid, Typography} from "@material-ui/core";

const legends = [
    {label: '未提交', color: yellow},
    {label: '直接报价', color: green},
    {label: '已报价', color: blue},
    {label: '已退单', color: red},
    {label: '规格不一致', color: purple},
]

ColorLegend.propTypes = {
    
};

function ColorLegend() {
    return (
        <Grid container spacing={1}>
            {legends.map(item=>(
                <Typography
                    key={item.label} variant={'subtitle2'} style={{backgroundColor: item.color}}
                >{item.label}</Typography>
            ))}
        </Grid>
    );
}

export default ColorLegend;