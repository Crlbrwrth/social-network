////////////
// PART 1 //
////////////
// 
// "if url is /welcome, user is logged out, else logged in"(
//     "in start.js, decide whether user is logged in"
// )("2 Components needed: Welcome & Registration");

import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                {this.state.error && <div className="error">Oops!</div>}
                <input type="text" name="first">
                <input type="text" name="last">
                <input type="email" name="email">
                <input type="password" name="password">
                <button>Register</button>
            </div>
        )
    }
}
