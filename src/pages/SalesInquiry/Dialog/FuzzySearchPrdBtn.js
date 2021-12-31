import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Grid, Typography} from "@material-ui/core";
import ProductAPI from "../../../api/ProductAPI";
import {get_inquiry_type} from "./utils";

FuzzySearchPrdBtn.propTypes = {
    formik: PropTypes.object
};

function FuzzySearchPrdBtn(props) {
    const {formik} = props
    const [total, setTotal] = useState(0)
    const [progress, setProgress] = useState(0)

    const handleMatchProducts = async ()=>{
        const today = (new Date()).toISOString()
        setTotal(formik.values.children.length - 1 ||0)
        const c = formik.values.children.map(async (item)=>{
            let ret
            try{
                ret = await ProductAPI.fuzzy_search_product(item)
            }catch (e) {
                return item
            }finally{
                setProgress(value=>value+1)
            }
            if(!ret || ret?.length === 0){return item}
            const product = ret[0]
            const catalog = product?.catalog
            const prd_package = product?.packages[0];

            const inquiry_type = get_inquiry_type(product?.brand, product?.cat_no)

            return {
                ...item,
                inquiry_type: item.inquiry_type || inquiry_type,
                cat_no: product?.cat_no,
                api_name: !!item.api_name?item.api_name:catalog?.en_name,
                cn_name: item.cn_name || product?.cn_name,
                cas: item.cas || product?.cas,
                brand: item.brand || product?.brand,
                en_name: item.en_name || product?.en_name,
                img: item.img || product?.img,
                purity: item.purity || product?.purity,
                package: item.package || prd_package?.package,
                direct_offer: (item.direct_offer === true || item.direct_offer === false) ? item.direct_offer : prd_package?.price_expiry_date > today,
                quotation: item.quotation || {
                    cost: prd_package?.cost,
                    price: prd_package?.price,
                    offer_price: prd_package?.price,
                    offer_price_sum: prd_package?.price * (item.quantity || 1),
                    delivery: prd_package?.delivery,
                    price_expiry_date: prd_package?.price_expiry_date,
                },
                __candidate: ret,
            }
        })
        const ret = await Promise.all(c)
        formik.setFieldValue('children', ret)
        setTotal(0)
        setProgress(0)
    }
    return (
        <Grid container direction="row" alignItems={"center"} spacing={1}>
            <Grid item>
                <Typography>{total?`${progress}/${total}`:''}</Typography>
            </Grid>
            <Button onClick={handleMatchProducts} disabled={Boolean(total)}>批量匹配产品</Button>
        </Grid>
    );
}

export default FuzzySearchPrdBtn;