import { ApiMsgEnum, EntityTypeEnum, InputTypeEnum } from "../Common/Enum";
import { IMsgClientSync } from "../Common/Msg";
import { IClientInput, IState } from "../Common/State";
import { Connection } from "../Core/Connection";
import { Player } from "./Player";
import { PlayerManager } from "./PlayerManager";
import { RoomManager } from "./RoomManager";

export class Room {
    roomId: number;
    lastTime: number;
    pendingInput: IClientInput[] = [];
    players: Set<Player> = new Set();
    lastFrameIdMap: Map<number, number> = new Map();

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

            player.connection.listenMessage(ApiMsgEnum.MsgClientSync, this.getClientMsg, this);
        }

        const timer1 = setInterval(() => {
            this.sendServerMsg();
        }, 100);

        const timer2 = setInterval(() => {
            this.timePast();
        }, 16);
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

    private getClientMsg(connection: Connection, data: IMsgClientSync) {
        const { input, frameId } = data;
        this.pendingInput.push(input);
        this.lastFrameIdMap.set(connection.playerId, frameId);
    }

    private sendServerMsg() {
        const inputs = this.pendingInput;
        this.pendingInput = [];
        for (const player of this.players) {
            player.connection.sendMessage(ApiMsgEnum.MsgServerSync, {
                lastFrameId: this.lastFrameIdMap.get(player.id) ?? 0,
                inputs,
            })
        }
    }

    private timePast() {
        const now = process.uptime();
        const dt = now - (this.lastTime ?? now);
        this.pendingInput.push({ type: InputTypeEnum.TimePast, dt });
        this.lastTime = now;
    }
}