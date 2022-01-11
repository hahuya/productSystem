import { createSlice } from '@reduxjs/toolkit'

export const commenStore = createSlice({
    name: 'commenStore',
    initialState: {
        'tabList':[],
    },
    reducers: {
        setTabList: (state, action) => {
            state.tabList = action.payload
        },
        setTest: (state, action) => {
            state.testList = action.payload
        },
    }
})

export const { setTabList } = commenStore.actions
export default commenStore.reducer