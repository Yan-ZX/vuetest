import { track, trigger } from "./effect";
import { mutableHandlers, readonlyHandlers } from './baseHandlers';



export function reactive(raw) {

    return new Proxy(raw, mutableHandlers)
    
}

export function readonly(raw) {
    
    return new Proxy(raw, readonlyHandlers)

}