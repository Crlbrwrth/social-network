import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [friendReq, setFriendReq] = useState(false);
    const [reqAccepted, setReqAccepted] = useState(false);
    const [isSender, setIsSender] = useState(false);

    useEffect(
        () => {
            (async () => {
                const { data } = await axios.get(
                    `/check-request/${props.id}/json`
                );
                console.log("data pray: ", data);
                data.isSender == true ? setIsSender(true) : setIsSender(false);
                data.requestSent == true
                    ? setFriendReq(true)
                    : setFriendReq(false);
                data.friendship == true
                    ? setReqAccepted(true)
                    : setReqAccepted(false);
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
            await axios.get(`/add-friend/${props.id}/json`);
        } catch (e) {
            console.log("err in GET add-friend acceptRequest route", e.message);
        }
    };

    return (
        <div className="friend-button">
            <h2>Manage Friendship</h2>
            {!friendReq && !isSender && (
                <button onClick={addFriend}>Add to Friendlist</button>
            )}
            {friendReq && !reqAccepted && !isSender && (
                <button onClick={cancelRequest}>Cancel Request</button>
            )}
            {!reqAccepted && isSender && (
                <button onClick={acceptRequest}>Accept Friend Request</button>
            )}
            {friendReq && reqAccepted && (
                <button onClick={cancelRequest}>End Friendship</button>
            )}
        </div>
    );
}
