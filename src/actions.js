import axios from "axios";

// creates the action for retrieving the list of friends and wannabes
export async function retrieveList() {
    try {
        const { data } = await axios.get("/friends-and-wannabes");
        return {
            type: "RETRIEVE_LIST",
            users: data.rows
        };
    } catch (e) {
        console.log("err in actions.js GET /friends-and-wannabes: ", e.message);
    }
}

export async function acceptRequest(id) {
    try {
        await axios.get(`/accept-friend/${id}/json`);
    } catch (e) {
        console.log("err in actions.js GET /accept-friend/... :", e.message);
    }

    return {
        type: "ACCEPT_REQUEST",
        id
    };
}

export async function endFriendship(id) {
    try {
        await axios.get(`/end-friendship/${id}/json`);
    } catch (e) {
        console.log("err in actions.js GET /end-friend/... :", e.message);
    }
    return {
        type: "END_FRIENDSHIP",
        id
    };
}

export function chatMessages(messages) {
    return { type: "MESSAGES", messages };
}

export function chatMessage(message) {
    return { type: "MESSAGE", message };
}
