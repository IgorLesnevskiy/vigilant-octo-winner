import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.scss";
import Application from "./components/Application";

import rootReducer from "./store/slices";

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Application />
        </Router>
    </Provider>,
    document.getElementById("root")
);
