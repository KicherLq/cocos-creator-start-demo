import { Node } from "cc";
import { _decorator, Component } from "cc";
import DataManager from "../Global/DataManager";
import { JoyStickManager } from "../UI/JoyStickManager";
import { ActorManager } from "../Entity/Actor/ActorManager";
import { ResourceManager } from "../Global/ResourceManager";
import { Prefab } from "cc";
import { instantiate } from "cc";
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    private _stage: Node;
    private _ui: Node;
    
    onLoad() {
        this._stage = this.node.getChildByName('Stage');
        this._ui    = this.node.getChildByName('UI');
        DataManager.Instance.jm = this._ui.getComponentInChildren(JoyStickManager);
    }
    
    start() {
        this.loadRes();
    }

    async loadRes() {
        const list = [];
        //TODO 深入学习promise的使用
        const p = ResourceManager.Instance.loadRes('prefab/Actor', Prefab).then(prefab => {
            DataManager.Instance.prefabMap.set('Actor', prefab);
        })
        list.push(p);
        await Promise.all(list);
    }
    update() {
        this.render();
    }

    render() {
        this.renderActor();
    }

    async renderActor() {
        for(const data of DataManager.Instance.state.actors) {
            let am: ActorManager = DataManager.Instance.actorMap.get(data.id);
            if(!am) {
                const prefab = await ResourceManager.Instance.loadRes('prefab/Actor', Prefab);
                const actor  = instantiate(prefab);
                actor.setParent(this._stage);
                let am: ActorManager = actor.addComponent(ActorManager);
                DataManager.Instance.actorMap.set(data.id, am);
                am.init(data);
            } else {
                am.render(data);
            }
        }
    }
}