import { extend } from '../shared/index';


let activeEffect;
let shouldTrack;

class ReactiveEffect{
    private _fn: any;
    deps = [];
    active = true;
    onStop?: () => void;
    constructor(fn, public scheduler?) {
        this._fn = fn;
    }
    run() {
        activeEffect = this;

        if (this.active == false) {
            return this._fn()
        }

        shouldTrack = true;
        activeEffect = this;
        const result = this._fn();
        shouldTrack = false;

        return result;
    }
    stop() {
        if (this.active) {
            clearnupEffect(this);
            if (this.onStop) {
                this.onStop();
            }
            this.active = false;
        }
        
    }
}

function clearnupEffect(effect) {
    effect.deps.forEach((dep: any) => {
        dep.delete(effect)
    })
}

const targetMap = new Map();
export function track(target, key) {
    if (!isTracking()) return;

    // target -> key -> dep
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }

    //已经在 dep 中
    if (dep.has(activeEffect)) return;
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
}


function isTracking() {
    return shouldTrack && activeEffect !== undefined;

}

export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler();
        } else {
            effect.run();
        }
        
    }
}

export function stop(runner) {
    runner.effect.stop();
}



export function effect(fn, options: any = {}) {

    const _effect = new ReactiveEffect(fn,options.scheduler);
    //Object.assign(_effect, options);
    extend(_effect, options)
    //_effect.onStop = options.onStop;
    _effect.run();
    const runner:any = _effect.run.bind(_effect)

    runner.effect = _effect;

    return runner
}
