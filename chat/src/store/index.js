import { createStore } from 'redux';
import reducer from '../reducers/index'

const initialState = { name: '', room: '' }
const store = createStore(reducer, initialState);

export default store;