import React from 'react';
import ChatUsers from './chatUsers';
import ChatArea from './chatArea';
import ChatBox from './chatBox';
import { Container, Row } from 'react-bootstrap';
import '../styling/chat.css';

export default class Chat extends React.Component {
    constructor() {
        super();
    }

    render = () => {
        return (
            <div id='chat'>
                <Container style={{ height: 'calc(100vh - 64px)' }}>
                    <Row><ChatUsers /></Row>
                    <Row><ChatArea /></Row>
                    <Row><ChatBox /></Row>
                </Container>
            </div>
        );
    }
}