const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3007;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.set('view engine', 'jsx');
app.use(express.static(path.join(__dirname, '../chat/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../chat/build', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createM', (data, callback) => {
    console.log('Message from client', data);
    io.emit('newMess', generateMessage(data.from, data.text));
    //socket.emit('adminMessage', generateMessage('Admin', 'Welcome to the chat app'));
    callback();
  });

  socket.emit('adminMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.on('join', (params) => {
    // if (!isRealString(params.name) || !isRealString(params.room)) {
    //   return callback('Name and room name are required.');
    // }
    console.log('Room and name params got here', params)
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    // callback();
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);
    console.log('User', user);
    console.log('message fro  createmessage', message);

    // if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.message));
    // }
    callback();
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
