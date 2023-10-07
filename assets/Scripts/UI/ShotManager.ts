import { _decorator, Component, Node } from 'cc';
import EventManager from '../Global/EventManager';
import { EventEnum } from '../Enum';
import { CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShotManager')
export class ShotManager extends Component {
    @property({displayName: '发射子弹间隔', type: CCFloat})
    shotInterval: number = 0.5;

    protected onLoad(): void {
        this.schedule(this.shot, this.shotInterval);
    }

    shot() {
        EventManager.Instance.emit(EventEnum.shot);
    }

}


