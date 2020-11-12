import SocketIOClient from 'socket.io-client';

class SocketManager {
    instance = null;
    constructor() {
        this.socket = SocketIOClient('http://localhost:5000');
    }

    getSocket = () => {
        return this.socket;
    }

    createInstance = () => {
        if (this.instance === null) this.instance = new SocketManager();
    }

    getInstance = () => {
        if(this.instance === null) this.instance = new SocketManager();
        else return this.instance;
    }
}