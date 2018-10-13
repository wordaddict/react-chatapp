import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chat from './components/chat';
import {BrowserRouter, Route} from 'react-router-dom';

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App}/>
            <Route exact path="/chat" component={Chat}/>
        </div>
    </BrowserRouter>
), document.getElementById('root'));

