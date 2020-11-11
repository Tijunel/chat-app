import React from 'react';
import socketIOClient from 'socket.io-client';
import '../styling/chatUsers.css';

export default class ChatUsers extends React.Component {
    constructor() {
        super();
    }

    componentDidMount = () => {
        const socket = socketIOClient("http://localhost:5000");
    }

    render = () => {
        return (
            <div id='chat-users'>
                
            </div>
        );
    }
}