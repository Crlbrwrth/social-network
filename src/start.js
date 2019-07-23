import React from "react";
import ReactDOM from "react-dom";
import AnimalsContainer from "./AnimalsContainer"; //no curly braces bc of default
import App from "./App";

ReactDOM.render(<App />, document.querySelector("main"));

export default function HelloWorld() {
    return <div>Hello, Girl!</div>;
}
