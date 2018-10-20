import {
    CREATE_ROOM_NAME,
    SET_FULL_NAME,
    SET_ADMIN_MESSAGE,
    SET_MESSAGE,
    CREATE_MESSAGE,
    SET_SHOW_MESSAGES,
    SET_SHOW_USERS
} from '../constants/action-types'

export const createRoomName = room => ({
    type: CREATE_ROOM_NAME,
    payload: room
});

export const setFullName = name => ({
    type: SET_FULL_NAME,
    payload: name
});

export const adminMessage = admin => ({
    type: SET_ADMIN_MESSAGE,
    payload: admin
});

export const userMessage = message => ({
    type: SET_MESSAGE,
    payload: message
});

export const createMessage = messages => ({
    type: CREATE_MESSAGE,
    payload: messages
});

export const showMessages = messageArray => ({
    type: SET_SHOW_MESSAGES,
    payload: messageArray
});

export const showUsers = userList => ({
    type: SET_SHOW_USERS,
    payload: userList
});