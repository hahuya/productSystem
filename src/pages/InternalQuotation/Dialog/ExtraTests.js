import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {DialogActions, DialogContent, Grid, makeStyles, TextField} from "@material-ui/core";
import config from 'react-global-configuration';
import {HotTable} from "@handsontable/react";
import ButtonWithModel from "../../../components/base/ButtonWithModel";
import Button from "@material-ui/core/Button";
import {AutoSizer} from "react-virtualized";
import {useFormik} from "formik";


const extra_tests = config.get('extra_tests', [])
const columns = [
    {data:'check', title:'Check', width:20, type:'checkbox',},
    {data:'test', title: '测试名称', width:60, type:'text', readOnly: true},
    {data:'qty', title: '用量(mg)', width:20, type:'numeric', },
    {data:'sample_cost', title: '样品成本', width: 30, type:'numeric', },
    {data:'cost', title: '检测费', width:20, type:'numeric', },
]
const useStyles = makeStyles(()=>({
    ExtraTests: {
        minWidth: '600px',
        height: '450px',
        '& .MuiGrid-container': {
            height: '100%'
        }
    },
    HotContainer: {
        flexGrow: 1,
        flex: '1 1 auto'
    }
}))

ExtraTests.propTypes = {
    formik: PropTypes.object,
    handleClose: PropTypes.func,
};

function ExtraTests(props) {
    const {formik, handleClose} = props
    const hot = useRef(null)
    const [data, setData] = useState([])
    const form = useFormik({
        initialValues: {
            cost: 0,
            qty: 0
        }
    })

    const [commentReview, setComment] = useState('')
    const classes = useStyles()

    const handleReplaceComment=()=>{
        formik.setFieldValue('remark', commentReview)
        handleClose()
    }

    const handleConcatComment=()=>{
        const {remark} = formik.values
        formik.setFieldValue('remark', `${!!remark?`${remark} | `:''}${commentReview}`)
        handleClose()
    }

    const refreshComment = ()=>{
        const rows = data.filter(item=>item?.check)
        if(rows.length===0){
            setComment('')
            return
        }
        const totalPrice = rows.reduce((a, {cost, sample_cost})=>a+cost+parseInt(sample_cost), 0)
        const info_rows = rows.map(item=>`${item.test}: ${item.cost + parseInt(item.sample_cost)}`)
        setComment(`成本总计加收: ${totalPrice}RMB; 包含: ${info_rows.join(', ')}`)
    }

    const calcSampleCost=(cost, qty, sample_qty)=>{
        return ((!!cost&&!!qty&&!!sample_qty)?cost/qty*sample_qty:0).toFixed(0)
    }

    const handleChange=(changes)=>{
        const instance = hot.current?.hotInstance
        const cost = form.values.cost
        const qty = form.values.qty
        changes?.forEach(change=>{
            const [row, prop, , value] = change
            if(prop!=='qty'){return}
            instance?.setSourceDataAtCell(row, 'sample_cost', calcSampleCost(cost, qty, value))
        })
        refreshComment()
    }

    useEffect(()=>{
        const prd_package = formik.values.package
        const m = prd_package.match(/(?<qty>\d+(\.\d+)?)\s?(?<unit>[mMμukK]?[gGLl])/)
        if(!!m){
            form.setFieldValue('qty', m.groups.qty)
        }
        form.setFieldValue('cost', formik.values.cost||0)
    }, [formik?.values?.package, formik.values.cost])

    useEffect(()=>{
        setData(extra_tests.map(item=>Object.assign({}, item, {check: false, sample_cost: 0})))
    }, [])

    useEffect(()=>{
        const cost = form.values.cost
        const qty = form.values.qty
        setData((preData)=>preData.map(item=>({
            ...item,
            sample_cost: calcSampleCost(cost, qty, item?.qty)
        })))
    }, [form.values.cost, form.values.qty])

    return (
        <React.Fragment>
            <DialogContent className={classes.ExtraTests}>
                <Grid container direction={"column"}>
                    <Grid item>
                        <TextField label={"原料成本"} name={'cost'} value={form.values.cost} onChange={form.handleChange} type={"number"}/>
                        <TextField label={"数量(mg)"} name={'qty'} value={form.values.qty} onChange={form.handleChange} type={"number"}/>
                    </Grid>
                    <Grid item>
                        <TextField label={`备注预览(${commentReview.length})`} value={commentReview} rows={2} multiline fullWidth/>
                    </Grid>
                    <Grid item xs={12} className={classes.HotContainer}>
                        <AutoSizer>
                            {({width, height})=>(
                                <HotTable
                                    id="extra_tests"
                                    licenseKey={'non-commercial-and-evaluation'}
                                    ref={hot}
                                    stretchH="all"
                                    colHeaders={true}
                                    columns={columns}
                                    data={data}
                                    manualColumnResize={true}
                                    manualColumnMove={true}
                                    outsideClickDeselects={false}
                                    dateFormat={'YYYY-MM-DD'}
                                    height={height}
                                    width={width}
                                    afterChange={handleChange}
                                />
                            )}
                        </AutoSizer>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleReplaceComment}>替换备注</Button>
                <Button onClick={handleConcatComment}>备注追加</Button>
            </DialogActions>
        </React.Fragment>
    );
}

export default ExtraTests;


export function ExtraTestsBtn(props){
    const {formik} = props
    return (
        <ButtonWithModel
            label={"额外测试"}
            title={"添加额外测试"}
        >
            <ExtraTests formik={formik}/>
        </ButtonWithModel>
    )
}