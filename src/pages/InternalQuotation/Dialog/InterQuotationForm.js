import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import {
    CatNoField, CostField, DeliveryField, ExpiryField, PackageField, PriceField, PurityField, RemarkField
} from "./fieldTypes";
import {CheckboxField} from "../../../components/base/inputFields";
import FormPart from "../../../components/base/FormPart";
import SimpleStorageInfo from "./SimpleStorageInfo";

InterQuotationForm.propTypes = {
    formik: PropTypes.object.isRequired
};

const fields = [
    {label: "货号", data: 'cat_no', component: CatNoField, width: 6},
    {label: "中文名", data: 'cn_name', disabled: true, width: 6},
    {label: "英文名", data: 'en_name', disabled: true, width: 12},
    {label: "cas", data: 'cas', disabled: true, width: 8},
    {label: "数量", data: 'quantity', type: "number", width: 4},
]

const extra_fields = [
    {label: "规格", data: 'package', disabled: true, component: PackageField, width: 2},
    {label: "纯度", data: 'purity', type: "text", component: PurityField, width: 2},
    {label: "成本", data: 'cost', type: "number", component: CostField, width: 2},
    {label: "价格", data: 'price', type: "number", component: PriceField, width: 2},
    {label: "货期", data: 'delivery', component: DeliveryField, width: 3},
    {label: "价格有效期", data: 'expiry', type:"date", component: ExpiryField, width: 4},
    {label: "是否定制", data: 'is_synthetic', component: CheckboxField},
    {label: "无法提供", data: 'not_provide', component: CheckboxField},
    {label: "备注", data: 'remark', width: 12, component: RemarkField},
]

function Title(props){
    return (
        <Grid container direction="row" justify={"space-between"}>
            <Grid item>
                <Typography variant={'h5'}>报价信息</Typography>
            </Grid>
            <Grid item>
                <SimpleStorageInfo cat_no={props.cat_no} />
            </Grid>
        </Grid>
    )
}


function InterQuotationForm(props) {
    const {formik} = props
    return (
        <Card>
            <CardHeader title={<Title cat_no={formik?.values?.cat_no} />} />
            <CardContent>
                <Grid container direction={"row"} spacing={1}>
                    <Grid item xs={6}>
                        <img src={formik.values.img} alt="n/a" style={{maxWidth: '100%', maxHeight:150}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <FormPart formik={formik} fields={fields}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormPart formik={formik} fields={extra_fields}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default InterQuotationForm;