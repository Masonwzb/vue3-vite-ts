import * as Comlink from './comlink'
import MyWorker from './worker?worker&inline'

interface Obj {
    counter: number
    inc: () => void
}

const worker = new MyWorker()

const obj: Obj = Comlink.wrap(worker)

function callback(value) {
    alert(`Result?: ${value}`);
}

async function start() {
    const res = await obj.inc()
    console.log('counter - ', res)
}

start()
