import WebSocket, { WebSocketServer } from "ws";
import { Connection } from "./Connection";
import { ApiMsgEnum } from "../Common/Enum";
import { EventEmitter } from "stream";

export class MyServer extends EventEmitter{
    private __port: number;
    private __wss: WebSocketServer;
    private __connections: Set<Connection> = new Set();
    get connections() {
        return this.__connections;
    }
    private __apiMap: Map<ApiMsgEnum, Function> = new Map();
    get apiMap() {
        return this.__apiMap;
    }

    constructor({port}: {port: number}) {
        super();
        this.__port = port;
    }

    public start() {
        return new Promise((resolve, reject) => {
            this.__wss = new WebSocketServer({
                port: this.__port,
            });

            this.__wss.on('listening', () => {
                resolve(true);
            });
            this.__wss.on('close', () => {
                reject(false);
            });
            this.__wss.on('error', (error: Error) => {
                reject(error)
            });
            this.__wss.on('connection', (ws: WebSocket) => {
                const connection = new Connection(this, ws);
                this.__connections.add(connection);
                this.emit('connection', connection);

                connection.on('close', () => {
                    this.__connections.delete(connection);
                    this.emit('disconnection', connection);
                });
            });
        });
    }

    public setApi(name: ApiMsgEnum, cb: Function) {
        this.__apiMap.set(name, cb);
    }
}