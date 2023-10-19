import { _decorator } from "cc";
import Singleton from "../Base/Singleton";

interface IItem {
    cb: Function;
    ctx: unknown;
}

interface ICallApiRet {
    success: boolean,
    error?: Error,
    res?: any,
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

    //WebSocket模拟HTTP服务
    callApi(name: string, data: any): Promise<ICallApiRet> {
        return new Promise((resolve, reject) => {
            try {
                //设置定时器用于判断超时的情况
                const timer = setTimeout(() => {
                    resolve({ success: false, error: new Error('Time out!') });
                    this.unListenMessage(name, cb, null);
                }, 5000);
                const cb = (res) => {
                    resolve(res);
                    //如果未超时则清空定时器
                    clearTimeout(timer);
                    this.unListenMessage(name, cb, null);
                }
                this.listenMessage(name, cb, null);
                this.sendMessage(name, data);
            } catch (error) {
                resolve({ success: false, error: new Error('Time out!') });
            }
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
