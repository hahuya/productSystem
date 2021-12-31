import { createSlice } from '@reduxjs/toolkit'


export const globalLoadingSlice = createSlice({
    name: 'globalLoading',
    initialState: {
        loading: false
    },
    reducers: {
        startLoading: (state) => {
            state.loading = true
        },
        endLoading: (state) => {
            state.loading = false
        }
    }
})

export const { startLoading, endLoading } = globalLoadingSlice.actions
export default globalLoadingSlice.reducer