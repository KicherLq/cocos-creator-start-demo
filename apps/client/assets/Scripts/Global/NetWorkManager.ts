import { _decorator } from "cc";
import Singleton from "../Base/Singleton";

interface IItem {
    cb: Function;
    ctx: unknown;
}

export class NetWorkManager extends Singleton {
    static get Instance() {
        return super.GetInstance<NetWorkManager>();
    }

    private PORT = 9876;
    private __ws: WebSocket = null;
    private map: Map<string, Array<IItem>> = new Map();

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
                try {
                    console.log(message.data);
                    const json = JSON.parse(message.data);
                    const {name, data} = json;
                    if (this.map.has(name)) {
                        this.map.get(name).forEach(({ cb, ctx }) => {
                            cb.call(ctx, data);
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            };
        });
    }

    sendMessage(name: string, data: any) {
        const msg = {
            name,
            data,
        }
        this.__ws.send(JSON.stringify(msg));
    }

    listenMessage(name: string, cb: Function, ctx: unknown) {
        if (this.map.has(name)) {
            this.map.get(name).push({ cb, ctx });
        } else {
            this.map.set(name, [{ cb, ctx }]);
        }
    }

    unListenMessage(name: string, cb: Function, ctx: unknown) {
        if (this.map.has(name)) {
            const index = this.map.get(name).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(name).splice(index, 1);
        }
    }
}
