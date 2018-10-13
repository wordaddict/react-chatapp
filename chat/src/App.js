import React, { Component } from 'react';
import './App.css';
import './components/chat.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: ''
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
    const name = this.state.name;
    this.props.history.push({
      pathname: `/chat`,
      search: `?name=${name}&room=${room}`
    });
  };

  render() {
    return (
      <div className="centered-form">
        <div className="centered-form__form">
          <form action="/chat.html">
            <div className="form-field">
              <h3>Join a Chat</h3>
            </div>
            <div className="form-field">
              <label>Display name</label>
              <input type="text" name="name" autoFocus placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
            </div>
            <div className="form-field">
              <label>Room name</label>
              <input type="text" name="room" placeholder="Room" value={this.state.room} onChange={this.handleRoomChange}/>
            </div>
            <div className="form-field">
              <button type="button" onClick={this.handleClick}>Join</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
