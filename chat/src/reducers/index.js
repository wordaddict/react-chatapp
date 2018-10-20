import {
    CREATE_ROOM_NAME,
    SET_FULL_NAME,
    SET_ADMIN_MESSAGE,
    SET_MESSAGE,
    CREATE_MESSAGE,
    SET_SHOW_MESSAGES,
    SET_SHOW_USERS
} from '../constants/action-types'

const reducer = (state, action) => {
    switch (action.type) {
        case CREATE_ROOM_NAME:
            return {
                ...state,
                room: action.payload
            };
        case SET_FULL_NAME:
            return {
                ...state,
                name: action.payload
            };
        case SET_ADMIN_MESSAGE:
            return {
                ...state,
                admin: action.payload
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            };
        case CREATE_MESSAGE:
            return {
                ...state,
                messages: action.payload
            };
        case SET_SHOW_MESSAGES:
            return {
                ...state,
                messageArray: action.payload
            };
        case SET_SHOW_USERS:
            return {
                ...state,
                userList: action.payload
            };
        default:
            return state;
    }
};

export default reducer;