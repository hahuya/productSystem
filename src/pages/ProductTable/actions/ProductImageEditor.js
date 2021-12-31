import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {DialogContent, Grid, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonWithModel from "../../../components/base/ButtonWithModel";
import {DropzoneArea} from "material-ui-dropzone";

const useStyles = makeStyles(()=>({
    StructureContainer: {
        height:200,
        '& img': {
            maxWidth: '100%',
            maxHeight:'100%',
            border: '1px solid grey',
            borderRadius: '5px',
            boxShadow: '4px 4px #aaaaaa'
        }
    }
}))


ProductImageEditor.propTypes = {
    formik: PropTypes.object,
};

function ProductImageEditor(props) {
    const {formik} = props
    const [files, setFiles] = useState([])
    const classes = useStyles()

    const onImageClean=()=>{
        formik.setFieldValue('img', null)
    }

    const handleChange=(files)=>{
        setFiles(files)
        const blob = files[0]
        if(!blob){return}
        let img
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            img = reader.result;
            formik.setFieldValue('img', img)
        }, false);
        reader.readAsDataURL(blob)
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={"auto"}>
                <Grid container direction={"column"} spacing={1}>
                    <Grid item>
                        <Button onClick={onImageClean} color={"primary"} variant={"contained"}>清理图片</Button>
                    </Grid>
                    <Grid item>
                        <ButtonWithModel
                            label={'上传图片'}
                            title={'上传图片'}
                            maxWidth={'md'}
                            onOpen={()=>{}}
                        >
                            <React.Fragment>
                                <DialogContent style={{maxWidth: '100%'}}>
                                    <Grid item>
                                        <DropzoneArea
                                            fileObjects={files}
                                            onChange={handleChange}
                                            acceptedFiles={[
                                                'image/*',
                                            ]}
                                            filesLimit={1}/>
                                    </Grid>
                                </DialogContent>
                            </React.Fragment>
                        </ButtonWithModel>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs className={classes.StructureContainer}>
                {!!formik.values.img?
                    <img alt={'N/A'} src={formik.values.img}/>
                    :null
                }
            </Grid>
        </Grid>
    );
}

export default ProductImageEditor;