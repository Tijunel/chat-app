import React from 'react';
import {Row, Col} from 'react-bootstrap';
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
        var row = [];
        var i = 0;
        for(const userData of activeUsers) { // Use rows and columns
            row.push(
                <Col>
                    <div style={{ color: userData.colour, fontSize: '16px' }} key={i} id='user'>
                        <b>{userData.username}</b>
                    </div>
                </Col>
            );
            if(row.length === 3) {
                UI.push(<Row>{row}</Row>);
                row = [];
            } 
            i++;
        }
        if (row.length !== 0) UI.push(<Row>{row}</Row>);
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