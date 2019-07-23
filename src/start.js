// LINTER ISSUES, IGNORE RED UNDERLINING
import React from "react";
import ReactDOM from "react-dom";
import AnimalsContainer from "./AnimalsContainer"; //no curly braces bc of default
import App from "./App";
import StartPage from "./startpage";

let ele;

if (location.pathname == "/welcome") ele = <App />;
else ele = <StartPage />;
//loggin in
// this logic needs to be prepared on the server

ReactDOM.render(ele, document.querySelector("main"));

export default function HelloWorld() {
    return <div>Hello, Girl!</div>;
}
