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
                <Container style={{ height: 'calc(100vh - 54px)' }}>
                    <div id='chat' style={{display: 'grid', gridTemplateRows: '80% 20%', border: 'solid thick;', height: '100%'}}>
                        <div><ChatUsers /><ChatArea /></div>
                        <div><ChatBox /></div> 
                    </div>
                </Container>
            </div>
        );
    }
}