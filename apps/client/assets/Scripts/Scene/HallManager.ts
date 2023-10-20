import { Prefab } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ApiMsgEnum } from '../Common/Enum';
import { NetWorkManager } from '../Global/NetWorkManager';
import { IApiPlayerListRes } from '../../../../server/src/Common/Api';
import { instantiate } from 'cc';
import { PlayerManager } from '../UI/PlayerManager';
const { ccclass, property } = _decorator;

@ccclass('HallManager')
export class HallManager extends Component {
    @property(Node)
    playerContainer: Node;

    @property(Prefab)
    playerPrefab: Prefab;

    start() {
        NetWorkManager.Instance.listenMessage(ApiMsgEnum.MsgPlayerList, this.renderPlayer, this);
        this.playerContainer.destroyAllChildren();
        this.getPlayers();
    }

    protected onDestroy(): void {
        NetWorkManager.Instance.unListenMessage(ApiMsgEnum.MsgPlayerList, this.renderPlayer, this);
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

}


