// 基础原型。
abstract class Shape {
  public X: number = 0
  public Y: number = 0
  public color: string = ''

  // 原型构造函数。使用已有对象的数值来初始化一个新对象。
  protected constructor(source?: Shape) {
    if (source) {
      this.X = source.X
      this.Y = source.Y
      this.color = source.color
    }
  }
  // clone（克隆）操作会返回一个形状子类。
  abstract clone(): Shape
}

// 具体原型。克隆方法会创建一个新对象并将其传递给构造函数。直到构造函数运
// 行完成前，它都拥有指向新克隆对象的引用。因此，任何人都无法访问未完全生
// 成的克隆对象。这可以保持克隆结果的一致。
class Rectangle extends Shape {
  public width: number = 0
  public height: number = 0

  constructor(source?: Rectangle) {
    // 需要调用父构造函数来复制父类中定义的私有成员变量。
    if (source) {
      super(source)
      this.width = source.width
      this.height = source.height
    } else {
      super()
    }
  }

  clone(): Shape {
    return new Rectangle(this)
  }
}

class Circle extends Shape {
  public radius: number = 0

  constructor(source?: Circle) {
    if (source) {
      super(source)
      this.radius = source.radius
    } else {
      super()
    }
  }

  clone(): Shape {
    return new Circle(this)
  }
}

// 客户端代码中的某个位置。
class Application {
  private shapes: Shape[] = []

  constructor() {
    const circle = new Circle()
    circle.X = 10
    circle.Y = 10
    circle.radius = 20
    this.shapes.push(circle)

    const anotherCircle = circle.clone()
    this.shapes.push(anotherCircle)
    // 变量 `anotherCircle（另一个圆）`与 `circle（圆）`对象的内
    // 容完全一样。

    const rectangle = new Rectangle()
    rectangle.width = 10
    rectangle.height = 20
    this.shapes.push(rectangle)
  }

  businessLogic() {
    // 原型是很强大的东西，因为它能在不知晓对象类型的情况下生成一个与
    // 其完全相同的复制品。
    const shapesCopy: Shape[] = []

    // 例如，我们不知晓形状数组中元素的具体类型，只知道它们都是形状。
    // 但在多态机制的帮助下，当我们在某个形状上调用 `clone（克隆）`
    // 方法时，程序会检查其所属的类并调用其中所定义的克隆方法。这样，
    // 我们将获得一个正确的复制品，而不是一组简单的形状对象。
    this.shapes.forEach(item => {
      shapesCopy.push(item.clone())
    })

    console.log('design patterns prototype the shapesCopy = ', shapesCopy)
  }
}
// `shapesCopy（形状副本）`数组中包含 `shape（形状）`数组所有
// 子元素的复制品。

new Application().businessLogic()
