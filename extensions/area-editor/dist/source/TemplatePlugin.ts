import { _decorator, Node, ct,isValid,instantiate,Prefab } from 'cc'
const { ccclass, property } = _decorator

@ccclass('TemplatePlugin')
@ct.plugin
export class TemplatePlugin extends ct.BasePlugin {
    /**
     * 插件初始化函数，默认在大厅登录成功后调用，当配置为离线插件时在大厅登录前调用
     * @return 可以返回Promise对象等待插件初始化结果
     */
    onInit(){
    }
    
    onDestroy() {
    }
    
    onDataReducer(state: ct.StateRead, action: ct.AnyAction) {
        if (!state) {
            // 初始化数据
            let t = {}
            return t
        } else {
            switch(action.type) {

            }
        }
    }
    
    onMount(solt:ct.PluginSlotInfo, container:Node) {
        TemplatePlugin.resBundle.load("icon/hallicon", Prefab, (err, asset) => {
            if (!container || !isValid(container)) { 
                return; 
            }

            if (err) {
                console.log(err);
                return;
            }

            let node = instantiate(asset)
            container.addChild(node)
        })
    }
    
    checkSupported(): boolean {
        return true
    }

    checkPopupCondition(viewName: string, conditionType: ct.PluginPopupConditionType): boolean | Promise<boolean> {
        return true
    }
}