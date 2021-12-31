import React, {useEffect, useMemo, useRef, useState} from 'react';
import 'handsontable/dist/handsontable.full.css';
import PropTypes from 'prop-types';
import {Grid, Paper} from "@material-ui/core";
import GTToolbar from "./GTToolbar";
import GTPaginator from "./GTPaginator";
import {HotTable} from "@handsontable/react";
import {useFormik} from "formik";
import {useStyles} from "./styles";
import {AutoSizer} from "react-virtualized";
import Handsontable from "handsontable";
import {ImageRenderer} from "./renderers";
import {ImageEditor} from "./editors";
import DefaultSpinner from "../base/DefaultSpinner";
import ImageTooltip from "./ImageTooltip";



Handsontable.cellTypes.registerCellType(
    'img',
    {
        renderer: ImageRenderer,
        editor: ImageEditor,
    }
)
Handsontable.dateFormat = 'YYYY-MM-DD'


GenTable.propTypes = {
    settings: PropTypes.object,
    api: PropTypes.func,
    DetailDialog: PropTypes.elementType,
    actions: PropTypes.arrayOf(PropTypes.elementType),
    defaultSearches: PropTypes.arrayOf(PropTypes.object),
};

function GenTable(props) {
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [detailOpen, setDetailOpen] = useState(false)
    const [expandedImg, setExpandedImg] = useState('')
    const [selectedData, setSelectedData] = useState({})
    const {defaultSearches, perPage} = props
    const {DetailDialog} = props
    const hot = useRef()
    const classes = useStyles()
    const formik = useFormik({
        initialValues: {
            keyword: '',
            searches: defaultSearches || [],
            page: 0,
            per_page: perPage || 100,
            ordering: [],
        },
        onSubmit: values => {
            setLoading(true);
            props.api({filters: values}).then(data=>{
                if(!data){return}
                setData(data.data)
                setCount(data.count)
                setLoading(false)
            }).catch(()=>{})
                .finally(()=>setLoading(false))
        }
    });

    const handleMouseDown = (event, coords, td)=>{
        let now = new Date().getTime();
        // check if dbl-clicked within 1/5th of a second. change 200 (milliseconds) to other value if you want
        if(!(td.lastClick && now - td.lastClick < 200)) {
            td.lastClick = now;
            return; // no double-click detected
        }

        // double-click code goes here
        const instance = hot.current?.hotInstance;
        if(!instance){return}
        const s = instance.getSelected()
        if(s===undefined){
            return false
        }
        const data = instance.getSourceDataAtRow(s[0][0])
        if(data===null){
            return false
        }
        setSelectedData(data)
        setDetailOpen(true)
    }

    useEffect(()=>{
        formik.submitForm()
    }, [])

    const handleMouseOver = (e, {row, col})=>{
        const instance = hot.current?.hotInstance
        if(!instance){return}
        const data_type = instance.getDataType(row, col, row, col)
        if(data_type==='img'){
            const value = instance.getDataAtCell(row, col)
            setExpandedImg(value)
        }else{
            setExpandedImg('')
        }
    }

    const handleBeforeCopy = (data, coords)=>{
        const instance = hot.current?.hotInstance
        if(!instance){return}
        const {startRow, startCol, endRow, endCol} = coords[0]
        for (let col = startCol; col <= endCol; col++){
            const data_type = instance.getDataType(startRow, col)
            if(data_type==='img'){
                for(let row = 0; row <= endRow-startRow; row++){
                    data[row][col-startCol] = `<table><img src="${data[row][col-startCol]}" height="140px" alt="n/a">`
                }
            }
        }
    }

    const memoPaginator = useMemo(()=>(
        <GTPaginator formik={formik} count={count}/>
    ), [formik.values.per_page, formik.values.page, count])

    const detailDialog = useMemo(()=>(
        <React.Fragment>
            {DetailDialog?(
                <DetailDialog open={detailOpen} handleClose={()=>setDetailOpen(false)} data={selectedData}/>
            ):<React.Fragment />}
        </React.Fragment>
    ), [detailOpen, selectedData, DetailDialog])

    const hotMemo = useMemo(()=>(
        <AutoSizer>
            {({width, height})=>(
                <HotTable
                    id={"gt_table"}
                    licenseKey={'non-commercial-and-evaluation'}
                    style={{overflowX: 'scroll'}}
                    ref={hot}
                    settings={{
                        height: height,
                        width: width,
                        stretchH:"all",
                        colHeaders: true,
                        manualColumnResize: true,
                        manualColumnMove: true,
                        outsideClickDeselects: false,
                        ...props.settings
                    }}
                    data={data}
                    afterOnCellMouseOver={handleMouseOver}
                    afterOnCellMouseOut={()=>{setExpandedImg('')}}
                    beforeCopy={handleBeforeCopy}
                    afterOnCellMouseDown={handleMouseDown}
                />
            )}
        </AutoSizer>
    ), [data, props.settings, hot])

    return (
        <Paper style={{height: '100%'}} elevation={3}>
            <DefaultSpinner open={loading}/>
            {detailDialog}
            <Grid container direction="column" spacing={1} style={{height: '100%', width: '100%'}}>
                <Grid item>
                    <GTToolbar formik={formik} settings={props.settings} hot={hot} {...props}/>
                </Grid>
                <Grid item className={classes.tableContainer}>
                    {hotMemo}
                </Grid>
                <Grid item>
                    {memoPaginator}
                </Grid>
                <Grid item>
                    <ImageTooltip show={!!expandedImg} src={expandedImg}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default GenTable;