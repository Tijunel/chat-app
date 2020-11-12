import React from 'react';
import { Button } from 'react-bootstrap';
import '../styling/error.css';

const delay = ms => new Promise(res => setTimeout(res, ms));

export default class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonTitle: 'Retry'
        }
    }

    retry = async () => {
        this.props.retryConnection();
        this.setState({ buttonTitle: 'Retrying...' });
        await delay(1000);
        this.setState({ buttonTitle: 'Retry' });
    }

    render = () => {
        return (
            <div id='error'>
                <b>Oops! Something went wrong.</b>
                <Button id='retry-button' onClick={this.retry}>
                    <div><b>{this.state.buttonTitle}</b></div>
                </Button>
            </div>
        );
    }
}