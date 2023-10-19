import WebSocket, { RawData, WebSocketServer } from "ws";
import { symlinkCommon } from "./Utils";
import { ApiMsgEnum } from "./Common/Enum";
import { MyServer } from "./Core/MyServer";

symlinkCommon();

const server = new MyServer({
    port: 9876
});
server.start().then(() => {
    console.log('server start ok.');
}).catch((error) => {
    console.error(error);
})

// const wss: WebSocketServer = new WebSocketServer({
//     port: 9876
// });

// let inputs = [];

// wss.on('connection', (socket: WebSocket) => {
//     socket.on('message', (data: RawData) => {
//         const str = data.toString();
//         try {
//             const msg = JSON.parse(str);
//             const {name, data} = msg;
//             const { frameId, input } = data;
//             inputs.push(input);
//         } catch (error) {
//             console.error(error);
//         }
//     });

//     setInterval(() => {
//         const temp = inputs;
//         inputs = [];
//         const msg = {
//             name: ApiMsgEnum.MsgServerSync,
//             data: {
//                 inputs: temp,
//             }
//         }
//         socket.send(JSON.stringify(msg));
//     }, 100);
// });

// wss.on('listening', () => {
//     console.log('server start.');
// })