import React from 'react';
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Button,
    DialogActions,
    DialogContent,
    Grid,
    Typography
} from '@material-ui/core'
import fields, {hidden_fields} from "./fields";
import RightPanel from "./RightPanel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {FastTextField} from "../../components/base/inputFields";
import PackageCostPricePanel from "./PackageCostPricePanel";


function TextPart(props) {
    const {formik, forCreate} = props
    return (
        <Grid container direction={"row"} spacing={1}>
            {fields.map((value, index) => {
                const {data, label, width, component, ...otherProps} = value
                const Component = component || FastTextField
                return (
                    <Grid item xs={width || 12}>
                        <Component
                            key={index}
                            id={data}
                            name={data}
                            label={label}
                            value={formik.values[data]||''}
                            onChange={formik.handleChange}
                            formik={formik}
                            forCreate={forCreate}
                            error={formik.touched[value.data] && Boolean(formik.errors[value.data])}
                            helperText={formik.touched[value.data] && formik.errors[value.data]}
                            fullWidth
                            {...otherProps }
                        />
                    </Grid>
                )
            })}
            <Grid xs={12}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>更多信息</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={1}>
                            {hidden_fields.map((value, index) => {
                                const {data, label, width, component, ...otherProps} = value
                                const Component = component || FastTextField
                                return (
                                    <Grid item xs={width || 12}>
                                        <Component
                                            key={index}
                                            id={data}
                                            name={data}
                                            label={label}
                                            value={formik.values[data]||''}
                                            onChange={formik.handleChange}
                                            formik={formik}
                                            forCreate={forCreate}
                                            error={formik.touched[value.data] && Boolean(formik.errors[value.data])}
                                            helperText={formik.touched[value.data] && formik.errors[value.data]}
                                            fullWidth
                                            {...otherProps }
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}


function ProductForm(props) {
    const {formik} = props;
    return (
        <React.Fragment>
            <DialogContent>
                <Grid container direction={"column"} style={{minWidth: 1000}}>
                    <Grid item>
                        <Grid container spacing={3}>
                            <Grid item md={4}>
                                <TextPart {...props} />
                            </Grid>
                            <Grid item md={8}>
                                <RightPanel {...props} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <PackageCostPricePanel cat_no={formik.values.cat_no} purity={formik.values.purity}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={formik.submitForm}>保存</Button>
            </DialogActions>
        </React.Fragment>
    );
}

export default ProductForm;