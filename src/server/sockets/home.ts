import * as WebSocket from 'ws';
import SocketController from './../controllers/socketController';

export default class Home {
    private _webSocket: WebSocket;
    private _socketController: SocketController

    constructor(server: SocketController, webSocket: WebSocket) {
        webSocket.on('close', () => {
            server.removeClient(webSocket['data'].id);
            webSocket.terminate()
        });

        webSocket.on('message', (payload) => {
            console.log('message recieved:', payload)
            server.sendToAllClients(payload);
        });
    }
}