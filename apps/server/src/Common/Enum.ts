export enum InputTypeEnum {
    ActorMove = 'actormove',
    Shot = 'shot',
    TimePast = 'TimePast',
}

export enum EntityTypeEnum {
    Actor1 = 'Actor1',
    Map    = 'Map',
    Weapon1 = 'Weapon1',
    Bullet1 = 'Bullet1',
    Bullet2 = 'Bullet2',
    Explosion = 'Explosion',
}

export enum ApiMsgEnum {
    ApiPlayerJoin = 'ApiPlayerJoin',
    ApiPlayerList = 'ApiPlayerList',
    ApiRoomList   = 'ApiRoomList',
    ApiRoomCreate = 'ApiRoomCreate',
    ApiRoomJoin   = 'ApiRoomJoin',
    ApiRoomLeave  = 'ApiRoomLeave',
    ApiGameStart  = 'ApiGameStart',

    MsgClientSync = 'MsgClientSync',
    MsgPlayerList = 'MsgPlayerList',
    MsgRoomList   = 'MsgRoomList',
    MsgRoom       = 'MsgRoom',
    MsgServerSync = 'MsgServerSync',
    MsgGameStart  = 'MsgGameStart',
}