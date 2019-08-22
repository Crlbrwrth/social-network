import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        this[e.target.name] = e.target.value;
    }

    async submit() {
        try {
            let postReq = await axios.post("/login", {
                email: this.email,
                password: this.password
            });
            if (postReq.data.success) {
                location.replace("/");
            }
        } catch (e) {
            console.log("err in login post route login.js");
            this.setState({ error: true });
        }
    }

    render() {
        return (
            <div id="login">
                <h3>Log in, Ant-Lover!</h3>
                {this.state.error && <div className="error">Oops!</div>}
                <input
                    type="email"
                    name="email"
                    onChange={e => this.handleChange(e)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    onChange={e => this.handleChange(e)}
                    placeholder="••••"
                />
                <button onClick={this.submit}>Log in</button>
            </div>
        );
    }
}
