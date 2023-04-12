import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";

import { ModuleRegistry } from "@ag-grid-community/core";
import { GridChartsModule } from "@ag-grid-enterprise/charts";

import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

ModuleRegistry.registerModules([GridChartsModule]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.Fragment>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <ToastContainer hideProgressBarr closeOnClick theme="colored" />
            </BrowserRouter>
        </Provider>
    </React.Fragment>
);

serviceWorker.unregister();
