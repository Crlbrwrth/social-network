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
                <div>
                    <h2>Welcome to Social Network</h2>
                    <p>This is before login/registration</p>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
