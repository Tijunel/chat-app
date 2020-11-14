import React from 'react';
import Cookies from 'js-cookie';
import '../styling/message.css';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div id='message'>
                <div style={{ color: this.props.colour, fontSize: '16px' }}>
                    {(this.props.userID === JSON.parse(Cookies.get('userData').split('j:')[1]).userID) ? <b>{this.props.username}</b> : this.props.username}
                </div>
                <div style={{ fontSize: '16px' }}>
                    {(this.props.userID === JSON.parse(Cookies.get('userData').split('j:')[1]).userID) ? <b>{this.props.message}</b> : this.props.message}
                </div>
                <div style={{ fontSize: '12px' }}>{this.props.timestamp.toString()}</div>
            </div>
        );
    }
}