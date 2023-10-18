import { _decorator } from "cc";
import Singleton from "../Base/Singleton";

export class NetWorkManager extends Singleton {
    static get Instance() {
        return super.GetInstance<NetWorkManager>();
    }

    private PORT = 8080;
    private __ws: WebSocket = null;

    connect() {
        return new Promise((resolve, reject) => {
            this.__ws = new WebSocket(`ws://localhost:${this.PORT}`);
            this.__ws.onopen = () => {
                resolve(true);
            };
            this.__ws.onclose = () => {
                reject(false);
            };
            this.__ws.onerror = (error) => {
                console.error(error);
                reject(false);
            };
            this.__ws.onmessage = (message: MessageEvent) => {
                console.log(message.data);
            };
        });
    }

    sendMessage(data: string) {
        this.__ws.send(data);
    }
}
