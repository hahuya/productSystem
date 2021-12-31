import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        cleanUser: state => {
            state.user = {}
        }
    }
})

export const { setUser, cleanUser } = userSlice.actions
export default userSlice.reducer