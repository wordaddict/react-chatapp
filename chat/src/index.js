import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chat from './components/chat';
import { Provider } from "react-redux";
import {BrowserRouter, Route} from 'react-router-dom';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/chat" component={Chat}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);


