import { Prefab } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ApiMsgEnum } from '../Common/Enum';
import { NetWorkManager } from '../Global/NetWorkManager';
import { IApiPlayerListRes } from '../../../../server/src/Common/Api';
import { instantiate } from 'cc';
import { PlayerManager } from '../UI/PlayerManager';
import DataManager from '../Global/DataManager';
import { director } from 'cc';
import { SceneEnum } from '../Enum';
import { IApiRoomListRes } from '../Common/Api';
import { RoomManager } from '../UI/RoomManager';
const { ccclass, property } = _decorator;

@ccclass('HallManager')
export class HallManager extends Component {
    @property(Node)
    playerContainer: Node;

    @property(Prefab)
    playerPrefab: Prefab;

    @property(Node)
    roomContainer: Node;

    @property(Prefab)
    roomPrefab: Prefab

    protected onLoad(): void {
        NetWorkManager.Instance.listenMessage(ApiMsgEnum.MsgPlayerList, this.renderPlayer, this);
        NetWorkManager.Instance.listenMessage(ApiMsgEnum.MsgRoomList, this.renderRoom, this);
        director.preloadScene(SceneEnum.Room);
    }

    start() {
        this.playerContainer.destroyAllChildren();
        this.roomContainer.destroyAllChildren();
        this.getPlayers();
        this.getRooms();
    }

    protected onDestroy(): void {
        NetWorkManager.Instance.unListenMessage(ApiMsgEnum.MsgPlayerList, this.renderPlayer, this);
        NetWorkManager.Instance.unListenMessage(ApiMsgEnum.MsgRoomList, this.renderRoom, this);
    }

    async getPlayers() {
        const {success, error, res} = await NetWorkManager.Instance.callApi(ApiMsgEnum.ApiPlayerList, {});
        if(!success) {
            console.error(error);
            return;
        }
        this.renderPlayer(res);
    }

    renderPlayer({ list }: IApiPlayerListRes) {
        for (const c of this.playerContainer.children) {
            c.active = false;
        }

        while(this.playerContainer.children.length < list.length) {
            const node = instantiate(this.playerPrefab);
            node.active = false;
            node.setParent(this.playerContainer);
        }

        console.log('renderPlayer, the list is: ', list);

        for(let i = 0; i < list.length; ++i) {
            const data = list[i];
            const node = this.playerContainer.children[i];
            node.getComponent(PlayerManager).init(data);
        }
    }

    async getRooms() {
        const {success, error, res} = await NetWorkManager.Instance.callApi(ApiMsgEnum.ApiRoomList, {});
        if(!success) {
            console.error(error);
            return;
        }
        this.renderRoom(res);
    }

    renderRoom({ list }: IApiRoomListRes) {
        for (const c of this.roomContainer.children) {
            c.active = false;
        }

        while(this.roomContainer.children.length < list.length) {
            const node = instantiate(this.roomPrefab);
            node.active = false;
            node.setParent(this.roomContainer);
        }

        console.log('renderRoom, the list is: ', list);

        for(let i = 0; i < list.length; ++i) {
            const data = list[i];
            const node = this.roomContainer.children[i];
            node.getComponent(RoomManager).init(data);
        }
    }

    async handleCreateRoom() {
        const { success, error, res } = await NetWorkManager.Instance.callApi(ApiMsgEnum.ApiRoomCreate, {});
        if(!success) {
            console.error(error);
            return;
        }

        DataManager.Instance.roomInfo = res.room;
        console.log('DataManager.Instance.roomInfo', DataManager.Instance.roomInfo);
        director.loadScene(SceneEnum.Room);
    }
}


