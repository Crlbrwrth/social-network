import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        console.log("id: ", id);
        const { data } = await axios.get(`/user/${id}/json`);
        console.log("datawswdd", data);
        this.setState(data);
    }
    render() {
        return (
            <div>
                <h2>{this.state.first}??</h2>
            </div>
        );
    }
}
