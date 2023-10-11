import { _decorator, Component, input } from 'cc';
import DataManager from "../../Global/DataManager";
import { EntityTypeEnum, InputTypeEnum } from '../../Common/Enum';
import { IActor } from '../../Common/State';
import { EntityManager } from '../../Base/EntityManager';
import { EntityStateEnum, EventEnum } from '../../Enum';
import { instantiate } from 'cc';
import { WeaponStateMachine } from './WeaponStateMachine';
import { Node } from 'cc';
import EventManager from '../../Global/EventManager';
import { UITransform } from 'cc';
import { Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WeaponManager')
export class WeaponManager extends EntityManager {
    private __body: Node = null;
    private __anchor: Node = null;
    private __point: Node = null;
    private __owner: number = 0;

    init(data: IActor) {
        this.__owner = data.id;
        this.__body = this.node.getChildByName('Body');
        this.__anchor = this.__body.getChildByName('Anchor');
        this.__point = this.__anchor.getChildByName('Point');
        
        this.fsm = this.__body.addComponent(WeaponStateMachine);
        this.fsm.init(data.weaponType);

        this.state = EntityStateEnum.Idle;
        EventManager.Instance.on(EventEnum.shot, this.handleWeaponShot, this);
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventEnum.shot, this.handleWeaponShot, this);
    }

    handleWeaponShot() {
        const pointWorldPos = this.__point.getWorldPosition();
        const pointStagePos = DataManager.Instance.stage.getComponent(UITransform).convertToNodeSpaceAR(pointWorldPos);
        const anchorWorldPos = this.__anchor.getWorldPosition();
        const direction = new Vec2(pointWorldPos.x - anchorWorldPos.x, pointWorldPos.y - anchorWorldPos.y).normalize();

        DataManager.Instance.applyInput({
            type: InputTypeEnum.Shot,
            owner: this.__owner,
            position: {
                x: pointStagePos.x, 
                y: pointStagePos.y
            },
            direction: {
                x: direction.x,
                y: direction.y
            },
        });

        console.log(DataManager.Instance.state.bullets);
    }
    
}