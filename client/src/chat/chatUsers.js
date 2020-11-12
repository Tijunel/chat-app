import React from 'react';
import SocketManager from '../socket';
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
                    this.generateUI(res);
                    const socket = SocketManager.getInstance().getSocket();
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
        console.log(activeUsers)
        for(const userData of activeUsers) {
            UI.push(
                <div style={{color: userData.colour}} key={i} id='user'>
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
                <div><b>Users</b></div>
                {this.state.UI}
            </div>
        );
    }
}