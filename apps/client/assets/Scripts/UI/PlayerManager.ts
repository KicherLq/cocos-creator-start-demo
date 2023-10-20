import { _decorator, Component, Node } from 'cc';
import { IPlayer } from '../Common/Api';
import { Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {
    init({id, nickname, roomId}: IPlayer) {
        const label = this.getComponent(Label);
        label.string = nickname;
        this.node.active = true;
    }
}


