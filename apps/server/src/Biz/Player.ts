import { Connection } from "../Core/Connection";

export class Player {
    id: number;
    nickname: string;
    connection: Connection;
    roomId: number;

    constructor({ id, nickname, connection }: Pick<Player, 'id' | 'connection' | 'nickname'>) {
        this.id = id;
        this.nickname = nickname;
        this.connection = connection;
    }
}