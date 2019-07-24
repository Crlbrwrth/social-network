// LINTER ISSUES, IGNORE RED UNDERLINING
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Welcome from "./Welcome";

let ele;
console.log("here I am");

if (location.pathname == "/welcome") {
    console.log("in the if-statement");
    ele = <Welcome />;
} else {
    ele = <App />;
}
// loggin in
// this logic needs to be prepared on the server

ReactDOM.render(ele, document.querySelector("main"));

export default function HelloWorld() {
    return <div>Hello, Girl!</div>;
}
