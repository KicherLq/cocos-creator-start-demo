import { _decorator, Component } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { IBullet, IVec2 } from '../../Common/State';
import { EntityTypeEnum, InputTypeEnum } from '../../Common/Enum';
import { EntityStateEnum, EventEnum } from '../../Enum';
import { ExplosionStateMachine } from './ExplosionStateMachine';
const { ccclass, property } = _decorator;

@ccclass('ExplosionManager')
export class ExplosionManager extends EntityManager {
    public type: EntityTypeEnum;

    init(type: EntityTypeEnum, {x, y}: IVec2) {
        this.node.setPosition(x, y);
        this.type = type;
        this.fsm = this.addComponent(ExplosionStateMachine);
        this.fsm.init(type);

        this.state = EntityStateEnum.Idle;
    }
    
}