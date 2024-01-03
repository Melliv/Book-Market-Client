import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserState {
    id: string
    username: string,
}

const initialState: UserState = {
    id: "",
    username: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {            
            state.id = action.payload
        },
        setUsername: (state, action) => {            
            state.username = action.payload
        },
    }
})

export const {setUserId, setUsername} = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer
