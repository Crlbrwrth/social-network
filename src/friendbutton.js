import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [friendReq, setFriendReq] = useState(false);
    const [reqAccepted, setReqAccepted] = useState(false);
    const [isSender, setIsSender] = useState(false);

    useEffect(
        () => {
            (async () => {
                try {
                    const { data } = await axios.get(
                        `/check-request/${props.id}/json`
                    );
                    data.isSender == true
                        ? setIsSender(true)
                        : setIsSender(false);
                    data.requestSent == true
                        ? setFriendReq(true)
                        : setFriendReq(false);
                    data.friendship == true
                        ? setReqAccepted(true)
                        : setReqAccepted(false);
                } catch (e) {
                    console.log(
                        "err in friendbutton.js GET /check-request...: ",
                        e.message
                    );
                }
            })();
        },
        [props.id]
    );

    const addFriend = async () => {
        try {
            const { data } = await axios.get(`/add-friend/${props.id}/json`);
            data.result == true ? setFriendReq(true) : setFriendReq(false);
        } catch (e) {
            console.log("err in GET add-friend route", e.message);
        }
    };

    const cancelRequest = async () => {
        setFriendReq(false);
        setReqAccepted(false);
        setIsSender(false);
        try {
            axios.get(`/end-friendship/${props.id}/json`);
        } catch (e) {
            console.log("err in cancelRequest listener", e.message);
        }
    };

    const acceptRequest = async () => {
        setReqAccepted(true);
        setFriendReq(true);
        try {
            await axios.get(`/accept-friend/${props.id}/json`);
        } catch (e) {
            console.log("err in GET add-friend acceptRequest route", e.message);
        }
    };

    return (
        <div className="friend-button">
            {!friendReq && !isSender && (
                <button onClick={addFriend}>Add to Friendlist</button>
            )}
            {friendReq && !reqAccepted && !isSender && (
                <button className="cancel" onClick={cancelRequest}>
                    Cancel Request
                </button>
            )}
            {!reqAccepted && isSender && (
                <button onClick={acceptRequest}>Accept Friend Request</button>
            )}
            {friendReq && reqAccepted && (
                <button className="cancel" onClick={cancelRequest}>
                    End Friendship
                </button>
            )}
        </div>
    );
}
