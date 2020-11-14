import React from 'react';
import Cookies from 'js-cookie';
import { Form, Button } from 'react-bootstrap';
import '../styling/chatBox.css';

const delay = ms => new Promise(res => setTimeout(res, ms));

export default class ChatBox extends React.Component {
    constructor() {
        super();
        this.formRef = React.createRef();
        this.state = {
            buttonTitle: 'Send',
            buttonDisabled: false,
            placeholder: 'Type here... Commands: "/name x" or "/color RRGGBB"; Emojis: :) , :( , :o"'
        }
    }

    showFailure = async () => {
        this.setState({ buttonTitle: 'Failed...', buttonDisabled: true });
        await delay(1000);
        this.setState({ buttonTitle: 'Send', buttonDisabled: false });
    }

    showCommandError = async (message) => {
        this.formRef.current.value = '';
        this.setState({ placeholder: message });
        await delay(2000);
        this.setState({ placeholder: 'Type here... Commands: "/name x" or "/color RRGGBB"; Emojis: :) , :( , :o"' });
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

    sendCommand = (username, color) => {
        fetch('/api/user/', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                colour: color
            })
        })
            .then(res => {
                if (res.status === 200) this.formRef.current.value = '';
                else this.showCommandError("Command failed, please try again...");
            })
            .catch(err => { this.showCommandError("Command failed, please try again..."); });
    }

    parseCommands = (text) => {
        if (text[0] !== '/' || text.split(" ").length !== 2) {
            if (text[0] !== '/') this.sendMessage(text);
            else this.showCommandError("Command failed, please try again...");
            return;
        }
        const command = text.split(" ")[0];
        if (command === '/name') {
            const name = text.split(" ")[1];
            if(name.length < 6) {
                this.showCommandError("Name must be at least 6 characters...");
                return;
            }
            this.sendCommand(name, JSON.parse(Cookies.get('userData').split('j:')[1]).colour);
        } else if (command === '/color') {
            const color = '#' + text.split(" ")[1];
            let style = new Option().style;
            style.color = color;
            if (style.color === '' || color === "#FFFFFF" || color.length < 7) {
                this.showCommandError("Invalid color...");
                return;
            }
            this.sendCommand(JSON.parse(Cookies.get('userData').split('j:')[1]).username, color);
        }
        else this.sendMessage(text);
    }

    handleSubmission = () => {
        if (this.formRef.current.value === '') return;
        else this.parseCommands(this.formRef.current.value.trim());
    }

    checkForEmojis = () => {
        let text = this.formRef.current.value;
        const plain = [":)", ":(", ":o"];
        const emoji = ["😁", "🙁", "😲"];
        for(var i = 0; i < plain.length; i++) {
            var index = text.indexOf(plain[i]);
            if (index >= 0) this.formRef.current.value = text.replace(plain[i], emoji[i]);
        }
    }

    render = () => { // Align to bottom
        return (
            <div id='chat-box'>
                <Form.Group>
                    <Form.Control
                        ref={this.formRef}
                        as="textarea"
                        placeholder={this.state.placeholder}
                        onChange={this.checkForEmojis}
                    />
                </Form.Group>
                <Button onClick={this.handleSubmission} disabled={this.state.buttonDisabled}><div><b>{this.state.buttonTitle}</b></div></Button>
            </div>
        );
    }
}