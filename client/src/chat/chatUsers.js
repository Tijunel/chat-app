import React from 'react';
import socketIOClient from 'socket.io-client';
import '../styling/chatUsers.css';

export default class ChatUsers extends React.Component {
    constructor() {
        super();
        this.state = {
            UI: []
        }
    }

    componentDidMount = () => {
        fetch('/api/state/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async res => {
                if(res.status === 200) {
                    res = await res.json();
                    console.log(res)
                    this.generateUI(res);
                    const socket = socketIOClient("http://localhost:5000", { reconnection: false });
                    socket.on('active users', (data) => {
                        this.generateUI(data);
                    });
                } else {

                }
            })
            .catch(err => {

            });
    }

    generateUI = (activeUsers) => {
        var UI = [];
        var i = 0;
        for(const userData in activeUsers) {
            UI.push(
                <div style={{color: userData.colour}} key={i}>
                    <b>{userData.username}</b>
                </div>
            );
            i++;
        }
        this.setState({ UI: UI });
    }

    render = () => {
        return (
            <div id='chat-users'>
                {this.state.UI}
            </div>
        );
    }
}