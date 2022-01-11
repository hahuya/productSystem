import './App.css';
import {CssBaseline, Grid, ThemeProvider} from '@material-ui/core';
import ProductTable from "./pages/ProductTable/ProductTable";
import {denseTheme} from "./themes/DenseTheme";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
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
import {useDispatch, useSelector,} from "react-redux";
import DefaultSpinner from "./components/base/DefaultSpinner";
import {popErrorMsg} from "./redux/errorMsg/errMsgSlice";
import PurchaseOrderTable from "./pages/PurchaseOrder/Table/PurchaseOrderTable";
import SalesInternalQuotationTable from "./pages/SalesInquiry/Table/SalesInternalQuotationTable";

import KeepAlive,{ AliveScope,useAliveController } from 'react-activation'
import SupplierManage from './pages/SupplierManage/index'
import NavTab from '@/components/NavTab/index.js'
import '@/style/commen.scss'
function App(props) {
    const dispatch = useDispatch()
    const [drawOpened, setDrawOpen] = useState(false)
    const classes = useStyles()
    const loading = useSelector(({globalLoading}) =>globalLoading.loading)


    const handleDrawerOpen=()=>{
        setDrawOpen(!drawOpened)
    }
    
    const history = useHistory()

    useEffect(()=>{
        AuthAPI.get_user()
            .then(data=>{
                if(!data){return}
                dispatch(setUser(data))
            })
            .catch(e=>dispatch(popErrorMsg(e.toString())))
    }, [dispatch])

    return (
        <AliveScope>
        <Router>
            <ThemeProvider theme={denseTheme}>
                <CssBaseline />
                <Header
                    handleDrawerOpen={handleDrawerOpen}/>
                <MenuDrawer open={drawOpened}/>
                <DefaultSpinner open={loading} />
                <main className={clsx(classes.content, {[classes.contentShift]: drawOpened,})}>
                    <NavTab/>
                    <Grid container style={{flexGlow: 1, height: '100%'}}>
                        <Grid item xs={12}>
                            <Switch>
                                <Route path="/login" component={LoginPage}>
                                </Route>
                                <Route path="/inter_quotation">
                                    <InternalQuotationTable />
                                </Route>
                                <Route path="/product" exact >
                                    <ProductTable />
                                </Route>
                                <Route path="/product_catalog" exact>
                                    <ProductCatalogTable />
                                </Route>
                                <Route path="/supplier_quotation" exact>
                                    <SupplierQuotationTable />
                                </Route>
                                <Route path="/customer_inquiry" exact>
                                    <SalesInquiryTable />
                                </Route>
                                <Route path="/supplier" exact>
                                    <SupplierManage />
                                </Route>
                                <Route path="/customer_quotation_history" exact>
                                    <SalesInternalQuotationTable/>
                                </Route>
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
        </AliveScope>
    );
}

export default App;
