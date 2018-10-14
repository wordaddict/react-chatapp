import React, { Component } from 'react';
import moment from 'moment';
import '../components/chat.css'

const io = require('socket.io-client');
const socket = io.connect('https://afternoon-sands-58050.herokuapp.com');

  socket.on('connect', function () {
    console.log('connected to server');
    // const urlParams = new URLSearchParams(window.location.search);
    // console.log('Url', urlParams);
    // const name = urlParams.get('name');
    // console.log('name', name);
    // const room = urlParams.get('room');
    // console.log('room', room);
    // const params = {
    //   name,
    //   room
    // }
    //socket.emit('join', params);
   });
  
   socket.on('newMess', (data) => {
    console.log('for the group', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {},
      message: '',
      messages: {},
      newMessage: {},
      messageArray: []
    }
    this.createMessage = this.createMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('Url', urlParams);
    const name = urlParams.get('name');
    console.log('name', name);
    const room = urlParams.get('room');
    console.log('room', room);
    const params = {
      name,
      room
    }
    socket.emit('join', params);
    socket.on('adminMessage', (data) => {
       console.log('greetings from admin', data);
       const formattedTime = moment(data.createdAt).format('h:mm a');
       const { from, text } = data
       console.log('formattedTime', formattedTime);
       this.setState({
        admin: {
          from,
          text,
          createdAt: formattedTime
        }
       })
    })

    socket.on('newMessage', (data) => {
      const formattedTime = moment(data.createdAt).format('h:mm a');
      data.createdAt = formattedTime;
      this.setState({ messageArray: this.state.messageArray.concat(data) })
      console.log('new message', data);
      console.log('messageArray', this.state.messageArray)
    })
  }
  
  createMessage() {
    socket.on('createMessage', (data) => {
      console.log('new message', data);
      const formattedTime = moment(data.createdAt).format('h:mm a');
      const { from, text } = data
      console.log('formattedTime', formattedTime);
      this.setState({
        messages: {
         from,
         text,
         createdAt: formattedTime
        }
      })
      console.log('message', this.state.messages);
   })
  }

  handleMessageChange(e) {
    e.preventDefault();
    this.setState({
      message: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      message: ''
    });
    this.createMessage();
    const message = this.state.message;
    socket.emit('createMessage', {
      message
    }, function(data) {
      console.log('daaata', data);
    })
  }

  render() {
    const message = this.state.message;
    console.log('message', message);
    return (
      <div className="chat">
          <div className="chat__sidebar">
            <h3>People</h3>
            <div id="users"></div>
          </div>
          <div className="chat__main">
            <ol id="messages" class="chat__messages"></ol>
             <div id="message-template" type="text/template">
                <ol className="chat__messages">
                <li class="message">
                  <div class="message__title">
                    <h4>{this.state.admin.from}</h4>
                    <span>{this.state.admin.createdAt}</span>
                  </div>
                  <div class="message__body">
                    <p>{this.state.admin.text}</p>
                  </div>
                </li>
              </ol>
              {this.state.messageArray.map(
                ({ from, text, createdAt }, i) => [
                    <ol className="chat__messages">
                    <li class="message">
                      <div class="message__title">
                        <h4>{from}</h4>
                        <span>{createdAt}</span>
                      </div>
                      <div class="message__body">
                        <p>{text}</p>
                      </div>
                    </li>
                  </ol>
                ]
              )}
            </div>
          <div className="chat__footer">
            <form id="message-form">
              <input name="message" type="text" placeholder="Message" autoFocus autoComplete="off" value={this.state.message} onChange={this.handleMessageChange}/>
              <button type="button" onClick={this.handleClick}>Send</button>
            </form>
          </div>
          </div>
      </div>
    )
  }
}
