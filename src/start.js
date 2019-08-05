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

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let ele;
if (location.pathname == "/welcome") {
    ele = <Welcome />;
} else {
    ele = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(ele, document.querySelector("main"));

export default function HelloWorld() {
    return <div>Hello, Girl!</div>;
}
