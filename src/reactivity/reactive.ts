//import { track, trigger } from "./effect";
import { mutableHandlers, readonlyHandlers } from './baseHandlers';



export function reactive(raw) {
    return new Proxy(raw, mutableHandlers)
    //return new Proxy(raw, mutableHandlers)
}

export function readonly(raw) {
    return createAcctiveObject(raw, readonlyHandlers)
}

function createAcctiveObject(raw: any, baseHandlers) {
    return new Proxy(raw, baseHandlers)
}