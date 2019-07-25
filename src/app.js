import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import ProfilePic from "./profilepic";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
    }

    async componentDidMount() {
        console.log("mount Mount");
        const { data } = await axios.get("/user");
        this.setState(data);
        console.log("this.state: ", this.state);
    }

    render() {
        return (
            <div>
                <img src={"/logo.jpg"} alt="logo" />
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    image={this.state.image || "/default.png"}
                    onClick={() => this.setState({ uploaderVisible: true })}
                />

                {this.state.uploaderVisible && <Uploader />}
            </div>
        );
    }
}

// done={this.setState({})}
// @UPLOADER: *done = this.setState({image})/>*/}
// 1 Difference for image upload: update query to set new url
