import React from 'react';
import Message from './message';
import SocketManager from '../socket';

import '../styling/chatArea.css';

export default class ChatArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            messageUI: [],
            showError: false
        }
        this.bottomRef = React.createRef();
    }

    componentDidMount = () => {
        fetch('/api/message/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async res => {
                if (res.status === 200) {
                    res = await res.json();
                    this.generateMessageUI(res);
                    const socket = SocketManager.getInstance().getSocket();
                    socket.on('new message', (message) => {
                        this.addMessage(message);
                    });
                    socket.on('user update', (data) => {
                        this.updateMessages(data);
                    });
                }
                else this.setState({ showError: true });
            })
            .catch(err => { this.setState({ showError: true }); });
    }

    generateMessageUI = async (messages) => {
        let messageUI = [];
        var i = 0;
        for (let message of messages) {
            await fetch('/api/user/' + message.userID, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(async res => {
                    if (res.status === 200) {
                        res = await res.json();
                        message.username = res.username;
                        message.colour = res.colour;
                        let timestamp = new Date(message.timestamp);
                        messageUI.push(
                            <Message
                                key={i}
                                message={message.message}
                                timestamp={timestamp.toLocaleString()}
                                username={res.username}
                                userID={message.userID}
                                colour={res.colour}
                            />
                        );
                        i++;
                    }
                    else this.setState({ showError: true });
                })
                .catch(err => { this.setState({ showError: true }); });
        }
        this.setState({ messages: messages, messageUI: messageUI });
        this.scrollToBottom();
    }

    addMessage = (message) => {
        let messages = [...this.state.messages];
        messages.push(message);
        let messageUI = [this.state.messageUI];
        let timestamp = new Date(message.timestamp);
        messageUI.push(
            <Message
                key={messageUI.length}
                message={message.message}
                timestamp={timestamp.toLocaleString()}
                username={message.username}
                userID={message.userID}
                colour={message.colour}
            />
        );
        this.setState({ messages: messages, messageUI: messageUI });
        this.scrollToBottom();
    }

    updateMessages = (userUpdate) => {
        let messages = [...this.state.messages];
        let messageUI = [...this.state.messageUI];
        for (let i in messages) {
            if (messages[i].userID === userUpdate.userID) {
                messages[i].username = userUpdate.username;
                messages[i].colour = userUpdate.colour;
                let timestamp = new Date(messages[i].timestamp);
                messageUI[i] = (
                    <Message
                        key={i}
                        message={messages[i].message}
                        timestamp={timestamp.toLocaleString()}
                        username={userUpdate.username}
                        userID={userUpdate.userID}
                        colour={userUpdate.colour}
                    />
                );
            }
        }
        this.setState({ messages: messages, messageUI: messageUI });
    }

    scrollToBottom = () => {
        if (this.bottomRef.current === null) return;
        this.bottomRef.current.scrollIntoView({ behaviour: 'smooth' });
    }

    render = () => {
        return (
            <div id='chat-area'>
                <div id='message-area'>
                    {this.state.messageUI}
                    <div id='bottom-ref' ref={this.bottomRef}></div>
                </div>
            </div>
        );
    }
}