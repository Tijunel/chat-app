import React from 'react';
import Cookies from 'js-cookie';
import { Row, Col } from 'react-bootstrap';
import SocketManager from '../socket';
import '../styling/chatUsers.css';

export default class ChatUsers extends React.Component {
    constructor() {
        super();
        this.state = {
            UI: [],
            showError: false
        }
    }

    componentDidMount = () => {
        fetch('/api/state/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async res => {
                if (res.status === 200) {
                    res = await res.json();
                    this.generateUI(res);
                    const socket = SocketManager.getInstance().getSocket();
                    socket.on('active users', (data) => {
                        this.generateUI(data); // Only add or remove
                    });
                }
                else this.setState({ showError: true });
            })
            .catch(err => { this.setState({ showError: true }); });
    }

    generateUI = (activeUsers) => {
        var UI = [];
        var row = [];
        var i = 0;
        // Re-arrange active users so "you" are first
        for (const userData of activeUsers) {
            row.push(
                <Col>
                    <div style={{ color: userData.colour, fontSize: '12px' }} key={i}>
                        <b>{userData.username + ((JSON.parse(Cookies.get('userData').split('j:')[1]).userID === userData.userID) ? " (You)" : "")}</b>
                    </div>
                </Col>
            );
            if (row.length === 2) {
                UI.push(<Row>{row}</Row>);
                row = [];
            }
            i++;
        }
        if (row.length !== 0) UI.push(<Row>{row}</Row>);
        this.setState({ UI: UI, showError: false });
    }

    render = () => {
        return (
            <div id='chat-users'>
                <div style={{ fontSize: '16px' }}><b>Active Users</b></div>
                {!this.state.showError ? (this.state.UI.length > 0 ? this.state.UI : <div style={{ fontSize: '12px' }}>Loading...</div>) : <div style={{ fontSize: '12px' }}>Could not fetch active users. Try refreshing!</div>}
            </div>
        );
    }
}