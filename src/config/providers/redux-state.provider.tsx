"use client";

import { Provider } from "react-redux";
import { actions, persistor, store } from "../store";
import { FC } from "react";
import { PersistGate } from "redux-persist/integration/react";

interface ReduxStateProviderProps {
  children: React.ReactNode;
  isMobile?: boolean;
}

const ReduxStateProvider: FC<ReduxStateProviderProps> = ({
  children,
  isMobile,
}) => {
  store.dispatch(actions.setIsMobile(!!isMobile));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxStateProvider;
