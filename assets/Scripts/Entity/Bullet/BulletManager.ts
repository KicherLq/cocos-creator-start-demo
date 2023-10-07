import { _decorator, Component } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { IBullet } from '../../Common/State';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends EntityManager {

    init(data: IBullet) {

    }
    
}