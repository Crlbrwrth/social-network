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
                    accepted: action.type == "ACCEPT_REQUEST"
                };
            })
        };
    }
    if (action.type == "END_FRIENDSHIP") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.uid != action.id) {
                    return user;
                }
                return {};
            })
        };
    }
    if (action.type == "MESSAGES") {
        state = {
            ...state,
            messages: action.messages
        };
    }
    if (action.type == "MESSAGE") {
        state = {
            ...state,
            messages: [...state.messages, action.message]
        };
    }
    return state;
}
