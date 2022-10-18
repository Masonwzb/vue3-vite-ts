// 组件接口会声明组合中简单和复杂对象的通用操作。
interface Graphic {
  move(x: number, y: number): void
  draw(): void
}

// 叶节点类代表组合的终端对象。叶节点对象中不能包含任何子对象。叶节点对象
// 通常会完成实际的工作，组合对象则仅会将工作委派给自己的子部件。
class Dot implements Graphic {
  private x: number
  private y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  move(x: number, y: number) {
    this.x += x
    this.y += y
  }

  // 在坐标位置(X,Y)处绘制一个点。
  draw() {}
}

// 所有组件类都可以扩展其他组件。
class CircleGraphic extends Dot {
  private radius: number

  constructor(x: number, y: number, radius: number) {
    super(x, y)
    this.radius = radius
  }

  // 在坐标位置(X,Y)处绘制一个半径为 R 的圆。
  draw() {}
}

// 组合类表示可能包含子项目的复杂组件。组合对象通常会将实际工作委派给子项
// 目，然后“汇总”结果。
class CompoundGraphic implements Graphic {
  private children: Graphic[] = []

  // 组合对象可在其项目列表中添加或移除其他组件（简单的或复杂的皆可）。
  add(child: Graphic) {}
  // 在子项目数组中添加一个子项目。

  remove(child: Graphic) {}
  // 从子项目数组中移除一个子项目。

  move(x: number, y: number) {
    this.children.forEach(child => {
      child.move(x, y)
    })
  }

  // 组合会以特定的方式执行其主要逻辑。它会递归遍历所有子项目，并收集和
  // 汇总其结果。由于组合的子项目也会将调用传递给自己的子项目，以此类推，
  // 最后组合将会完成整个对象树的遍历工作。
  draw() {}
  // 1. 对于每个子部件：
  //     - 绘制该部件。
  //     - 更新边框坐标。
  // 2. 根据边框坐标绘制一个虚线长方形。
}

// 客户端代码会通过基础接口与所有组件进行交互。这样一来，客户端代码便可同
// 时支持简单叶节点组件和复杂组件。
class ImageEditor {
  private all: CompoundGraphic | null = null

  load() {
    this.all = new CompoundGraphic()
    this.all.add(new Dot(1, 2))
    this.all.add(new CircleGraphic(5, 3, 10))
    // ……
  }

  // 将所需组件组合为复杂的组合组件。
  groupSelected(components: Graphic[]) {
    const group = new CompoundGraphic()

    for (let component of components) {
      group.add(component)
      this.all?.remove(component)
    }

    this.all?.add(group)
    // 所有组件都将被绘制。
    this.all?.draw()
  }
}
