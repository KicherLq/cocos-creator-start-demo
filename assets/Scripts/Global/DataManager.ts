import { Prefab } from "cc";
import Singleton from "../Base/Singleton";
import { IActorMove, IBullet, IClientInput, IState } from "../Common/State";
import { ActorManager } from "../Entity/Actor/ActorManager";
import { JoyStickManager } from "../UI/JoyStickManager";
import { EntityTypeEnum, InputTypeEnum } from "../Common/Enum";
import { SpriteFrame } from "cc";
import { Node } from "cc";
import { BulletManager } from '../Entity/Bullet/BulletManager';

const ACTOR_SPEED = 100;
const BULLET_SPEED = 600;

export default class DataManager extends Singleton {
	static get Instance() {
		return super.GetInstance<DataManager>();
	}

    jm: JoyStickManager;
    stage: Node;
    actorMap: Map<number, ActorManager> = new Map();
    bulletMap: Map<number, BulletManager> = new Map();
    prefabMap: Map<string, Prefab> = new Map();
    textureMap: Map<string, SpriteFrame[]> = new Map();

    state: IState = {
        actors:[
            { 
                id: 1, 
                type: EntityTypeEnum.Actor1,
                weaponType: EntityTypeEnum.Weapon1,
                bulletType: EntityTypeEnum.Bullet2,
                position: {
                    x: 0, 
                    y: 0
                }, 
                direction: {
                    x: 1, 
                    y: 0
                },
            },
        ],
        bullets: [

        ],
        nextBulletId: 1,
    }

    applyInput(input: IClientInput) {
        switch (input.type) {
            case InputTypeEnum.ActorMove: {
                const { deltaTime, direction, type, id } = input;
                const actor = this.state.actors.find(e => e.id === id);
                actor.direction = direction;

                actor.position.x += direction.x * deltaTime * ACTOR_SPEED;
                actor.position.y += direction.y * deltaTime * ACTOR_SPEED;
                break;
            }
            case InputTypeEnum.Shot: {
                const { owner, direction, position } = input;
                const bullet: IBullet = {
                    id: this.state.nextBulletId++,
                    owner, 
                    direction,
                    position,
                    type: this.actorMap.get(owner).bulletType,
                }
                this.state.bullets.push(bullet);
                break;
            }
            case InputTypeEnum.TimePast: {
                const {dt} = input;
                const {bullets} = this.state;
                for (const bullet of bullets) {
                    bullet.position.x += bullet.direction.x * dt * BULLET_SPEED;
                    bullet.position.y += bullet.direction.y * dt * BULLET_SPEED;
                }
                break;
            }
        }

    }
}
