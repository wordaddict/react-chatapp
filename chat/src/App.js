import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from "react-redux";
import './App.css';
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
    this.props.createRoomName(room);
  }

  handleClick() {
    this.props.history.push({
      pathname: `/chat`
    });
  };

  render() {
    const responseGoogle = (response) => {
      if (!response) {
        return this.props.history.push({
          pathname: `/`
        });
      }
      const fullName = response.profileObj.name;
      this.props.setFullName(fullName);
      console.log(response.profileObj.name);
      this.props.history.push({
        pathname: `/chat`
      });
    }
    console.log('prop1', this.props)
    return (
      <div className="centered-form">
        <div className="centered-form__form">
          <form action="/chat.html">
            <div className="form-field">
              <h3>Join a Chat</h3>
            </div>
              <div className="form-field">
                <label>Create a room</label>
                <input type="text" name="room" placeholder="Room" value={this.props.room} onChange={this.handleRoomChange}/>
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

function mapStateToProps(state) {
  console.log('state1', state);
  return {
    room: state.room,
  };
}

export default connect(
  mapStateToProps,
  { createRoomName, setFullName }
)(App);

