import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import { initLocalization } from "./i18n";

import App from "./App";

const renderApp = () => {
  initLocalization();
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
