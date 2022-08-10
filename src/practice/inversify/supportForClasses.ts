import { Container, injectable, inject } from 'inversify'
import type { Warrior } from './interfaces'

@injectable()
class Katana {
  public hit() {
    return 'cut!'
  }
}

@injectable()
class Shuriken {
  public throw() {
    return 'hit!'
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Katana
  private _shuriken: Shuriken

  public constructor(katana: Katana, shuriken: Shuriken) {
    this._katana = katana
    this._shuriken = shuriken
  }

  public fight() {
    return this._katana.hit()
  }
  public sneak() {
    return this._shuriken.throw()
  }
}

export const container = new Container()

container.bind<Ninja>(Ninja).toSelf()
container.bind<Katana>(Katana).toSelf()
container.bind<Shuriken>(Shuriken).toSelf()
