import { myContainer } from './container'
import { TYPES } from './types'
import { Warrior } from './interfaces'

const ninja = myContainer.get<Warrior>(TYPES.Warrior)

console.log('inversify ? ', ninja.sneak(), ninja.fight())
