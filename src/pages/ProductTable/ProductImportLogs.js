import React, {useEffect, useRef, useState} from 'react';
import {Grid} from "@material-ui/core";
import {HotTable} from "@handsontable/react";
import ProductAPI from "../../api/ProductAPI";

const columns = [
    {data:'id', title: 'ID', width:20, searchable: true, type:'text'},
    {data:'job_id', title: '任务ID', width:60, searchable: true, type:'text'},
    {data:'username', title: '提交人', width:50, searchable: true, type:'text'},
    {data:'status', title: '状态', width:50, searchable: true, type:'text'},
    {data:'created_at', title: '新增日期', width:50, searchable: true, type:'date'},
    {data:'modified_at', title: '更新日期', width:50, searchable: true, type:'date'},
]

ProductImportLogs.propTypes = {

};

function ProductImportLogs() {
    const [data, setData] = useState([])
    const hot = useRef()
    useEffect(()=>{
        ProductAPI.get_task_logs()
            .then((data=>setData(data)))
            .catch((e)=>alert(e))
    }, [])
    return (
        <Grid container>
            <Grid item style={{flexGrow: 1}}>
                <HotTable
                    id="hot"
                    licenseKey={'non-commercial-and-evaluation'}
                    style={{overflowX: 'scroll'}}
                    ref={hot}
                    settings={{
                        height: 250,
                        width: 400,
                        stretchH: "all",
                        colHeaders: true,
                        manualColumnResize: true,
                        manualColumnMove: true,
                        readOnly: true,
                        // outsideClickDeselects: false,
                        columns: columns,
                    }}
                    data={data}
                />
            </Grid>
        </Grid>
    );
}

export default ProductImportLogs;