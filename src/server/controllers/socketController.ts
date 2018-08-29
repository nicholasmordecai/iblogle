import { BaseController } from './baseController';
import { Server } from './../main';
import * as WebSocket from 'ws';
import * as uuid from 'uuid';

export class SocketController extends BaseController {

    private static _webSocketServer: WebSocket.Server;
    private static _clients: WebSocket[];

    constructor(server: Server) {
        super();
        SocketController._clients = [];
        this.startWebSocketServer(server)
    }

    private startWebSocketServer(server) {
        SocketController._webSocketServer = new WebSocket.Server({
            port: 4002,
            server: server,
            perMessageDeflate: {
                zlibDeflateOptions: {
                    chunkSize: 1024,
                    memLevel: 7,
                    level: 3,
                },
                clientNoContextTakeover: true,
                serverNoContextTakeover: true,
                clientMaxWindowBits: 10,
                serverMaxWindowBits: 10,
                concurrencyLimit: 10,
                threshold: 1024,
            }
        });

        SocketController._webSocketServer.on('connection', (webSocket, request) => {
            webSocket['data'] = {
                ip: request.connection.remoteAddress,
                id: uuid.v4(),
                firstConnected: Date.now()
            }

            SocketController._clients.push(webSocket);
        });
    }

    public sendToAllClients(data) {
        console.log(SocketController._clients.length)
        for (let i = 0, len = SocketController._clients.length; i < len; i++) {
            console.log('Sending to client: ', SocketController._clients[i]['data'].id)
            // SocketController._clients[i].send('Number of clients connected: ' + SocketController._clients.length);
            SocketController._clients[i].send(data);
        }
    }

    public removeClient(websocketID: string) {
        for (let i = 0, len = SocketController._clients.length; i < len; i++) {
            let client = SocketController._clients[i];
            if (client['data'].id === websocketID) {
                return SocketController._clients.splice(i, 1);
            }
        }
    }

    private getClient(websocketID: string) {
        for (let i = 0, len = SocketController._clients.length; i < len; i++) {
            let client = SocketController._clients[i];
            if (client['data'].id === websocketID) {
                return client;
            }
        }
    }

    public registerMessageHandler(type: string, callback: Function) {

    }
}