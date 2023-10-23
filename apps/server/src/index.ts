import WebSocket, { RawData, WebSocketServer } from "ws";
import { symlinkCommon } from "./Utils";
import { ApiMsgEnum } from "./Common/Enum";
import { MyServer } from "./Core/MyServer";
import { Connection } from './Core/Connection';
import { PlayerManager } from "./Biz/PlayerManager";
import { IApiPlayerJoinReq, IApiPlayerJoinRes, IApiPlayerListReq, IApiPlayerListRes, IApiRoomCreateReq, IApiRoomCreateRes, IApiRoomJoinReq, IApiRoomJoinRes, IApiRoomLeaveReq, IApiRoomLeaveRes, IApiRoomListReq, IApiRoomListRes } from "./Common/Api";
import { RoomManager } from "./Biz/RoomManager";

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

server.setApi(ApiMsgEnum.ApiRoomList, (connection: Connection, data: IApiRoomListReq): IApiRoomListRes => {
    return {
        list: RoomManager.Instance.getRoomsView(),
    };
});

server.setApi(ApiMsgEnum.ApiRoomCreate, (connection: Connection, data: IApiRoomCreateReq): IApiRoomCreateRes => {
    if(connection.playerId) {
        const newRoom = RoomManager.Instance.createRoom();
        const room = RoomManager.Instance.joinRoom(newRoom.roomId, connection.playerId);
        if(room) {
            RoomManager.Instance.syncRooms();
            PlayerManager.Instance.syncPlayers();
            return {
                room: RoomManager.Instance.getRoomView(room),
            };
        } else{
            throw new Error('房间不存在');
        }
    } else {
        throw new Error('玩家未登陆');
    }
});

server.setApi(ApiMsgEnum.ApiRoomJoin, (connection: Connection, { roomId }: IApiRoomJoinReq): IApiRoomJoinRes => {
    if(connection.playerId) {
        const room = RoomManager.Instance.joinRoom(roomId, connection.playerId);
        if(room) {
            RoomManager.Instance.syncRooms();
            RoomManager.Instance.syncRoom(roomId);
            PlayerManager.Instance.syncPlayers();
            return {
                room: RoomManager.Instance.getRoomView(room),
            };
        } else{
            throw new Error('房间不存在');
        }
    } else {
        throw new Error('玩家未登陆');
    }
});

server.setApi(ApiMsgEnum.ApiRoomLeave, (connection: Connection, data: IApiRoomLeaveReq): IApiRoomLeaveRes => {
    if(connection.playerId) {
        const player = PlayerManager.Instance.idMapPlayer.get(connection.playerId);
        if(player) {
            const roomId = player.roomId;
            if(roomId) {
                RoomManager.Instance.leaveRoom(roomId, player.id);
                RoomManager.Instance.syncRooms();
                RoomManager.Instance.syncRoom(roomId);
                PlayerManager.Instance.syncPlayers();
                return {};
            } else{
                throw new Error('玩家不在房间');
            }
        } else{
            throw new Error('玩家不存在');
        }
    } else {
        throw new Error('玩家未登陆');
    }
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