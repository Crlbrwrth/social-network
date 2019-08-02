import axios from "axios";

// creates the action for retrieving the list of friends and wannabes
export async function retrieveList() {
    const { data } = await axios.get("/friends-and-wannabes");
    console.log("data in retrieveList: ", data.output.rows);
    return {
        type: "RETRIEVE_LIST",
        users: data.output.rows
    };
}

// accepts a friend request
export async function acceptRequest(id) {
    console.log("this thing is running");
    const { data } = await axios.get(`/accept-friend/${id}/json`);
    return {
        type: "ACCEPT_REQUEST",
        id
    };
}

// ends a friendship
export async function endFriendship(id) {
    const { data } = await axios.get(`/end-friendship/${id}/json`);
    return {
        type: "END_FRIENDSHIP",
        id
    };
}
