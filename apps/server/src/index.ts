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

    socket.send('hello, here is server.');
});

wss.on('listening', () => {
    console.log('server start.');
})