import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styling/chatBox.css';

const delay = ms => new Promise(res => setTimeout(res, ms));

export default class ChatBox extends React.Component {
    constructor() {
        super();
        this.formRef = React.createRef();
        this.state = {
            buttonTitle: 'Send',
            buttonDisabled: false
        }
    }

    showFailure = async () => {
        this.setState({ buttonTitle: 'Failed...', buttonDisabled: true });
        await delay(1000);
        this.setState({ buttonTitle: 'Send', buttonDisabled: false });
    }

    sendMessage = async (message) => {
        await this.setState({ buttonTitle: 'Sending...' });
        await fetch('/api/message/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        })
            .then(async res => {
                if (res.status === 200) {
                    this.formRef.current.value = '';
                    this.setState({ buttonTitle: 'Send' });
                } else this.showFailure();
            })
            .catch(() => {
                this.showFailure();
            });
    }

    parseCommands = (message) => {
        
    }

    handleSubmission = () => {
        if (this.formRef.current.value === '') return;
        else this.sendMessage(this.formRef.current.value);
    }

    render = () => {
        return (
            <div id='chat-box'>
                <Form.Group>
                    <Form.Control ref={this.formRef} as="textarea" placeholder="Type here..." />
                </Form.Group>
                <Button onClick={this.handleSubmission} disabled={this.state.buttonDisabled}><div><b>{this.state.buttonTitle}</b></div></Button>
            </div>
        );
    }
}