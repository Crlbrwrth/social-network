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
        this.submit = this.submit.bind(this);
    }
    submit() {
        console.log("this: ", this.email, this.first, this.last, this.password);
        // req.session.user = {
        //     first: req.body.first,
        //     last: req.body.last,
        //     email: req.body.email
        // };
        axios
            .post("/register", {
                first: this.first,
                last: this.last,
                email: this.email,
                password: this.password
            })
            .then(data => {
                //if data.success ==> location.replace("/")
                //if !data.success ==> this.sendState({error: true})
            });
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
                    You are a member? <a href="#">Log in</a>
                </p>
            </div>
        );
    }
}
