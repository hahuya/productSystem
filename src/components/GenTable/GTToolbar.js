import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Divider, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import GTAdvanceSearchForm from "./GTAdvanceSearchForm";
import ButtonWithModel, {ButtonOpenDialog} from "../base/ButtonWithModel";

GTToolbar.propTypes = {
    settings: PropTypes.object,
    formik: PropTypes.object,
    actions: PropTypes.arrayOf(PropTypes.elementType)
};

function GTToolbar(props) {
    const {settings, formik} = props;
    const {DetailDialog, actions} = props
    const onSearch=()=>{
        formik.values.isSearchKeyWoed = true;
        formik.setFieldValue('page', 0)
        formik.submitForm()
    }
    const memoSearchBtn = useMemo(()=><Button onClick={onSearch}>Search</Button>, [])
    return (
        <Grid container direction={"row"} spacing={1} style={{alignItems: 'center'}}>
            <Grid item>
                <label htmlFor={"keyword"}>Keyword: </label>
                <input
                    id="keyword" type="text" onChange={formik.handleChange} value={formik.values.keyword}
                    onKeyPress={(event => {if(event.key === 'Enter'){onSearch()}})}
                />
            </Grid>
            <Grid item>
                {memoSearchBtn}
            </Grid>
            <Divider />
            <Grid item>
                <ButtonWithModel
                    label="ADV.Search"
                    title="Advance Search"
                >
                    <GTAdvanceSearchForm
                        formik={formik}
                        settings={settings}
                    />
                </ButtonWithModel>
            </Grid>
            <Grid item>
                {!!DetailDialog?
                    <ButtonOpenDialog label={'New'}>
                        <DetailDialog/>
                    </ButtonOpenDialog>:<React.Fragment />
                }
            </Grid>
            {actions?.map((BtnDialog, index)=>(
                <Grid item key={index}>
                    <BtnDialog {...props}/>
                </Grid>
            ))}
        </Grid>
    );
}

export default GTToolbar;