import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { App } from "./app";
import { store } from "./store";
import "./styles/global.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
