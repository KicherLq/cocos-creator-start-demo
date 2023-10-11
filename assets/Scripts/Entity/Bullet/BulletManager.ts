import { _decorator, Component } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { IBullet } from '../../Common/State';
import { EntityTypeEnum, InputTypeEnum } from '../../Common/Enum';
import { BulletStateMachine } from './BulletStateMachine';
import { EntityStateEnum } from '../../Enum';
import DataManager from '../../Global/DataManager';
import { rad2Angle } from '../../Utils';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends EntityManager {
    public type: EntityTypeEnum;

    init(data: IBullet) {
        this.type = data.type;
        this.fsm = this.addComponent(BulletStateMachine);
        this.fsm.init(data.type);

        this.state = EntityStateEnum.Idle;
    }

    render(data: IBullet) {
        const {direction, position} = data;
        this.node.setPosition(position.x, position.y);
        
        const side = Math.sqrt(direction.x ** 2 + direction.y ** 2);
        const angle = rad2Angle(Math.asin(direction.y / side));
        const rightAngle = rad2Angle(Math.asin(-direction.y / side)) + 180;
        this.node.angle = direction.x > 0 ? angle : rightAngle;
    }
    
}