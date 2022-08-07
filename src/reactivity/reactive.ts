import { track, trigger } from "./effect";

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

export function reactive(raw) {
    return new Proxy(raw, {
        get: createGetter(),
        // get(target, key) {
        //     const res = Reflect.get(target, key);
        //     //TODO 依赖收集
        //     track(target, key);
        //     return res
        // },
        set:createSetter()
        // set(target, key, value) {
        //     const res = Reflect.set(target, key, value) ;
        
        //     //TODO 触发依赖
        //     trigger(target, key);
        //     return res;
        // }
    })
}

export function readonly(raw) {
    return new Proxy(raw, {
        get:createGetter(true),
        // get(target, key) {
        //     const res = Reflect.get(target, key);
        //     return res
        // },

        set(target, key, value) {
            
            return true;
        }
    })
}