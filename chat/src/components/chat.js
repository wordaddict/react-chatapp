import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { connect } from "react-redux";
import '../components/chat.css';
import store from '../store';
import App from '../App';
import { 
  adminMessage, 
  userMessage,
  createMessage, 
  showMessages,
  showUsers
} from '../actions/index'

const Scrollable = styled.div`
  height: 100%;
  overflow: auto;
`

const io = require('socket.io-client');
const socket = io.connect('https://afternoon-sands-58050.herokuapp.com');

  socket.on('connect', function () {
    console.log('connected to server');
  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

class Chat extends Component {
  constructor(props) {
    super(props);
    this.chatsRef = React.createRef();
    this.createMessage = this.createMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
    //const { name, room } = store.getState();
    console.log('App component', App)
    const { name, room } = this.props;
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
       const admin = {
        from,
        text,
        createdAt: formattedTime
      }
       //store.dispatch(adminMessage(admin));
       this.props.adminMessage(admin);
    })

    socket.on('newMessage', (data) => {
      //const { messageArray } = store.getState();
      const { messageArray } = this.props
      const formattedTime = moment(data.createdAt).format('h:mm a');
      data.createdAt = formattedTime;
      const concatMessageArray = messageArray.concat(data);
      this.props.showMessages(concatMessageArray);
      //store.dispatch(showMessages(concatMessageArray));
      console.log('new message', data);
      console.log('messageArrayfor', messageArray);
    });

    socket.on('updateUserList', (data) => {
      console.log('users list', data);
      this.props.showUsers(data);
      //store.dispatch(showUsers(data));
    })
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  scrollToBottom(){
    this.panel.scrollTo(0, this.panel.scrollHeight)
  }
  
  createMessage() {
    socket.on('createMessage', (data) => {
      console.log('new message', data);
      const formattedTime = moment(data.createdAt).format('h:mm a');
      const { from, text } = data
      console.log('formattedTime', formattedTime);
      const messages = {
        from,
        text,
        createdAt: formattedTime
      }
      //store.dispatch(createMessage(messages));
      this.props.createMessage(messages);
   })
  }

  handleMessageChange(e) {
    e.preventDefault();
    const message = e.target.value;
    //store.dispatch(userMessage(message));
    this.props.userMessage(message);
  }

  handleClick(e) {
    e.preventDefault();
    this.createMessage();
    // const reduxState = store.getState();
    // const { message } = reduxState;
    const { message } = this.props;
    socket.emit('createMessage', {
      message
    }, function(data) {
      console.log('daaata', data);
    })

    const data = '';
    this.props.userMessage(data);
    //store.dispatch(userMessage(data));
  }

  handleEnterKey(e) {
    console.log('e code', e);
    if (e.keyCode === 13) {
      this.handleClick(e);
    }
  }

  render() {
    console.log('prop2', this.props)
    // const reduxState = store.getState();
    // const { admin, message, messageArray, userList } = reduxState;
    const { admin, message, messageArray, userList } = this.props;
    return (
      <div className="chat">
          <div className="chat__sidebar">
            <h3>People</h3>
            <div id="users">
              {userList.map((element) => {
                return <ul>
                  <li>{element}</li>
                </ul>
              })}
            </div>
          </div>
          <div className="chat__main">
            <Scrollable innerRef={(panel) => { this.panel = panel; }}>
             <div id="message-template" type="text/template">
                <ol className="chat__messages">
                <li class="message">
                  <div class="message__title">
                    <h4>{admin.from}</h4>
                    <span>{admin.createdAt}</span>
                  </div>
                  <div class="message__body">
                    <p>{admin.text}</p>
                  </div>
                </li>
              </ol>
              {messageArray.map(
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
            </Scrollable>
          <div className="chat__footer">
            <form id="message-form">
              <input name="message" type="text" placeholder="Message" autoFocus autoComplete="off" value={message} onChange={this.handleMessageChange}/>
              <button type="button" onClick={this.handleClick} onKeyUp={this.handleEnterKey}>Send</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state1', state);
  return {
    admin: state.admin,
    message: state.message,
    messageArray: state.messageArray,
    userList: state.userList,
  };
}

export default connect(
  mapStateToProps,
  { adminMessage, userMessage, createMessage, showMessages, showUsers }
)(Chat);
