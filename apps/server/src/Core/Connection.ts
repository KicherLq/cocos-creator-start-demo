import { EventEmitter } from "stream";
import { MyServer } from "./MyServer";
import { WebSocket } from "ws";
import { IModel } from "../Common/Model";

interface IItem {
    cb: Function;
    ctx: unknown;
}

export class Connection extends EventEmitter {
    private msgMap: Map<string, Array<IItem>> = new Map();

    constructor(private server: MyServer, private __ws: WebSocket) {
        super();
        this.__ws.on('close', () => {
            this.emit('close');
        });

        this.__ws.on('message', (buffer: Buffer) => {
            const str = buffer.toString();
            try {
                const msg = JSON.parse(str);
                const {name, data} = msg;

                if (this.server.apiMap.has(name)) {
                    try {
                        const cb = this.server.apiMap.get(name);
                        const res = cb.call(null, this, data);
                        this.sendMessage(name, {
                            success: true,
                            res,
                        });
                    } catch (error) {
                        this.sendMessage(name, {
                            success: false,
                            error: error.message,
                        });
                    }

                } else{
                    if(this.msgMap.has(name)) {
                        this.msgMap.get(name).forEach(({cb, ctx}) => {
                            cb.call(ctx, this, data);
                        });
                    }
                }
            } catch (error) {
                console.error(error);
            }
        })
    }

    sendMessage<T extends keyof IModel['msg']>(name: T, data: IModel['msg'][T]) {
        const msg = {
            name,
            data,
        }
        this.__ws.send(JSON.stringify(msg));
    }

    listenMessage<T extends keyof IModel['msg']>(name: T, cb: (connection: Connection, args: IModel['msg'][T]) => void, ctx: unknown) {
        if (this.msgMap.has(name)) {
            this.msgMap.get(name).push({ cb, ctx });
        } else {
            this.msgMap.set(name, [{ cb, ctx }]);
        }
    }

    unListenMessage<T extends keyof IModel['msg']>(name: T, cb: (connection: Connection, args: IModel['msg'][T]) => void, ctx: unknown) {
        if (this.msgMap.has(name)) {
            const index = this.msgMap.get(name).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.msgMap.get(name).splice(index, 1);
        }
    }
}