import Singleton from "../Base/Singleton";
import { IApiPlayerJoinReq } from "../Common/Api";
import { Player } from "./Player";
import { Connection } from '../Core/Connection';
import { ApiMsgEnum } from '../Common/Enum';
import { Room } from "./Room";
import { PlayerManager } from "./PlayerManager";

export class RoomManager extends Singleton {
    static get Instance() {
        return super.GetInstance<RoomManager>();
    }

    private __nextRoomId: number = 1;
    //使用Set天然去重
    private __rooms: Set<Room> = new Set();
    get rooms() {
        return this.__rooms;
    }
    private __idMapRoom: Map<number, Room> = new Map();

    public createRoom(): Room {
        const room = new Room(this.__nextRoomId++);
        this.__idMapRoom.set(room.roomId, room);
        this.__rooms.add(room);
        return room;
    }

    public startRoom(roomId: number) {
        const room = this.__idMapRoom.get(roomId);
        if(room) {
            room.start();
        }
    }

    public joinRoom(roomId: number, playerId: number) {
        const room = this.__idMapRoom.get(roomId);
        if(room) {
            room.join(playerId);
            return room;
        }
    }
    public leaveRoom(roomId: number, playerId: number) {
        const room = this.__idMapRoom.get(roomId);
        if(room) {
            room.leave(playerId);
        }
    }

    public closeRoom(roomId: number) {
        const room = this.__idMapRoom.get(roomId);
        if(room) {
            room.close();
            this.__idMapRoom.delete(room.roomId);
            this.__rooms.delete(room);
        }
    }

    public syncRooms() {
        for (const player of PlayerManager.Instance.players) {
            player.connection.sendMessage(ApiMsgEnum.MsgRoomList, {
                list: this.getRoomsView(),
            });
        }
    }

    public syncRoom(roomId: number) {
        const room = this.__idMapRoom.get(roomId);
        if(room) {
            room.sync();
        }
    }

    public getRoomView({ roomId, players }: Room) {
        return {
            roomId,
            players: PlayerManager.Instance.getPlayersView(players),
        };
    }

    public getRoomsView(rooms: Set<Room> = this.__rooms) {
        //扩展运算符可以用于展开对象，数组
        return [...rooms].map(p => this.getRoomView(p));
    }
}