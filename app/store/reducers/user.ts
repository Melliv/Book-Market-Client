import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserState {
    id: string
    username: string,
    token: string
}

const initialState: UserState = {
    id: "",
    username: "",
    token: ""
}

export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = action.payload
        },
    }
})

export const {setUser} = counterSlice.actions
export const selectUser = (state: RootState) => state.user
export const selectToken = (state: RootState) => state.user.token
export default counterSlice.reducer
