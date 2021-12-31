import React from 'react';
import PropTypes from 'prop-types';
import {Button, DialogActions, DialogContent, Grid} from "@material-ui/core";
import DraggableDialog from "../../../components/base/DraggableDialog";
import '@draft-js-plugins/static-toolbar/lib/plugin.css'
import {useFormik} from "formik";
import RichEditor from "../../../components/RichEditor/RichEditor";
import FormPart from "../../../components/base/FormPart";


const fields = [
    {name: 'subject', label: '行动摘要'},
    {name: 'customer', label: '客户'},
    {name: 'contact', label: '联系人'},
    {name: 'action_type', label: '销售行为'},
    {name: 'start_time', label: '计划开始时间', type: 'date'},
    {name: 'subject', label: '下一步计划日期', type: 'date'},
]


SalesActivitiesDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};

function SalesActivitiesDialog(props) {
    const formik = useFormik({
        initialValues: {
            content: ''
        }
    })

    return (
        <DraggableDialog
            title={"行动日志"}
            handleClose={props.handleClose} open={props.open}
            maxWidth={'lg'}
        >
            <DialogContent>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={6}>
                        <FormPart fields={fields} formik={formik}/>
                    </Grid>
                    <Grid item xs={6}>
                        <RichEditor
                            label={'拜访内容'} name={'content'} value={formik.values.content}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button disabled onClick={formik.submitForm}>保存</Button>
            </DialogActions>
        </DraggableDialog>
    );
}

export default SalesActivitiesDialog;