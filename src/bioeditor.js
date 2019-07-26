import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log("e:", e.target.value);
        this.setState({ newBio: e.target.value });
    }

    async submit(e) {
        e.preventDefault();
        let returned = await axios.post("/bio", {
            bio: this.state.newBio
        });
        this.state.editing = false;
        this.props.changeBio(returned.data.bio);
        console.log("this.state: ", this.state);
    }

    render() {
        return (
            <div>
                {this.state.editing && (
                    <div>
                        <textarea
                            name="textarea"
                            onChange={this.handleChange}
                        />
                        <button onClick={this.submit}>Commit new Bio</button>
                    </div>
                )}

                {this.props.bio && (
                    <div>
                        <h3>Your astonishing Biography</h3>
                        {<p>{this.props.bio}</p> || <button>Add bio</button>}
                    </div>
                )}

                {!this.state.editing && (
                    <button onClick={() => this.setState({ editing: true })}>
                        Update Biography
                    </button>
                )}
            </div>
        );
    }
}