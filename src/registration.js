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
    }

    render() {
        return (
            <div id="registration">
                <div>
                    {this.state.error && <div className="error">Oops!</div>}
                </div>
                <input
                    type="text"
                    name="first"
                    onChange={e => this.handleChange(e)}
                    placeholder="First name"
                    required
                />
                <input
                    type="text"
                    name="last"
                    placeholder="Last name"
                    onChange={e => this.handleChange(e)}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={e => this.handleChange(e)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Choose a password"
                    onChange={e => this.handleChange(e)}
                    required
                />
                <button onClick={this.submit}>register</button>
                <br />
                <p>
                    You are a member? <Link to="/login">Log in</Link>
                </p>
            </div>
        );
    }
}
