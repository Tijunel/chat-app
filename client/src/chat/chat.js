import React from 'react';
import ChatUsers from './chatUsers';
import ChatArea from './chatArea';
import ChatBox from './chatBox';
import { Container, Row as div } from 'react-bootstrap';
import '../styling/chat.css';

export default class Chat extends React.Component {
    constructor() {
        super();
    }

    render = () => {
        return (
            <div id='chat'>
                <Container>
                    <div id='chat' style={{display: 'grid', gridTemplateRows: '80% 20%'}}>
                        <div id='chat-container'><ChatUsers /><ChatArea /></div>
                        <div style={{zIndex: '10000'}}><ChatBox /></div> 
                    </div>
                </Container>
            </div>
        );
    }
}