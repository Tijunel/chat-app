import React from 'react';
import '../styling/chatArea.css';

export default class ChatArea extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            showError: false
        }
    }

    componentDidMount = () => {
        // Get all messages, add socket listener for new messages
        fetch('/api/message/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async res => {
                if (res.status === 200) {
                    res = await res.json();
                } else {

                }
            })
            .catch(err => {
                // Show error
            })
    }

    generateMessages = () => {

    }

    addMessage = () => {
        
    }

    render = () => {
        return (
            <div id='chat-area'>

            </div>
        );
    }
}