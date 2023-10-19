import { Prefab } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ApiMsgEnum } from '../Common/Enum';
import { NetWorkManager } from '../Global/NetWorkManager';
import { IApiPlayerListRes } from '../../../../server/src/Common/Api';
const { ccclass, property } = _decorator;

@ccclass('HallManager')
export class HallManager extends Component {
    @property(Node)
    playerContainer: Node;

    @property(Prefab)
    playerPrefab: Prefab;

    start() {
        this.getPlayers();
    }

    async getPlayers() {
        const {success, error, res} = await NetWorkManager.Instance.callApi(ApiMsgEnum.ApiPlayerList, {});
        if(!success) {
            console.error(error);
            return;
        }
        console.log('getPlayers res: ', res);
    }

    renderPlayer({ list }: IApiPlayerListRes) {

    }
}


