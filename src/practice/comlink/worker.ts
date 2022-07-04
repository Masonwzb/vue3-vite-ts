import * as Comlink from './comlink'

const myValue = 67

class MyClass {
    obj = {
        counter: 0,
        inc() {
            this.counter++
        }
    }

    logSomething() {
        console.log(`my value = ${myValue}`)
    }

    async remoteFunction(cb) {
        await cb("A string from a worker");
    }
}

const obj = {
    counter: 0,
    inc() {
        this.counter++
    }
}

Comlink.expose(obj)
