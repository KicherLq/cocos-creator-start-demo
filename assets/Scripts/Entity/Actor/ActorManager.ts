import { _decorator, Component, input } from 'cc';
import DataManager from "../../Global/DataManager";
import { InputTypeEnum } from '../../Common/Enum';
import { IActor } from '../../Common/State';
const { ccclass, property } = _decorator;

@ccclass('ActorManager')
export class ActorManager extends Component {
    init(data: IActor) {

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

            //console.log(DataManager.Instance.state.actors[0].position.x, DataManager.Instance.state.actors[0].position.y);
        }
    }

    render(data: IActor) {
        const {direction, position} = data;
        this.node.setPosition(position.x, position.y);
        if(direction.x !== 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1);
        }
    }
}