import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styling/modal.css';

export default class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState({ showModal: this.props.showModal });
        }
    }

    render = () => {
        return (
            <div id="modal">
                <Modal style={{color: "black"}}show={this.state.showModal} onHide={this.props.modalInfo.failureCallback} top>
                    <Modal.Header closeButton>
                        <Modal.Title style={{fontSize: '25px'}}>{this.props.modalInfo.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <b>{this.props.modalInfo.message}</b>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id="modalButton" onClick={this.props.modalInfo.successCallback}>
                            <div><b>{this.props.modalInfo.primaryButtonTitle}</b></div>
                        </Button>
                        {(this.props.modalInfo.cancelOption) ?
                            <Button id="modalButton" onClick={this.props.modalInfo.failureCallback}>
                                <div><b>Cancel</b></div>
                        </Button>
                            : ""
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}