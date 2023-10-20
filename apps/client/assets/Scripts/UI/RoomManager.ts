import { _decorator, Component, Node } from 'cc';
import { IPlayer, IRoom } from '../Common/Api';
import { Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoomManager')
export class RoomManager extends Component {
    init({ roomId }: IRoom) {
        const label = this.getComponent(Label);
        label.string = `房间${roomId}`;
        this.node.active = true;
    }
}


