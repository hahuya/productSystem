import React, {useState} from 'react';
import {DialogActions, DialogContent, Grid} from "@material-ui/core";
import {DropzoneArea} from 'material-ui-dropzone'
import {useFormik} from "formik";
import ProductAPI from "../../../api/ProductAPI";
import Button from "@material-ui/core/Button";
import ButtonWithModel from "../../../components/base/ButtonWithModel";
import ProductImportLogs from "../ProductImportLogs";


function ProductImportBtnDialog() {
    const [files, setFiles] = useState([])
    const formik = useFormik({
        initialValues:{
            file: null,
            override_exists: false,
        },
        onSubmit:(values)=>{
            ProductAPI.upload_products(values)
                .then(data=>{
                    if(data.status!=='success'){
                        alert(`job_id: ${data.task_id} failure`)
                        return
                    }
                    alert(`job_id: ${data.task_id} success`)
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
            label={'导入'}
            title={'导入产品'}
            maxWidth={'lg'}
        >
            <React.Fragment>
                <DialogContent style={{maxWidth: '100%'}}>
                    <Grid container direction={"row"}>
                        <Grid item md={6}>
                            <DropzoneArea
                                fileObjects={files}
                                onChange={handleChange}
                                acceptedFiles={[
                                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                ]}
                                maxFileSize={8000000}
                                filesLimit={1}/>
                        </Grid>
                        <Grid item md={6}>
                            <ProductImportLogs />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} onClick={formik.submitForm} disabled={!formik.values.file}>上传</Button>
                </DialogActions>
            </React.Fragment>
        </ButtonWithModel>
    );
}

export default ProductImportBtnDialog;