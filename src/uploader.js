import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hide = this.hide.bind(this);
    }

    async submit(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        let image = await axios.post("/picture", formData);
        this.props.changeImage(image.data.url);
    }

    async hide(e) {
        e.preventDefault();
        await this.props.hideUploader();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }

    render() {
        return (
            <div id="uploader">
                <span className="close-uploader" onClick={this.hide}>
                    X
                </span>
                <h2>Add a profile picture</h2>
                <label htmlFor="file">Choose Image</label>
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
