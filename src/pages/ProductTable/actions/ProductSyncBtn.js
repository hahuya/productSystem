import React, {useState} from 'react';
import ButtonWithModel from "../../../components/base/ButtonWithModel";
import Button from "@material-ui/core/Button";
import {Backdrop, CircularProgress, DialogActions, DialogContent, Typography} from "@material-ui/core";
import ProductAPI from "../../../api/ProductAPI";
import {useStyles} from "../../../themes/styles";

ProductSyncBtn.propTypes = {

};

function ProductSyncBtn(props) {
    const [catNos, setCatNos] = useState([])
    const [loading, setLoading] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const classes = useStyles()
    const onOpen = ()=>{
        setBtnDisabled(false)
        const {hot} = props
        const instance = hot.current.hotInstance
        let [[row_start, , row_end, ]] = instance.getSelected()
        if(row_start===-1){
            row_start =0
        }
        const size = row_end - row_start + 1
        setCatNos([...Array(size).keys()].map(i=>instance.getSourceDataAtRow(row_start+i).cat_no))
    }

    const onSync = async ()=>{
        let err_msgs = []
        console.log(catNos)
        setLoading(true)
        for (let item in catNos){
            await ProductAPI.sync_product({cat_no: catNos[item]})
                .catch(e=>{err_msgs.push(catNos[item]+": "+e)})
        }
        if (err_msgs.length>0){
            alert(err_msgs.join('\n'))
        }
        setLoading(false)
        setBtnDisabled(true)
    }

    return (
        <ButtonWithModel
            label={'同步'}
            title={'同步产品到U8'}
            maxWidth={'lg'}
            onOpen={onOpen}
        >
            <React.Fragment>
                <Backdrop className={classes.backdrop} open={loading} onClick={()=>{}}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <DialogContent>
                    <Typography>将同步以下产品({catNos.length})</Typography>
                    {catNos.map(item=>(
                        <Typography>{item}</Typography>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} onClick={onSync} disabled={btnDisabled}>确认同步</Button>
                </DialogActions>
            </React.Fragment>
        </ButtonWithModel>
    );
}

export default ProductSyncBtn;