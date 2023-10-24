import { _decorator } from "cc";
import Singleton from "../Base/Singleton";
import { strdecode, strencode } from "../Common/Utils";
import { IModel } from "../Common/Model";

interface IItem {
    cb: Function;
    ctx: unknown;
}

interface ICallApiRet<T> {
    success: boolean,
    error?: Error,
    res?: T,
}

export class NetWorkManager extends Singleton {
    static get Instance() {
        return super.GetInstance<NetWorkManager>();
    }

    public isConnected: boolean = false;

    private PORT = 9876;
    private __ws: WebSocket = null;
    private map: Map<string, Array<IItem>> = new Map();

    connect() {
        return new Promise((resolve, reject) => {
            if(this.isConnected) {
                resolve(true);
                return;
            }
            this.__ws = new WebSocket(`ws://localhost:${this.PORT}`);
            this.__ws.binaryType = 'arraybuffer';
            this.__ws.onopen = () => {
                this.isConnected = true;
                resolve(true);
            };
            this.__ws.onclose = () => {
                this.isConnected = false;
                reject(false);
            };
            this.__ws.onerror = (error) => {
                this.isConnected = false;
                console.error(error);
                reject(false);
            };
            this.__ws.onmessage = (message) => {
                try {
                    const ta = new Uint8Array(message.data);
                    const str = strdecode(ta);
                    const json = JSON.parse(str);
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
    callApi<T extends keyof IModel['api']>(name: T, data: IModel['api'][T]['req']): Promise<ICallApiRet<IModel['api'][T]['res']>> {
        return new Promise((resolve, reject) => {
            try {
                //设置定时器用于判断超时的情况
                const timer = setTimeout(() => {
                    resolve({ success: false, error: new Error('Time out!') });
                    this.unListenMessage(name as any, cb, null);
                }, 5000);
                const cb = (res) => {
                    resolve(res);
                    //如果未超时则清空定时器
                    clearTimeout(timer);
                    this.unListenMessage(name as any, cb, null);
                }
                this.listenMessage(name as any, cb, null);
                this.sendMessage(name as any, data);
            } catch (error) {
                resolve({ success: false, error: new Error('Time out!') });
            }
        });
    }

    async sendMessage<T extends keyof IModel['msg']>(name: T, data: IModel['msg'][T]) {
        const msg = {
            name,
            data,
        }
        //手动增加客户端延时
        // await new Promise(rs => setTimeout(rs, 2000));

        /**
         * 把字符串转成二进制数组步骤
         * 1.使用字符编码（会返回TypeArray），得到这个字符串编码成二进制后的数组长度
         * 2.通过该长度，初始化ArrayBuffer，再通过DataView写入数组
         * 3.WebSocket使用ArrayBuffer
         */
        const str = JSON.stringify(msg);
        const ta = strencode(str);
        const ab = new ArrayBuffer(ta.length);
        const da = new DataView(ab);
        for (let index = 0; index < ta.length; index++) {
            da.setUint8(index, ta[index]);
        }
        this.__ws.send(da.buffer);
    }

    listenMessage<T extends keyof IModel['msg']>(name: T, cb: (args: IModel['msg'][T]) => void, ctx: unknown) {
        if (this.map.has(name)) {
            this.map.get(name).push({ cb, ctx });
        } else {
            this.map.set(name, [{ cb, ctx }]);
        }
    }

    unListenMessage<T extends keyof IModel['msg']>(name: T, cb: (args: IModel['msg'][T]) => void, ctx: unknown) {
        if (this.map.has(name)) {
            const index = this.map.get(name).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(name).splice(index, 1);
        }
    }
}
