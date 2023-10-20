import { Connection } from "../Core/Connection";
import { Player } from "./Player";
import { PlayerManager } from "./PlayerManager";

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
}