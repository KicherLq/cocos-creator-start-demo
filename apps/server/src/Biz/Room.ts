import { ApiMsgEnum } from "../Common/Enum";
import { Connection } from "../Core/Connection";
import { Player } from "./Player";
import { PlayerManager } from "./PlayerManager";
import { RoomManager } from "./RoomManager";

export class Room {
    roomId: number;
    players: Set<Player> = new Set();

    constructor(roomId: number) {
        this.roomId = roomId;
    }

    public join(playerId: number) {
        const player = PlayerManager.Instance.idMapPlayer.get(playerId);
        if(player) {
            player.roomId = this.roomId; 
            this.players.add(player);
        }
    }

    public sync() {
        for (const player of this.players) {
            player.connection.sendMessage(ApiMsgEnum.MsgRoom, {
                room: RoomManager.Instance.getRoomView(this),
            })
        }
    }
}