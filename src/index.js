import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import "./index.scss";
import Application from "./Components/Application";

import { usersMiddlewares } from "./store/middlewares";
import rootReducer from "./store/slices";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return [...getDefaultMiddleware({ thunk: false }), ...usersMiddlewares];
    },
    devTools: process.env.NODE_ENV !== "production",
});

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById("root")
);
