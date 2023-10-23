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
import { IMsgGameStart, IMsgRoom } from '../Common/Msg';
const { ccclass, property } = _decorator;

@ccclass('HallManager')
export class HallManager extends Component {
    @property(Node)
    playerContainer: Node;

    @property(Prefab)
    playerPrefab: Prefab;

    protected onLoad(): void {
        director.preloadScene(SceneEnum.Hall);
        director.preloadScene(SceneEnum.battle);
        NetWorkManager.Instance.listenMessage(ApiMsgEnum.MsgRoom, this.renderPlayer, this);
        NetWorkManager.Instance.listenMessage(ApiMsgEnum.MsgGameStart, this.handleGameStart, this);
    }

    start() {
        this.renderPlayer({
            room: DataManager.Instance.roomInfo,
        });
    }

    protected onDestroy(): void {
        NetWorkManager.Instance.unListenMessage(ApiMsgEnum.MsgRoom, this.renderPlayer, this);
        NetWorkManager.Instance.unListenMessage(ApiMsgEnum.MsgGameStart, this.handleGameStart, this);
    }

    renderPlayer({ room: {players: list } }: IMsgRoom) {
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

    async handleLeaveRoom() {
        const { success, error, res } = await NetWorkManager.Instance.callApi(ApiMsgEnum.ApiRoomLeave, {});
        if(!success) {
            console.error(error);
            return;
        }

        DataManager.Instance.roomInfo = null;
        console.log('DataManager.Instance.roomInfo', DataManager.Instance.roomInfo);
        director.loadScene(SceneEnum.Hall);
    }

    async handleStartGame() {
        const { success, error, res } = await NetWorkManager.Instance.callApi(ApiMsgEnum.ApiGameStart, {});
        if(!success) {
            console.error(error);
            return;
        }
    }

    handleGameStart({state}: IMsgGameStart) {
        DataManager.Instance.state = state;
        director.loadScene(SceneEnum.battle);
    }
}


