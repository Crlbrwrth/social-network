import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import { retrieveList, acceptRequest, endFriendship } from "./actions";

export default function Friends(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveList());
    }, []);

    const wannabes = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == false)
    );

    const myFriends = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == true)
    );

    const users = useSelector(state => state.users);

    const realFriends = (
        <div className="real-friends">
            {myFriends &&
                myFriends.map(user => (
                    <div className="friend" key={user.uid}>
                        <h4>
                            {user.first} {user.last}
                        </h4>
                        <img src={user.profile_pic} />
                        <button
                            className="cancel"
                            onClick={e => dispatch(endFriendship(user.uid))}
                        >
                            End sacred Friendship
                        </button>
                    </div>
                ))}
        </div>
    );

    const wannabeFriends = (
        <div className="wannabe-friends">
            {wannabes &&
                wannabes.map(user => (
                    <div className="friend" key={user.uid}>
                        <h4>
                            {user.first} {user.last}
                        </h4>
                        <img src={user.profile_pic} />
                        <button
                            onClick={e => dispatch(acceptRequest(user.uid))}
                        >
                            Accept Friend Request
                        </button>
                    </div>
                ))}
        </div>
    );

    return (
        <div className="friend-component-wrapper">
            <h1>Friends & Wannabes</h1>
            <div className="friend-component">
                <div className="friend-wrap">
                    <h2>We are your only Friends!</h2>
                    {realFriends}
                </div>
                <div className="wannabe-wrap">
                    <h2>We want to be your friend!</h2>
                    {wannabeFriends}
                </div>
            </div>
        </div>
    );
}
