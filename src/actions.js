import axios from "axios";

// creates the action for retrieving the list of friends and wannabes
export async function retrieveList() {
    const { data } = await axios.get("/friends-and-wannabes");
    return {
        type: "RETRIEVE_LIST",
        users: data.rows
    };
}

export async function acceptRequest(id) {
    await axios.get(`/accept-friend/${id}/json`);
    return {
        type: "ACCEPT_REQUEST",
        id
    };
}

export async function endFriendship(id) {
    await axios.get(`/end-friendship/${id}/json`);
    return {
        type: "END_FRIENDSHIP",
        id
    };
}

export async function chatMessages(messages) {
    return { type: "MESSAGES", messages };
}

export async function chatMessage(message) {
    return { type: "MESSAGE", message };
}
