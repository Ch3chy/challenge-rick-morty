"use client";

import { Provider } from "react-redux";
import { actions, store } from "../store";
import { FC } from "react";

interface ReduxStateProviderProps {
  children: React.ReactNode;
  isMobile?: boolean;
}

const ReduxStateProvider: FC<ReduxStateProviderProps> = ({
  children,
  isMobile,
}) => {
  store.dispatch(actions.setIsMobile(!!isMobile));
  
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStateProvider;
