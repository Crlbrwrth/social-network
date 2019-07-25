import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async submit(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        await axios.post("/picture", formData);
    }

    handleChange(e) {
        console.log("e.target: ", e.target.files);
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }

    render() {
        return (
            <div>
                <h2>Add a profile picture</h2>
                <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    onChange={this.handleChange}
                />
                <button onClick={this.submit}>Upload Image</button>
            </div>
        );
    }
}
