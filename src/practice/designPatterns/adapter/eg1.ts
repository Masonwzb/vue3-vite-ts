// 假设你有两个接口相互兼容的类：圆孔（RoundHole）和圆钉（RoundPeg）。
class RoundHole {
  constructor() {}

  getRadius() {}
  // 返回孔的半径。

  fits(peg: RoundPeg) {
    return this.getRadius() >= peg.getRadius()
  }
}

class RoundPeg {
  constructor() {}

  getRadius() {}
  // 返回钉子的半径。
}

// 但还有一个不兼容的类：方钉（Square­Peg）。
class SquarePeg {
  constructor() {}

  getWidth() {}
  // 返回方钉的宽度。
}

// 适配器类让你能够将方钉放入圆孔中。它会对 RoundPeg 类进行扩展，以接收适
// 配器对象作为圆钉。
class SquarePegAdapter extends RoundPeg {
  // 在实际情况中，适配器中会包含一个 SquarePeg 类的实例。
  private peg: SquarePeg

  constructor(peg: SquarePeg) {
    this.peg = peg
  }

  getRadius() {
    // 适配器会假扮为一个圆钉，其半径刚好能与适配器实际封装的方钉搭配
    // 起来。
    return (this.peg.getWidth() * Math.sqrt(2)) / 2
  }
}

;(function () {
  // 客户端代码中的某个位置。
  const hole = new RoundHole(5)
  const rpeg = new RoundPeg(5)
  hole.fits(rpeg) // true

  const small_sqpeg = new SquarePeg(5)
  const large_sqpeg = new SquarePeg(10)
  hole.fits(small_sqpeg) // 此处无法编译（类型不一致）。

  const small_sqpeg_adapter = new SquarePegAdapter(small_sqpeg)
  const large_sqpeg_adapter = new SquarePegAdapter(large_sqpeg)
  hole.fits(small_sqpeg_adapter) // true
  hole.fits(large_sqpeg_adapter) // false
})()

export {}
