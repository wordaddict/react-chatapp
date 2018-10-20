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
            break;
        case SET_FULL_NAME:
            return {
                ...state,
                name: action.payload
            };
            break;
        default:
            return state;
    }
};

export default reducer;