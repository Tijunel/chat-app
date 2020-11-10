import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styling/chatBox.css';

export default class ChatBox extends React.Component {
    constructor() {
        super();
        this.formRef = React.createRef();
    }

    sendMessage = () => {

    }

    handleSubmission = () => {

    }

    render = () => {
        return (
            <div id='chat-box'>
                <Form.Group>
                    <Form.Control ref={this.formRef} as="textarea" placeholder="Type..." />
                </Form.Group>
                <Button onSubmit={this.handleSubmission}><div><b>Send</b></div></Button>
            </div>
        );
    }
}