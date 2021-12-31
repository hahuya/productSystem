import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Grid, IconButton} from "@material-ui/core";
import {HotTable} from "@handsontable/react";
import TaskLogAPI from "../../api/TaskLogAPI";
import RefreshIcon from '@material-ui/icons/Refresh';


const columns = [
    {data:'id', title: 'ID', width:20, searchable: true, type:'text'},
    {data:'job_id', title: '任务ID', width:60, searchable: true, type:'text'},
    {data:'username', title: '提交人', width:60, searchable: true, type:'text'},
    {data:'status', title: '状态', width:50, searchable: true, type:'text'},
    {data:'created_at', title: '新增日期', width:90, searchable: true, type:'date'},
    {data:'modified_at', title: '更新日期', width:90, searchable: true, type:'date'},
    {data:'trace_back', title: '跟踪信息', width:800, searchable: true, type:'text'},
]


TaskLogTable.propTypes = {
    task_name: PropTypes.string.isRequired,
};

function TaskLogTable(props) {
    const {task_name} = props;
    const [data, setData] = useState([])
    const hot = useRef()

    const refreshData = ()=>{
        TaskLogAPI.get_list({filters: {
                searches: [{
                    field: 'task_name',
                    op: '=',
                    value: task_name || ''
                }],
                limit: 10
            }})
            .then(data => {
                if(!data){return}
                setData(data.data)
            })
    }

    useEffect(()=>{
        refreshData()
    }, [])

    return (
        <Grid container direction={"column"}>
            <Grid item>
                <IconButton size="small" onClick={refreshData}><RefreshIcon/></IconButton>
            </Grid>
            <Grid item style={{flexGrow: 1}}>
                <HotTable
                    id="hot"
                    licenseKey={'non-commercial-and-evaluation'}
                    style={{overflowX: 'scroll'}}
                    ref={hot}
                    settings={{
                        height: 250,
                        width: '100%',
                        colHeaders: true,
                        manualColumnResize: true,
                        manualColumnMove: true,
                        readOnly: true,
                        columns: columns,
                    }}
                    data={data}
                />
            </Grid>
        </Grid>
    );
}

export default TaskLogTable;