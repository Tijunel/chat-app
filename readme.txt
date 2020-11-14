Justinas Tijunelis

30018513

GitHub Repository: https://github.com/Tijunel/chat-app


Instructions:

First, open the chat-app project in your environment:

cd chat-app

Then, install the packages for the server side:

npm i

Then, isntall the packages for the client side:

cd client && npm i


There are 3 ways to run the chat app:

1) Dev Mode

First, ask if you are working on a remote machine or on local host.

Then, go to the socket.js file in chat-app>client>src>socket.js.

If on localhost, set the socket-io link to http://localhost:5000/

If on remote host, set the socket-io link to http(s)://remote_server:5000/ (Or no port if you have port forwarding)

Now, start the server:

    cd chat-app && node server.js

Then, start the client:

    cd client && npm start

Enjoy! Web page is available on port 3000.


2) Production mode on local host

Go to the socket.js file in chat-app>client>src>socket.js.

Set the socket-io link to http://localhost:5000/

Then, build the front end:

    cd client && npm run build

Then, start the server:

    cd .. && node server.js

Enjoy! The web page is available on local host at port 5000.


3) Production mode on remote server

Go to the socket.js file in chat-app>client>src>socket.js.

Set the socket-io link to the address of the remote server

Then, build the front end:

    cd client && npm run build

Then, start the server:

    cd .. && node server.js

Enjoy! The web page is running on the address of your remote server.

Mind that the system uses cookies, so you might want to clear them sometimes using the inspector: Application>Cookies.

