import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userInfo/userSlice'
import errMsgReducer from './errorMsg/errMsgSlice'
import subTitleReducer from './subTitle/subTitleSlice'
import commenStoreReducer from '@/redux/commen/index.js'
import globalLoadingReducer from './globalLoading/globalLoadingSlice'


export default configureStore({
    reducer: {
        userInfo: userReducer,
        errMsg: errMsgReducer,
        subTitle: subTitleReducer,
        globalLoading: globalLoadingReducer,
        commenStore: commenStoreReducer
    },
})