import WebSocket, { WebSocketServer } from "ws";
import { Connection } from "./Connection";

export class MyServer {
    private __port: number;
    private __wss: WebSocketServer;
    private __connections: Set<Connection> = new Set();

    constructor({port}: {port: number}) {
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
                console.log('connection comes', this.__connections.size);

                connection.on('close', () => {
                    this.__connections.delete(connection);
                    console.log('connection close', this.__connections.size);
                });
            });
        });
    }
}