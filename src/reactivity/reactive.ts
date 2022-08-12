//import { track, trigger } from "./effect";
import { mutableHandlers, readonlyHandlers } from './baseHandlers';

export const enum ReactiveFlags{
    IS_REACTIVE = "_v_isReactive",
    IS_READONLY = "_v_isReadonly"
}

export function reactive(raw) {
    return new Proxy(raw, mutableHandlers)
    //return new Proxy(raw, mutableHandlers)
}

export function readonly(raw) {
    return createAcctiveObject(raw, readonlyHandlers)
}

export function isReactive(value) {
    return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
    return !! value[ReactiveFlags.IS_READONLY]
}

function createAcctiveObject(raw: any, baseHandlers) {
    return new Proxy(raw, baseHandlers)
}