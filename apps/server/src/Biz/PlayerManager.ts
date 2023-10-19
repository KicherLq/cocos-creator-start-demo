import Singleton from "../Base/Singleton";
import { IApiPlayerJoinReq } from "../Common/Api";
import { Player } from "./Player";
import { Connection } from '../Core/Connection';

export class PlayerManager extends Singleton {
    static get Instance() {
        return super.GetInstance<PlayerManager>();
    }

    private __nextPlayerId: number = 1;
    //使用Set天然去重
    private __players: Set<Player> = new Set();
    get players() {
        return this.__players;
    }
    private __idMapPlayer: Map<number, Player> = new Map();

    public createPlayer({nickname, connection}: IApiPlayerJoinReq & {connection: Connection}): Player {
        const player = new Player({ id: this.__nextPlayerId++, nickname, connection });
        this.__idMapPlayer.set(player.id, player);
        this.__players.add(player);
        return player;
    }

    public removePlayer(playerId: number) {
        const player = this.__idMapPlayer.get(playerId);
        if(player) {
            this.__idMapPlayer.delete(player.id);
            this.__players.delete(player);
        }
    }

    public getPlayerView(player: Player) {
        const {id, nickname, roomId} = player;
        return {
            id, 
            nickname,
            roomId,
        };
    }

    public getPlayersView(players: Set<Player> = this.__players) {
        //扩展运算符可以用于展开对象，数组
        return [...players].map(p => this.getPlayerView(p));
    }
}