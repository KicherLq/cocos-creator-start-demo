import { EntityTypeEnum, InputTypeEnum } from "./Enum"

export interface IVec2 {
    x: number,
    y: number
}

export interface IActor {
    id: number,
    hp: number,
    position: IVec2,
    direction: IVec2,
    type: EntityTypeEnum,
    weaponType: EntityTypeEnum,
    bulletType: EntityTypeEnum,
}

export interface IBullet {
    id: number,
    owner: number,
    position: IVec2,
    direction: IVec2,
    type: EntityTypeEnum,
}

export interface IState {
    actors: IActor[],
    bullets: IBullet[],
    nextBulletId: number,
    seed: number,
}

export type IClientInput = IActorMove | IShot | ITimePast;

export interface IActorMove {
    id: number,
    type: InputTypeEnum.ActorMove,
    direction: IVec2,
    deltaTime: number,
}

export interface IShot {
    type: InputTypeEnum.Shot,
    owner: number,
    position: IVec2,
    direction: IVec2,
}

export interface ITimePast {
    type: InputTypeEnum.TimePast,
    dt: number,
}