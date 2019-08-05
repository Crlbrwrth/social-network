////////////
// PART 1 //
////////////
//
// "if url is /welcome, user is logged out, else logged in"(
//     "in start.js, decide whether user is logged in"
// )("2 Components needed: Welcome & Registration");

import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }
    submit() {
        axios
            .post("/register", {
                first: this.first,
                last: this.last,
                email: this.email,
                password: this.password
            })
            .then(data => {
                if (data.data.success) {
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            })
            .catch(err => console.log("in registration.js", err.message));
    }

    handleChange(e) {
        this[e.target.name] = e.target.value;
        //you could also put these informations in state
        // console.log("e.target.value", e.target.value);
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.error && <div className="error">Oops!</div>}
                </div>
                <h2>Please register</h2>
                <input
                    type="text"
                    name="first"
                    onChange={e => this.handleChange(e)}
                    required
                />
                <input
                    type="text"
                    name="last"
                    onChange={e => this.handleChange(e)}
                    required
                />
                <input
                    type="email"
                    name="email"
                    onChange={e => this.handleChange(e)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    onChange={e => this.handleChange(e)}
                    required
                />
                <button onClick={this.submit}>Register</button>
                <br />
                <p>
                    You are a member? <Link to="/login">Log in</Link>
                </p>
            </div>
        );
    }
}
