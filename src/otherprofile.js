import React from "react";
import axios from "./axios";
import FriendButton from "./friendbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        try {
            const id = this.props.match.params.id;
            const { data } = await axios.get(`/user/${id}/json`);
            await this.setState(data);
        } catch (e) {
            console.log(
                "err in otherprofile.js GET //user/${id}/json",
                e.message
            );
        }
    }
    render() {
        return (
            <div className="other-user">
                <h1>
                    {this.state.first} {this.state.last}
                </h1>
                <div>{this.state.bio || "No Biography availlable"}</div>
                <img className="other-image" src={this.state.profile_pic} />
                <FriendButton id={this.props.match.params.id} />
                {this.state.friends && (
                    <div>
                        <hr />
                        <hr />
                        <h2>{this.state.first}&apos;s Friends</h2>
                    </div>
                )}
                <div className="friends-friends">
                    {this.state.friends &&
                        this.state.friends.map(user => (
                            <div className="friends-friend" key={user.uid}>
                                <h4>
                                    {user.first} {user.last}
                                </h4>
                                <a href={"/user/" + user.uid}>
                                    <img src={user.profile_pic} />
                                </a>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}
