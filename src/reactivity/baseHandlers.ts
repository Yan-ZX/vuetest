import { track, trigger } from './effect';
import { readonly } from './reactive';

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

function createGetter(isReadonly = false) {
    return function get(target, key) {
        const res = Reflect.get(target, key);
        //TODO 依赖收集
        if (!isReadonly) {
            track(target, key);
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value) ;
        //TODO 触发依赖
        trigger(target, key);
        return res;
    }
}

export const mutableHandlers = {
    get,
    set,
}
export const readonlyHandlers = {
    get: readonlyGet,
    set(target, key, value) {
        return true
    }
}