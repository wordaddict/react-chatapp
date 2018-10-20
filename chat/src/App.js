import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from "react-redux";
import './App.css';
import store from './store';
import { createRoomName, setFullName } from './actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleRoomChange(e) {
    e.preventDefault();
    const room = e.target.value;
    createRoomName(room);
    //store.dispatch(createRoomName(room));
  }

  handleClick() {
    this.props.history.push({
      pathname: `/chat`
    });
  };

  render() {
    const reduxState = store.getState();
    console.log('reduxState', reduxState);
    const responseGoogle = (response) => {
      if (!response) {
        return this.props.history.push({
          pathname: `/`
        });
      }
      const fullName = response.profileObj.name;
      //store.dispatch(setFullName(fullName));
      setFullName(fullName);
      console.log(response.profileObj.name);
      this.props.history.push({
        pathname: `/chat`
      });
    }
    return (
      <div className="centered-form">
        <div className="centered-form__form">
          <form action="/chat.html">
            <div className="form-field">
              <h3>Join a Chat</h3>
            </div>
              <div className="form-field">
                <label>Create a room</label>
                <input type="text" name="room" placeholder="Room" value={reduxState.room} onChange={this.handleRoomChange}/>
              </div>
              <GoogleLogin
                clientId="774666208006-52rnuod7ajlvgv54t113dmr0r88nadlq.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createRoomName, setFullName }
  )(App);

