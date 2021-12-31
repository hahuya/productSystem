import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import StorageAPI from "../../../api/StorageAPI";
import {
    Button, Card, CardContent, CardHeader,
    CircularProgress, ClickAwayListener,
    Grid,
    Popper
} from "@material-ui/core";
import {HotTable} from "@handsontable/react";
import {useStyles} from "../../../themes/styles";


const columns = [
    {data: 'warehouse.cWhName', title: '仓库'},
    {data: 'cPosCode', title: '货位'},
    {data: 'cInvCode', title: '存货编码'},
    {data: 'cBatch', title: '批号'},
    {data: 'iQuantity', title: '数量', type: 'numeric', width: 50},
    {data: 'batch_props.cBatchProperty6', title: '证书批号'},
    {data: 'batch_props.cBatchProperty7', title: '纯度'},
    {data: null, title: '证书'},
]

function SimpleStorageTable(props){
    const {data} = props
    return (
        <Card>
            <CardHeader title={"库存信息"}/>
            <CardContent>
                <Grid container style={{width: '800px', height: '300px'}}>
                    <Grid item style={{flexGrow: 1}}>
                        <HotTable
                            id={'simple_storage'}
                            licenseKey={'non-commercial-and-evaluation'}
                            columns={columns}
                            data={data||[]}
                            height={'100%'}
                            width={'100%'}
                            stretchH={'all'}
                            colHeaders
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    )
}


SimpleStorageInfo.propTypes = {
    cat_no: PropTypes.string
};


function SimpleStorageInfo(props) {
    const {cat_no} = props
    const classes = useStyles()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    }

    useEffect(()=>{
        if(!cat_no){
            setData([])
            return
        }
        setLoading(true)
        StorageAPI.get_simple_storage(cat_no)
            .then(data=>setData(data))
            .finally(()=>setLoading(false))
    }, [cat_no])

    const first_record = data[0]

    return (
        <div>
            <Button
                color="disabled"
                startIcon={loading?<CircularProgress size={"1rem"} color="inherit"/>:null}
                onClick={handleClick}
            >
                {first_record?
                    `${first_record?.warehouse?.cWhName} | 
                    ${first_record.cBatch} | 
                    ${first_record.batch_props.cBatchProperty7} | 
                    ${parseFloat(first_record.iQuantity).toFixed(2)} | `
                    :'没有库存'}
                {!data?.length?'':data?.length===1?'唯一库存':'多个库存'}
            </Button>
            {open && <ClickAwayListener onClickAway={()=>setOpen(false)}>
                <Popper
                    className={classes.DialogPopper} open={open} anchorEl={anchorEl} placement={'right'}
                >
                    <SimpleStorageTable data={data}/>
                </Popper>
            </ClickAwayListener>
            }
        </div>
    );
}

export default SimpleStorageInfo;