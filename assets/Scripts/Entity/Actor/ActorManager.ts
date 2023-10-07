import { _decorator, Component, input } from 'cc';
import DataManager from "../../Global/DataManager";
import { EntityTypeEnum, InputTypeEnum } from '../../Common/Enum';
import { IActor } from '../../Common/State';
import { EntityManager } from '../../Base/EntityManager';
import { ActorStateMachine } from './ActorStateMachine';
import { EntityStateEnum } from '../../Enum';
import { instantiate } from 'cc';
import { WeaponManager } from '../Weapon/WeaponManager';
import { rad2Angle } from '../../Utils';
const { ccclass, property } = _decorator;

@ccclass('ActorManager')
export class ActorManager extends EntityManager {
    public bulletType: EntityTypeEnum;
    private __wm: WeaponManager = null;

    init(data: IActor) {
        this.bulletType = data.bulletType;
        this.fsm = this.addComponent(ActorStateMachine);
        this.fsm.init(data.type);

        this.state = EntityStateEnum.Idle;
        const prefeb = DataManager.Instance.prefabMap.get(EntityTypeEnum.Weapon1);
        const weapon = instantiate(prefeb);
        weapon.setParent(this.node);
        this.__wm = weapon.addComponent(WeaponManager);
        this.__wm.init(data);
    }

    tick(deltaTime: number) {
        if(DataManager.Instance.jm.output.length()) {
            const {x, y} = DataManager.Instance.jm.output;
            DataManager.Instance.applyInput({
                id: 1,
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
        const {direction, position} = data;
        this.node.setPosition(position.x, position.y);
        if(direction.x !== 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1);
        }

        const side = Math.sqrt(direction.x ** 2 + direction.y ** 2);
        const rad = Math.asin(direction.y / side);
        const angle = rad2Angle(rad);
        this.__wm.node.angle = angle;
    }
}