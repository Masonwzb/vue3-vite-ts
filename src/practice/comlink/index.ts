import * as Comlink from './comlink'
import MyWorker from './worker?worker&inline'
import './messageChannel'

// interface Obj {
//     counter: number
//     inc: () => void
// }

const worker = new MyWorker()

const myClass = Comlink.wrap(worker)

function callback(value) {
    alert(`Result?: ${value}`);
}

async function start() {
    const theClass = await new myClass()
    const counter = await theClass.obj.counter
    console.log('counter - ', counter)
}
