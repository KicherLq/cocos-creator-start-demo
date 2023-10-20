import WebSocket, { RawData, WebSocketServer } from "ws";
import { symlinkCommon } from "./Utils";
import { ApiMsgEnum } from "./Common/Enum";
import { MyServer } from "./Core/MyServer";
import { Connection } from './Core/Connection';
import { PlayerManager } from "./Biz/PlayerManager";
import { IApiPlayerJoinReq, IApiPlayerJoinRes, IApiPlayerListReq, IApiPlayerListRes } from "./Common/Api";

symlinkCommon();

//给Connection模块隐形添加playerId字段
declare module "./Core/Connection" {
    interface Connection {
        playerId: number,
    }
}

const server = new MyServer({
    port: 9876
});

server.on('connection', () => {
    console.log('connection comes', server.connections.size);
});

server.on('disconnection', (connection: Connection) => {
    console.log('connection close', server.connections.size);
    console.log('players size before remove: ', PlayerManager.Instance.players.size);
    if(connection.playerId) {
        PlayerManager.Instance.removePlayer(connection.playerId);
    }
    PlayerManager.Instance.syncPlayers();
    console.log('players size after remove: ', PlayerManager.Instance.players.size);
});

server.setApi(ApiMsgEnum.ApiPlayerJoin, (connection: Connection, data: IApiPlayerJoinReq): IApiPlayerJoinRes => {
    const { nickname } = data;
    const player = PlayerManager.Instance.createPlayer({nickname, connection});
    connection.playerId = player.id;

    //每当有玩家登陆服务端发送所有玩家的列表用于客户端同步
    PlayerManager.Instance.syncPlayers();

    return {
        player: PlayerManager.Instance.getPlayerView(player),
    };
});

server.setApi(ApiMsgEnum.ApiPlayerList, (connection: Connection, data: IApiPlayerListReq): IApiPlayerListRes => {
    return {
        list: PlayerManager.Instance.getPlayersView(),
    };
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