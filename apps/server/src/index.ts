import WebSocket, { RawData, WebSocketServer } from "ws";
import { symlinkCommon } from "./Utils";

symlinkCommon();

const wss: WebSocketServer = new WebSocketServer({
    port: 9876
});

wss.on('connection', (socket: WebSocket) => {
    socket.on('message', (data: RawData) => {
        console.log(data.toString());
    });

    const obj = {
        name: 'kicher',
        data: 'this is kicher.',
    }
    // socket.send('hello, here is server.');
    socket.send(JSON.stringify(obj));
});

wss.on('listening', () => {
    console.log('server start.');
})