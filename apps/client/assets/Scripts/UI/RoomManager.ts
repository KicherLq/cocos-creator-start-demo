import { _decorator, Component, Node } from 'cc';
import { IPlayer, IRoom } from '../Common/Api';
import { Label } from 'cc';
import EventManager from '../Global/EventManager';
import { EventEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('RoomManager')
export class RoomManager extends Component {
    private __roomId: number;

    init({ roomId }: IRoom) {
        this.__roomId = roomId;
        const label = this.getComponent(Label);
        label.string = `房间${roomId}`;
        this.node.active = true;
    }

    handleClick() {
        EventManager.Instance.emit(EventEnum.roomJoin, this.__roomId);
    }
}


