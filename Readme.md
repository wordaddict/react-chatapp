This is a Chat application in React and Redux and Node.js

Author: Adeyinka Micheal

**Environments**
Node version - v8.12.0 (LTS)

NPM version - v6.4.1

**Install all dependencies**
```
npm install
```

**Create a frontend build**
```
cd chat && sudo npm run build
```
**Start the application**
```
npm start
```

1) The Chat Application has a login page
**Route**
``
/
``
``
    - Create Room
    - Google login 
``
Picture of the login page - ('./pictures/login.png')

2) Main Chat Bar
**Route**
``
/chat
``

Picture of the login page - ('./pictures/chat.png')

#It has the sidebar to list the number of people#
#It Also has the Main Chat frame#


#-------------------------------PORT & URL--------------------------------------------------

port = 3007;
Live Application URL = https://afternoon-sands-58050.herokuapp.com

#------------------Implementation explanantion-------------------------------------
I used socket.io for a bidirectional communication between the client and server using events
Events are either emitted by the client and listened to by the server or emitted by the server and listened to by the client

user profiles, messages and userlist are all handled by the util function


#-------------------------------Implemenation time logs---------------------------------------

It took a totalo of 50 hours to complete the application