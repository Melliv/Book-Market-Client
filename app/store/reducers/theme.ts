import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ThemeState {
    lightTheme: boolean
}

const initialState: ThemeState = {
    lightTheme: false
}

export const counterSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        switchTheme: (state) => {
            state.lightTheme = !state.lightTheme
            localStorage.setItem("theme", state.lightTheme ? "light" : "dark")
        },
        setTheme: (state, action) => {
            state.lightTheme = action.payload
        },
    }
})

export const {switchTheme, setTheme} = counterSlice.actions
export const selectTheme = (state: RootState) => state.theme.lightTheme
export default counterSlice.reducer

