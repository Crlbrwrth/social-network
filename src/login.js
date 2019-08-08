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

    // submit() {
    //     console.log(this.email, this.password);
    //     axios
    //         .post("/login", {
    //             email: this.email,
    //             password: this.password
    //         })
    //         .then(data => {
    //             if (data.data.success) location.replace("/");
    //         })
    //         .catch(err => console.log("err in login.js: ", err.message));
    // }

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

        // .catch(err => console.log("err in login.js: ", err.message));
    }

    render() {
        return (
            <div id="login">
                {this.state.error && <div className="error">Oops!</div>}
                <input
                    type="email"
                    name="email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={this.submit}>Log in</button>
            </div>
        );
    }
}
