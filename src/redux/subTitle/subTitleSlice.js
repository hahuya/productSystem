import { createSlice } from '@reduxjs/toolkit'

export const subTitleSlice = createSlice({
    name: 'subTitle',
    initialState: {
        subTitle: ''
    },
    reducers: {
        setSubTitle: (state, action) => {
            state.subTitle = action.payload
        },
        cleanSubTitle: state => {
            state.subTitle = ''
        }
    }
})

export const { setSubTitle, cleanSubTitle } = subTitleSlice.actions
export default subTitleSlice.reducer