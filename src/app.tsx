import * as React from "react";
import { Provider, ReactReduxContext } from "react-redux";

import { configureStore } from "./store";

const store = configureStore();

export const App = (): JSX.Element => (
  <Provider store={store} context={ReactReduxContext} />
);
