import { Input } from 'cc';
import { UITransform } from 'cc';
import { Vec2 } from 'cc';
import { EventTouch } from 'cc';
import { input } from 'cc';
import { _decorator, Component, Node } from 'cc';
import EventManager from '../Global/EventManager';
import { EventEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('JoyStickManager')
export class JoyStickManager extends Component {
    public output: Vec2 = Vec2.ZERO;
    private _body: Node;
    private _stick: Node;
    private _defaultPos: Vec2;
    private _radius: number;

    protected onLoad(): void {
        this._body = this.node.getChildByName('Body');
        this._stick = this._body.getChildByName('Stick');
        this._defaultPos = new Vec2(this._body.position.x, this._body.position.y);
        this._radius = this._body.getComponent(UITransform).contentSize.x / 2;

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    start() {

    }
    onTouchStart(event: EventTouch) {
        const touchPos = event.getUILocation();
        this._body.setPosition(touchPos.x, touchPos.y);
    }
    onTouchMove(event: EventTouch) {
        const touchPos = event.getUILocation();
        const relativePos: Vec2 = new Vec2(touchPos.x - this._body.position.x, touchPos.y - this._body.position.y);
        if(relativePos.length() > this._radius) {
            let scale: number = this._radius / relativePos.length();
            relativePos.multiplyScalar(scale);
        }
        this._stick.setPosition(relativePos.x, relativePos.y);
        this.output = relativePos.clone().normalize();
        //console.log(this.output);
    }
    onTouchEnd() {
        this._body.setPosition(this._defaultPos.x, this._defaultPos.y);
        this._stick.setPosition(0, 0);
        this.output = Vec2.ZERO;
    }
    update(deltaTime: number) {
        
    }
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
}


