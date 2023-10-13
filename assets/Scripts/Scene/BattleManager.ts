import { Node } from "cc";
import { _decorator, Component } from "cc";
import DataManager from "../Global/DataManager";
import { JoyStickManager } from "../UI/JoyStickManager";
import { ActorManager } from "../Entity/Actor/ActorManager";
import { ResourceManager } from "../Global/ResourceManager";
import { Prefab } from "cc";
import { instantiate } from "cc";
import { PrefabPathEnum, TexturePathEnum } from "../Enum";
import { EntityTypeEnum, InputTypeEnum } from "../Common/Enum";
import { SpriteFrame } from "cc";
import { BulletManager } from "../Entity/Bullet/BulletManager";
import { ObjectPoolManager } from "../Global/ObjectPoolManager";
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    private _stage: Node;
    private _ui: Node;
    private shouldUpdate: boolean = false;

    onLoad() {
        this._stage = this.node.getChildByName('Stage');
        this._ui    = this.node.getChildByName('UI');
        this._stage.destroyAllChildren();
        DataManager.Instance.jm = this._ui.getComponentInChildren(JoyStickManager);
        DataManager.Instance.stage = this.node.getChildByName('Stage');
    }
    
    async start() {
        await this.loadRes();
        this.initMap();
        this.shouldUpdate = true;
    }

    initMap() {
        const prefab = DataManager.Instance.prefabMap.get(EntityTypeEnum.Map);
        const map = instantiate(prefab);
        map.setParent(this._stage);
    }

    async loadRes() {
        const list = [];
        for (const type in PrefabPathEnum) {
            const p = ResourceManager.Instance.loadRes(PrefabPathEnum[type], Prefab).then(prefab => {
                DataManager.Instance.prefabMap.set(type, prefab);
            });
            list.push(p);
        }

        for (const type in TexturePathEnum) {
            const p = ResourceManager.Instance.loadDir(TexturePathEnum[type], SpriteFrame).then(spriteframes => {
                DataManager.Instance.textureMap.set(type, spriteframes);
            });
            list.push(p);
        }
        
        const p = await Promise.all(list);
    }
    
    update(dt: number) {
        if(!this.shouldUpdate) {
            return;
        }
        this.render();
        this.tick(dt);
    }

    tick(dt: number) {
        this.tickActor(dt);

        DataManager.Instance.applyInput({
            type: InputTypeEnum.TimePast,
            dt
        });
    }
    tickActor(dt: number) {
        for (const data of DataManager.Instance.state.actors) {
            const {id} = data;
            let am: ActorManager = DataManager.Instance.actorMap.get(id);
            am.tick(dt);
        }
    }

    render() {
        this.renderActor();
        this.renderBullet();
    }

    renderActor() {
        for(const data of DataManager.Instance.state.actors) {
            const {id, type} = data;
            let am: ActorManager = DataManager.Instance.actorMap.get(id);
            if(!am) {
                const prefab = DataManager.Instance.prefabMap.get(type);
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

    renderBullet() {
        for(const data of DataManager.Instance.state.bullets) {
            const {id, type} = data;
            let bm = DataManager.Instance.bulletMap.get(id);
            if(!bm) {
                const bullet = ObjectPoolManager.Instance.get(type);
                bm = bullet.getComponent(BulletManager) || bullet.addComponent(BulletManager);
                DataManager.Instance.bulletMap.set(data.id, bm);
                bm.init(data);
            } else {
                bm.render(data);
            }
        }
    }
}