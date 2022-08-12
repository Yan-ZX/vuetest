//import { track, trigger } from "./effect";
import { mutableHandlers, readonlyHandlers } from './baseHandlers';

export const enum ReactiveFlags{
    IS_REACTIVE = "_v_isReactive"
}

export function reactive(raw) {
    return new Proxy(raw, mutableHandlers)
    //return new Proxy(raw, mutableHandlers)
}

export function readonly(raw) {
    return createAcctiveObject(raw, readonlyHandlers)
}

export function isReactive(value) {
    return value[ReactiveFlags.IS_REACTIVE]
}

function createAcctiveObject(raw: any, baseHandlers) {
    return new Proxy(raw, baseHandlers)
}