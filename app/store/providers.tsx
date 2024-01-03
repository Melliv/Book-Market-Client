'use client';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  const { store, persistor } = configureStore({})

  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>;
}