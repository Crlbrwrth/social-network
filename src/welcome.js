//THIS RED UNDERLINE IS JUST AN LINTER ERROR
import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <HashRouter>
                <div id="welcome">
                    <h1>Welcome to the Ant-Lovers Society</h1>
                    <div id="background-img" />
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        );
    }
}
