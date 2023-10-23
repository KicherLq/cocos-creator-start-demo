import { ApiMsgEnum, EntityTypeEnum } from "../Common/Enum";
import { IState } from "../Common/State";
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

    public start() {
        const state: IState = {
            actors: [...this.players].map((player, index) => ({
                id: player.id,
                nickname: player.nickname,
                type: EntityTypeEnum.Actor1,
                hp: 100,
                weaponType: EntityTypeEnum.Weapon1,
                bulletType: EntityTypeEnum.Bullet2,
                position: {
                    x: -150 + 300 * index,
                    y: -150 + 300 * index,
                },
                direction: {
                    x: 1,
                    y: 0
                },
            })),
            bullets: [

            ],
            nextBulletId: 1,
        }

        for (const player of this.players) {
            player.connection.sendMessage(ApiMsgEnum.MsgGameStart, {
                state,
            })
        }
    }

    public join(playerId: number) {
        const player = PlayerManager.Instance.idMapPlayer.get(playerId);
        if(player) {
            player.roomId = this.roomId; 
            this.players.add(player);
        }
    }

    public leave(playerId: number) {
        const player = PlayerManager.Instance.idMapPlayer.get(playerId);
        if(player) {
            player.roomId = null;
            this.players.delete(player);
            if(!this.players.size) {
                RoomManager.Instance.closeRoom(this.roomId);
            }
        }
    }

    public close() {
        this.players.clear();
    }

    public sync() {
        for (const player of this.players) {
            player.connection.sendMessage(ApiMsgEnum.MsgRoom, {
                room: RoomManager.Instance.getRoomView(this),
            })
        }
    }
}