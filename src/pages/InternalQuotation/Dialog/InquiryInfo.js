import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, CardHeader, Grid, Button} from "@material-ui/core";
import {EmphasizeReadOnlyField} from "./fieldTypes";
import copy from 'copy-to-clipboard';
import FormPart from "../../../components/base/FormPart";


const fields = [
    {label: "询价类型", data: 'inq_inquiry_type', disabled: true, width: 4},
    {label: "询价销售", data: 'inq_sales_name', disabled: true, width: 3},
    {label: "询价产品分类", data: 'inq_api_name', disabled: true, width: 5},
    {label: "询价货号", data: 'inq_cat_no', disabled: true, width: 4},
    {label: "询价中文名", data: 'inq_cn_name', disabled: true, width: 8},
    {label: "询价英文名", data: 'inq_en_name', disabled: true, width: 12},
    {label: "询价CAS", data: 'inq_cas', disabled: true, width: 12},
]

const extra_fields = [
    {label: "询价规格", data: 'inq_package', disabled: true, width: 2},
    {label: "询价纯度", data: 'inq_purity', disabled: true, width: 2},
    {label: "询价数量", data: 'inq_quantity', disabled: true, component: EmphasizeReadOnlyField, width: 2},
    {label: "询价备注", data: 'inq_remark', disabled: true, component: EmphasizeReadOnlyField, width: 12},
]


InquiryInfo.propTypes = {
    formik: PropTypes.object
};

function InquiryInfo(props) {
    const {formik} = props;
    const handleCopyMoltext = () => {
        if(!formik.values?.moltext){return}
        copy(formik.values.moltext)
    }

    return (
        <Card>
            <CardHeader title="询价信息" />
            <CardContent>
                <Grid container direction={"row"} spacing={1}>
                    <Grid item xs={6}>
                        <FormPart formik={formik} fields={fields}/>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={formik.values.inq_img} alt="n/a" style={{maxWidth: '100%', maxHeight:150}}/>
                        <Button disabled={!formik.values?.inq_moltext} onClick={handleCopyMoltext}>Copy Moltext</Button><br/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormPart formik={formik} fields={extra_fields}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default InquiryInfo;