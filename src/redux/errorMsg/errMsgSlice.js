import { createSlice } from '@reduxjs/toolkit'


export const errMsgSlice = createSlice({
    name: 'errMsg',
    initialState: {
        msg: '',
        open: false
    },
    reducers: {
        popErrorMsg: (state, action) => {
            state.open = true
            state.msg = action.payload
        },
        closeErrorMsg: state => {
            state.msg = ''
            state.open = false
        }
    }
})

export const { popErrorMsg, closeErrorMsg } = errMsgSlice.actions
export default errMsgSlice.reducer