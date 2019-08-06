import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Welcome from "./Welcome";
// REDUX STUFF
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

import { init } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let ele;
if (location.pathname == "/welcome") {
    ele = <Welcome />;
} else {
    init(store);
    ele = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(ele, document.querySelector("main"));
