import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import './App.css';
import './components/chat.css'
import store from './store';
import { createRoomName, setFullName } from './actions/index'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: '',
      fullName: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleNameChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }

  handleRoomChange(e) {
    e.preventDefault();
    const room = e.target.value;
    store.dispatch(createRoomName(room));
    this.setState({
      room: e.target.value
    });
  }

  handleClick() {
    console.log("Room: " + this.state.room);
    console.log("Name: " + this.state.name);
    this.setState({
      name: '',
      room: ''
    });
    const room = this.state.room;
    const fullName = this.state.fullName;
    this.props.history.push({
      pathname: `/chat`,
      search: `?name=${fullName}&room=${room}`
    });
  };

  render() {
    const reduxState = store.getState();
    console.log('reduxState', reduxState);
    const responseGoogle = (response) => {
      if (!response) {
        return;
      }
      const fullName = response.profileObj.name;
      store.dispatch(setFullName(fullName));
      console.log(response.profileObj.name);
      this.setState({
        fullName: fullName
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
                <input type="text" name="room" placeholder="Room" value={this.state.room} onChange={this.handleRoomChange}/>
              </div>
              <GoogleLogin
                clientId="774666208006-pv3jtdj6ahv8e08h209rdi1okthcq616.apps.googleusercontent.com"
                buttonText="Get name"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            <div className="form-field">
              <button type="button" onClick={this.handleClick}>Join</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

