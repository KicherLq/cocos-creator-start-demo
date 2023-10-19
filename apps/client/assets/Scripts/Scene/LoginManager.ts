import { EditBox } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { NetWorkManager } from '../Global/NetWorkManager';
import { ApiMsgEnum } from '../Common/Enum';
import DataManager from '../Global/DataManager';
import { director } from 'cc';
import { SceneEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('LoginManager')
export class LoginManager extends Component {
    @property({displayName: '输入框', type: EditBox})
    input: EditBox = null;

    protected onLoad(): void {
        director.preloadScene(SceneEnum.battle);
    }

    async start() {
        await NetWorkManager.Instance.connect();
    }

    async handleClick() {
        if(!NetWorkManager.Instance.isConnected) {
            console.error('服务器未连接！');
            await NetWorkManager.Instance.connect();
            return;
        }

        const nickname = this.input.string;
        if(!nickname) {
            console.log('用户名输入框为空！');
            return;
        }

        const {success, error, res} = await NetWorkManager.Instance.callApi(ApiMsgEnum.ApiPlayerJoin, {
            nickname,
        });
        if(!success) {
            console.error(error);
            return;
        }

        DataManager.Instance.myPlayerId = res.player.id;
        console.log('Success! Res: ', res);
        director.loadScene(SceneEnum.Hall);
    }
}


