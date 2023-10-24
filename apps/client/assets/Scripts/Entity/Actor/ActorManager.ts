import { _decorator, Component, input } from 'cc';
import DataManager from "../../Global/DataManager";
import { EntityTypeEnum, InputTypeEnum } from '../../Common/Enum';
import { IActor } from '../../Common/State';
import { EntityManager } from '../../Base/EntityManager';
import { ActorStateMachine } from './ActorStateMachine';
import { EntityStateEnum, EventEnum } from '../../Enum';
import { instantiate } from 'cc';
import { WeaponManager } from '../Weapon/WeaponManager';
import { rad2Angle } from '../../Utils';
import { ProgressBar } from 'cc';
import EventManager from '../../Global/EventManager';
import { Tween } from 'cc';
import { Vec3 } from 'cc';
import { tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ActorManager')
export class ActorManager extends EntityManager {
    public bulletType: EntityTypeEnum;
    private __wm: WeaponManager = null;
    private __id: number = 1;
    private __hp: ProgressBar = null;
    private __tw: Tween<unknown> = null;
    private __targetPos: Vec3 = null;

    init(data: IActor) {
        this.bulletType = data.bulletType;
        this.__hp = this.node.getComponentInChildren(ProgressBar);
        this.__id = data.id;
        this.__tw = null;
        this.__targetPos = null;
        this.fsm = this.addComponent(ActorStateMachine);
        this.fsm.init(data.type);

        this.node.active = false;
        this.state = EntityStateEnum.Idle;
        const prefeb = DataManager.Instance.prefabMap.get(EntityTypeEnum.Weapon1);
        const weapon = instantiate(prefeb);
        weapon.setParent(this.node);
        this.__wm = weapon.addComponent(WeaponManager);
        this.__wm.init(data);
    }

    tick(deltaTime: number) {
        if(DataManager.Instance.myPlayerId !== this.__id) {
            return;
        }
        if(DataManager.Instance.jm.output.length()) {
            const {x, y} = DataManager.Instance.jm.output;
            EventManager.Instance.emit(EventEnum.clientSync, {
                id: DataManager.Instance.myPlayerId,
                type: InputTypeEnum.ActorMove,
                direction: {
                    x,
                    y
                },
                deltaTime,
            });

            this.state = EntityStateEnum.Run;
        } else {
            this.state = EntityStateEnum.Idle;
        }
    }

    render(data: IActor) {
        this.renderPos(data);
        this.renderDir(data);
        this.renderHp(data);
    }

    //使用tween动画解决100ms帧同步下帧率低画面卡顿的问题
    private renderPos(data: IActor) {
        const {direction, position} = data;
        const newPos = new Vec3(position.x, position.y);
        if(!this.__targetPos) {
            this.__targetPos = newPos;
            this.node.active = true;
            this.node.setPosition(newPos);
        } 
        //由于renderPos每帧都会调用一次，所以需要判断当前是否在执行缓动动画
        else if(!this.__targetPos.equals(newPos)) {
            this.__tw?.stop();
            this.node.setPosition(this.__targetPos);
            this.__targetPos.set(newPos);
            this.state = EntityStateEnum.Run;
            this.__tw = tween(this.node)
                .to(0.1, {
                    position: this.__targetPos,
                })
                .call(() => {
                    this.state = EntityStateEnum.Idle;
                })
                .start();
        }
        // this.node.setPosition(position.x, position.y);
    }

    private renderDir(data: IActor) {
        const {direction, position} = data;
        if(direction.x !== 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1);
            this.__hp.node.setScale(direction.x > 0 ? 1 : -1, 1);
        }

        const side = Math.sqrt(direction.x ** 2 + direction.y ** 2);
        const rad = Math.asin(direction.y / side);
        const angle = rad2Angle(rad);
        this.__wm.node.angle = angle;
    }

    private renderHp(data: IActor) {
        this.__hp.progress = data.hp / this.__hp.totalLength;
        
    }
}