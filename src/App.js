import './App.css';
import {CssBaseline, Grid, ThemeProvider} from '@material-ui/core';
import ProductTable from "./pages/ProductTable/ProductTable";
import {denseTheme} from "./themes/DenseTheme";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Header from "./components/Header";
import {useEffect, useState} from "react";
import AuthAPI from "./api/AuthAPI";
import InternalQuotationTable from "./pages/InternalQuotation/Table/InternalQuotationTable";
import MenuDrawer from "./components/MenuDrawer/MenuDrawer";
import {useStyles} from "./themes/styles";
import clsx from "clsx";
import ProductCatalogTable from "./pages/ProductCatalog/table/ProductCatalogTable";
import GlobalSnackbar from "./components/base/GlobalSnackbar";
import SupplierQuotationTable from "./pages/SupplierQuotation/Table/SupplierQuotationTable";
import SalesInquiryTable from "./pages/SalesInquiry/Table/SalesInquiryTable";
import {setUser} from "./redux/userInfo/userSlice";
import {useDispatch, useSelector} from "react-redux";
import DefaultSpinner from "./components/base/DefaultSpinner";
import {popErrorMsg} from "./redux/errorMsg/errMsgSlice";
import PurchaseOrderTable from "./pages/PurchaseOrder/Table/PurchaseOrderTable";
import SalesInternalQuotationTable from "./pages/SalesInquiry/Table/SalesInternalQuotationTable";

import SupplierManage from './pages/SupplierManage/index'

function App() {
    const dispatch = useDispatch()
    const [drawOpened, setDrawOpen] = useState(false)
    const classes = useStyles()
    const loading = useSelector(({globalLoading}) =>globalLoading.loading)

    const handleDrawerOpen=()=>{
        setDrawOpen(!drawOpened)
    }

    useEffect(()=>{
        AuthAPI.get_user()
            .then(data=>{
                if(!data){return}
                dispatch(setUser(data))
            })
            .catch(e=>dispatch(popErrorMsg(e.toString())))
    }, [dispatch])

    return (
        <Router>
            <ThemeProvider theme={denseTheme}>
                <CssBaseline />
                <Header
                    handleDrawerOpen={handleDrawerOpen}/>
                <MenuDrawer open={drawOpened}/>
                <DefaultSpinner open={loading} />
                <main className={clsx(classes.content, {[classes.contentShift]: drawOpened,})}>
                    <Grid container style={{flexGlow: 1, height: '100%'}}>
                        <Grid item xs={12}>
                            <Switch>
                                <Route path="/login" component={LoginPage}>
                                </Route>
                                <Route path="/inter_quotation">
                                    <InternalQuotationTable />
                                </Route>
                                <Route path="/product" exact component={ProductTable} >
                                </Route>
                                <Route path="/product_catalog" exact>
                                    <ProductCatalogTable />
                                </Route>
                                <Route path="/supplier_quotation" exact>
                                    <SupplierQuotationTable />
                                </Route>
                                <Route path="/customer_inquiry" exact component={SalesInquiryTable} />
                                <Route path="/supplier" exact component={SupplierManage} />
                                <Route path="/customer_quotation_history" exact component={SalesInternalQuotationTable} />
                                <Route path="/purchase_order" exact component={PurchaseOrderTable} />
                                <Route path="/">
                                </Route>
                            </Switch>
                        </Grid>
                        <GlobalSnackbar />
                    </Grid>
                </main>
            </ThemeProvider>
        </Router>
    );
}

export default App;
