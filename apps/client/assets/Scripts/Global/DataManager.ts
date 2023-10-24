import { Prefab, instantiate } from 'cc';
import Singleton from "../Base/Singleton";
import { IActorMove, IBullet, IClientInput, IState } from "../Common/State";
import { ActorManager } from "../Entity/Actor/ActorManager";
import { JoyStickManager } from "../UI/JoyStickManager";
import { EntityTypeEnum, InputTypeEnum } from "../Common/Enum";
import { SpriteFrame } from "cc";
import { Node } from "cc";
import { BulletManager } from '../Entity/Bullet/BulletManager';
import EventManager from "./EventManager";
import { EventEnum } from "../Enum";
import { IRoom } from '../Common/Api';
import { toFixed } from '../Common/Utils';
import { randomBySeed } from '../Utils';

const ACTOR_SPEED = 100;
const BULLET_SPEED = 600;
const MAP_WIDTH = 960;
const MAP_HEIGHT = 640;
const ACTOR_RADIUS = 50;
const BULLET_RADIUS = 10;
const BULLET_DAMAGE = 5;

export default class DataManager extends Singleton {
	static get Instance() {
		return super.GetInstance<DataManager>();
	}

    myPlayerId: number = 1;
    frameId: number = 1;
    jm: JoyStickManager;
    stage: Node;
    roomInfo: IRoom;
    lastState: IState;

    actorMap: Map<number, ActorManager> = new Map();
    bulletMap: Map<number, BulletManager> = new Map();
    prefabMap: Map<string, Prefab> = new Map();
    textureMap: Map<string, SpriteFrame[]> = new Map();

    state: IState = {
        actors:[
            // { 
            //     id: 1, 
            //     type: EntityTypeEnum.Actor1,
            //     hp: 100,
            //     weaponType: EntityTypeEnum.Weapon1,
            //     bulletType: EntityTypeEnum.Bullet2,
            //     position: {
            //         x: -150, 
            //         y: -150
            //     }, 
            //     direction: {
            //         x: 1, 
            //         y: 0
            //     },
            // },
            // { 
            //     id: 2, 
            //     type: EntityTypeEnum.Actor1,
            //     hp: 100,
            //     weaponType: EntityTypeEnum.Weapon1,
            //     bulletType: EntityTypeEnum.Bullet2,
            //     position: {
            //         x: 150, 
            //         y: 150
            //     }, 
            //     direction: {
            //         x: -1, 
            //         y: 0
            //     },
            // },
        ],
        bullets: [

        ],
        nextBulletId: 1,
        seed: 1,
    }

    applyInput(input: IClientInput) {
        switch (input.type) {
            case InputTypeEnum.ActorMove: {
                const { deltaTime, direction, type, id } = input;
                const actor = this.state.actors.find(e => e.id === id);
                actor.direction = direction;

                actor.position.x += toFixed(direction.x * deltaTime * ACTOR_SPEED);
                actor.position.y += toFixed(direction.y * deltaTime * ACTOR_SPEED);
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

                EventManager.Instance.emit(EventEnum.bulletBorn, owner);
                this.state.bullets.push(bullet);
                break;
            }
            case InputTypeEnum.TimePast: {
                const {dt} = input;
                const {bullets, actors} = this.state;
                
                //倒序遍历子弹用于销毁已经飞出地图外的子弹
                for(let i = bullets.length - 1; i >= 0; --i) {
                    const bullet = bullets[i];
                    //倒序遍历角色用于判断和子弹的碰撞检测
                    for(let j = actors.length - 1; j >= 0; --j) {
                        const actor = actors[j];
                        //帧同步不能使用引擎内部的碰撞检测系统
                        let distanceX: number = actor.position.x - bullet.position.x;
                        let distanceY: number = actor.position.y - bullet.position.y;
                        let explosionX: number = toFixed((actor.position.x + bullet.position.x) / 2);
                        let explosionY: number = toFixed((actor.position.y + bullet.position.y) / 2);
                        if(distanceX ** 2 + distanceY ** 2 < (ACTOR_RADIUS + BULLET_RADIUS) ** 2) {
                            const random = randomBySeed(this.state.seed);
                            this.state.seed = random;
                            const damage = random / 233280 >= 0.5 ? BULLET_DAMAGE * 2 : BULLET_DAMAGE;
                            actor.hp -= damage;
                            EventManager.Instance.emit(EventEnum.explosionBorn, bullet.id, {x: explosionX, y: explosionY});
                            bullets.splice(i, 1);
                            break;
                        }
                    }
                    if(Math.abs(bullet.position.x) > MAP_WIDTH / 2 || Math.abs(bullet.position.y) > MAP_HEIGHT / 2) {
                        EventManager.Instance.emit(EventEnum.explosionBorn, bullet.id, {x: bullet.position.x, y: bullet.position.y});
                        bullets.splice(i, 1);
                        break;
                    }
                }

                for (const bullet of bullets) {
                    bullet.position.x += toFixed(bullet.direction.x * dt * BULLET_SPEED);
                    bullet.position.y += toFixed(bullet.direction.y * dt * BULLET_SPEED);
                }
                break;
            }
        }

    }
}
