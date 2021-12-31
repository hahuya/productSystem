import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Grid} from "@material-ui/core";
import DefaultSpinner from "../../components/base/DefaultSpinner";
import ProductImageEditor from "../ProductTable/actions/ProductImageEditor";
import MoleculeEditor from "../../components/MoleculeEditor";


RightPanel.propTypes = {
    formik: PropTypes.object
};

function RightPanel(props) {
    const [loading, setLoading] = useState(false);
    const {formik} = props;

    return (
        <Grid container direction={"column"}>
            <DefaultSpinner open={loading}/>
            <Grid item md={12} style={{height: '400px'}}>
                <MoleculeEditor
                    value={formik.values.mol_text}
                    onChange={(value)=>formik.setFieldValue('mol_text', value)}
                    buttons={{
                        recognize: {hidden: true},
                        miew: {hidden: true},
                    }}
                />
            </Grid>
            <Grid item>
                <ProductImageEditor formik={formik}/>
            </Grid>
        </Grid>
    )
}

export default RightPanel;