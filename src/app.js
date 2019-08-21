import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";
import { Chat } from "./chat";
import { Route, BrowserRouter, Link } from "react-router-dom";

import Friends from "./friends";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            onClick: () => this.setState({ uploaderVisible: true })
        };
    }

    async componentDidMount() {
        const { data } = await axios.get("/user");
        this.setState(data);
    }

    render() {
        return (
            <div className="app">
                <nav>
                    <img src={"/logo.jpg"} alt="logo" />
                    <div className="nav-links">
                        <a className="nav-link" href="/chat">
                            <span>Chat</span>
                        </a>
                        <a className="nav-link" href="/">
                            <span>Your Profile</span>
                        </a>
                        <a className="nav-link" href="/friends">
                            <span>Your Friends</span>
                        </a>
                        <a className="nav-link" href="/users">
                            <span>Find Friends</span>
                        </a>
                    </div>
                    <div className="nav-pic">
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            image={this.state.image || "/default.png"}
                            onClick={() =>
                                this.setState({ uploaderVisible: true })
                            }
                        />
                    </div>
                </nav>
                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Profile
                                    bio={this.state.bio}
                                    image={this.state.image}
                                    first={this.state.first}
                                    last={this.state.last}
                                    updateBio={newBio => {
                                        this.setState({
                                            bio: newBio
                                        });
                                    }}
                                    onClick={this.state.onClick}
                                />
                            )}
                        />

                        <Route path="/user/:id" component={OtherProfile} />
                        <Route path="/users" component={FindPeople} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} />
                    </div>
                </BrowserRouter>

                {this.state.uploaderVisible && (
                    <Uploader
                        changeImage={imageUrl => {
                            this.setState({
                                image: imageUrl,
                                uploaderVisible: false
                            });
                        }}
                        hideUploader={() => {
                            this.setState({
                                uploaderVisible: false
                            });
                        }}
                    />
                )}
            </div>
        );
    }
}
