import { createStore } from 'redux';
import reducer from '../reducers/index'

const initialState = { name: '' }
const store = createStore(reducer, initialState);

export default store;