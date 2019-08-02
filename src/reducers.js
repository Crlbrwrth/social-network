export default function(state = {}, action) {
    if (action.type == "RETRIEVE_LIST") {
        state = {
            ...state,
            users: action.users
        };
    }
    if (action.type == "ACCEPT_REQUEST") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.uid != action.id) {
                    return user;
                }
                return {
                    ...user,
                    friend_status: action.type == "ACCEPT_REQUEST"
                };
            })
        };
    }
    if (action.type == "END_FRIENDSHIP") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id != action.id) {
                    return user;
                }
                return {
                    ...user,
                    friend_status: action.type == "END_FRIENDSHIP"
                };
            })
        };
    }
    return state;
}
