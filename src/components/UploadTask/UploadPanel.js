import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useFormik} from "formik";
import ButtonWithModel from "../base/ButtonWithModel";
import {DialogActions, DialogContent, Grid} from "@material-ui/core";
import {DropzoneArea} from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import TaskLogTable from "./TaskLogTable";

UploadPanel.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    api: PropTypes.func.isRequired,
    task_name: PropTypes.string,
};

function UploadPanel(props){
    const {label, title, task_name, api} = props
    const [files, setFiles] = useState([])

    const formik = useFormik({
        initialValues:{file: null,},
        onSubmit:(values)=>{
            api(values)
                .then(data=>{
                    if(data.status!=='success'){
                        alert('job_id:'+data.task_id + 'failure')
                        return
                    }
                    alert('job_id:'+data.task_id + 'success')
                    formik.setFieldValue('file', null)
                    setFiles([])
                })
                .catch(e=>alert(e))
        }
    })

    const handleChange = (files)=>{
        setFiles(files)
        formik.setFieldValue('file', files[0])
    }

    return (
        <ButtonWithModel
            label={label}
            title={title}
            maxWidth={'lg'}
        >
            <React.Fragment>
                <DialogContent style={{maxWidth: '100%'}}>
                    <Grid container direction={"row"}>
                        <Grid item xs={12}>
                            <DropzoneArea
                                style={{minHeight: '100px'}}
                                fileObjects={files}
                                onChange={handleChange}
                                acceptedFiles={[
                                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                ]}
                                maxFileSize={8000000}
                                filesLimit={1}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TaskLogTable task_name={task_name} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} onClick={formik.submitForm} disabled={!formik.values.file}>上传</Button>
                </DialogActions>
            </React.Fragment>
        </ButtonWithModel>
    )
}

export default UploadPanel;