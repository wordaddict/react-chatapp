import { createStore } from 'redux';
import reducer from '../reducers/index'

const initialState = { 
    name: '', 
    room: '', 
    admin: {},
    message: '',
    messages: {},
    messageArray: [],
    userList: [] 
}
const store = createStore(reducer, initialState);

export default store;