import { _decorator, Node } from "cc";
import Singleton from "../Base/Singleton";
import { EntityTypeEnum } from "../Common/Enum";
import DataManager from "./DataManager";
import { instantiate } from "cc";

export class ObjectPoolManager extends Singleton {
    static get Instance() {
        return super.GetInstance<ObjectPoolManager>();
    }

    private objectPool: Node = null;
    private map: Map<EntityTypeEnum, Node[]> = new Map();

    public get(type: EntityTypeEnum) {
        if(!this.objectPool) {
            this.objectPool = new Node('objectPool');
            this.objectPool.setParent(DataManager.Instance.stage);
        }

        if(!this.map.has(type)) {
            this.map.set(type, []);
            const container = new Node(type + 'Pool');
            container.setParent(this.objectPool);
        }

        const nodes = this.map.get(type);
        if(!nodes.length) {
            const prefab = DataManager.Instance.prefabMap.get(type);
            const entity = instantiate(prefab);
            entity.name = type;
            entity.setParent(this.objectPool.getChildByName(type + 'Pool'));
            entity.active = false;
            return entity;
        } else {
            const entity = nodes.pop();
            entity.active = true;
            return entity;
        }
    }
    
    public ret(node: Node) {
        node.active = false;
        this.map.get(node.name as EntityTypeEnum).push(node);
    }
}
