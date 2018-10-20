import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chat from './components/chat';
import {BrowserRouter, Route} from 'react-router-dom';
import store from './store';

const render = function() {
    ReactDOM.render((
        <BrowserRouter>
            <div>
                <Route exact path="/" component={App}/>
                <Route exact path="/chat" component={Chat}/>
            </div>
        </BrowserRouter>
    ), document.getElementById('root'));
};

render();
store.subscribe(render);


