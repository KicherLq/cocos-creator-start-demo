import { IClientInput } from "./State";

export interface IMsgClientSync {
    frameId: number,
    input: IClientInput,
}

export interface IMsgServerSync {
    lastFrameId: number,
    inputs: IClientInput[],
}