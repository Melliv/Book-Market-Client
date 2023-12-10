import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/theme";
import userReducer from "./reducers/user";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
    }
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
