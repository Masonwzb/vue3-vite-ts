import * as Comlink from '../comlink'
import { Other } from "./other";

const channel =  new MessageChannel()

Comlink.expose(Other, channel.port1)

void (async function (){
    const theOther = Comlink.wrap(channel.port2)
    const otherClass = await new theOther()
    const num = await otherClass.obj.number
    console.log('other - ', num)
    await otherClass.increaseNum()
    console.log('new other - ', await otherClass.getNumber())
})()
