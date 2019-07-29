import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import { Route, BrowserRouter, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            onClick: () => this.setState({ uploaderVisible: true })
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
                <nav>
                    <img src={"/logo.jpg"} alt="logo" />
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        image={this.state.image || "/default.png"}
                        onClick={() => this.setState({ uploaderVisible: true })}
                    />
                </nav>
                <main>
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
                                    />
                                )}
                            />

                            <Route path="/user/:id" component={OtherProfile} />
                        </div>
                    </BrowserRouter>

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
                    />

                    {!this.state.image && (
                        <button onClick={this.state.onClick}>
                            Update image
                        </button>
                    )}

                    {this.state.uploaderVisible && (
                        <Uploader
                            changeImage={imageUrl => {
                                this.setState({
                                    image: imageUrl,
                                    uploaderVisible: false
                                });
                            }}
                        />
                    )}
                </main>
            </div>
        );
    }
}

// done={this.setState({})}
// @UPLOADER: *done = this.setState({image})/>*/}
// 1 Difference for image upload: update query to set new url
