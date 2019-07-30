import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        const { data } = await axios.get(`/user/${id}/json`);
        console.log("datawswdd", data);
        this.setState(data);
    }
    render() {
        return (
            <div className="other-user">
                <h2>
                    {this.state.first} {this.state.last}
                </h2>
                <div>{this.state.bio || "No Biography availlable"}</div>
                <img src={this.state.profile_pic} />
            </div>
        );
    }
}
