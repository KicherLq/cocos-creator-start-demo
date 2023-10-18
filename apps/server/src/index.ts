import WebSocket, { RawData, WebSocketServer } from "ws";
import { symlinkCommon } from "./Utils";
import { setInterval } from "timers/promises";
import { ApiMsgEnum } from "./Common/Enum";

symlinkCommon();

const wss: WebSocketServer = new WebSocketServer({
    port: 9876
});

let inputs = [];

wss.on('connection', (socket: WebSocket) => {
    socket.on('message', (data: RawData) => {
        const str = data.toString();
        try {
            const msg = JSON.parse(str);
            const {name, data} = msg;
            const { frameId, input } = data;
            inputs.push(input);
        } catch (error) {
            console.error(error);
        }
    });

    // const obj = {
    //     name: 'kicher',
    //     data: 'this is kicher.',
    // }
    // // socket.send('hello, here is server.');
    // socket.send(JSON.stringify(obj));
    setInterval(() => {
        const msg = {
            name: ApiMsgEnum.MsgServerSync,
            data: {
                inputs
            }
        }
        socket.send(JSON.stringify(msg));
    }, 100);
});

wss.on('listening', () => {
    console.log('server start.');
})