import { _decorator, Component } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { IBullet, IVec2 } from '../../Common/State';
import { EntityTypeEnum, InputTypeEnum } from '../../Common/Enum';
import { BulletStateMachine } from './BulletStateMachine';
import { EntityStateEnum, EventEnum } from '../../Enum';
import DataManager from '../../Global/DataManager';
import { rad2Angle } from '../../Utils';
import EventManager from '../../Global/EventManager';
import { instantiate } from 'cc';
import { ExplosionManager } from '../Explosion/ExplosionManager';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends EntityManager {
    public type: EntityTypeEnum;
    private __id: number;

    init(data: IBullet) {
        this.type = data.type;
        this.__id = data.id;
        this.fsm = this.addComponent(BulletStateMachine);
        this.fsm.init(data.type);

        this.state = EntityStateEnum.Idle;
        this.node.active = false;

        EventManager.Instance.on(EventEnum.explosionBorn, this.handleExplosionBorn, this);
    }

    handleExplosionBorn(id: number, {x, y}: IVec2) {
        if(id !== this.__id) {
            return;
        }

        //处理子弹爆炸特效相关逻辑
        const prefab = DataManager.Instance.prefabMap.get(EntityTypeEnum.Explosion);
        const explosion = instantiate(prefab);
        explosion.setParent(DataManager.Instance.stage);
        const em = explosion.addComponent(ExplosionManager);
        em.init(EntityTypeEnum.Explosion, {x, y});

        //处理子弹销毁的相关逻辑
        EventManager.Instance.off(EventEnum.explosionBorn, this.handleExplosionBorn, this);
        DataManager.Instance.bulletMap.delete(this.__id);
        this.node.destroy();
    }

    render(data: IBullet) {
        this.node.active = true;
        const {direction, position} = data;
        this.node.setPosition(position.x, position.y);
        
        const side = Math.sqrt(direction.x ** 2 + direction.y ** 2);
        const angle = rad2Angle(Math.asin(direction.y / side));
        const rightAngle = rad2Angle(Math.asin(-direction.y / side)) + 180;
        this.node.angle = direction.x > 0 ? angle : rightAngle;
    }
    
}