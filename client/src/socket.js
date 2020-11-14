import SocketIOClient from 'socket.io-client';

export default class SocketManager {
    static instance = null;
    constructor() {
        // CHANGE ME 
        // For CPSC linux: http://csx3.cs.ucalgary.ca:5000/
        // For localhost: http://localhost:5000/
        this.socket = SocketIOClient('http://localhost:5000/'); 
    }

    getSocket = () => {
        return this.socket;
    }

    static createInstance = () => {
        if (this.instance === null) this.instance = new SocketManager();
    }

    static getInstance = () => {
        if(this.instance === null) this.instance = new SocketManager();
        else return this.instance;
    }
}