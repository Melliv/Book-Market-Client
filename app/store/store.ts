import themeReducer from "./reducers/theme";
import userReducer from "./reducers/user";
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    debug: true,
}


const rootReducer = combineReducers({
    theme: themeReducer,
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, (rootReducer as any))
export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore(initialState: any) {

    let store = createStore(persistedReducer, initialState)
    let persistor = persistStore(store)
    return { store, persistor }

}