// 享元类包含一个树的部分状态。这些成员变量保存的数值对于特定树而言是唯一
// 的。例如，你在这里找不到树的坐标。但这里有很多树木之间所共有的纹理和颜
// 色。由于这些数据的体积通常非常大，所以如果让每棵树都其进行保存的话将耗
// 费大量内存。因此，我们可将纹理、颜色和其他重复数据导出到一个单独的对象
// 中，然后让众多的单个树对象去引用它。
class TreeType {
  private name: string
  private color: string

  constructor(name: string, color: string) {
    this.name = name
    this.color = color
  }

  // 1. 创建特定类型、颜色和纹理的位图。
  // 2. 在画布坐标 (X,Y) 处绘制位图。
  public draw(canvas: any, x: number, y: number) {
    console.log('treeType draw = ', canvas, x, y)
  }
}

// 享元工厂决定是否复用已有享元或者创建一个新的对象。
class TreeFactory {
  public static treeTypes: Map<string, TreeType> = new Map()

  public static getTreeType(name: string, color: string) {
    const key = `${name}-${color}`

    let type = this.treeTypes.get(key)

    if (!type) {
      type = new TreeType(name, color)
      this.treeTypes.set(key, type)
    }
    return type
  }
}

// 情景对象包含树状态的外在部分。程序中可以创建数十亿个此类对象，因为它们
// 体积很小：仅有两个整型坐标和一个引用成员变量。
class Tree {
  private x: number
  private y: number
  private type: TreeType
  constructor(x: number, y: number, type: TreeType) {
    this.x = x
    this.y = y
    this.type = type
  }

  public draw(canvas: any) {
    this.type.draw(canvas, this.x, this.y)
  }
}

// 树（Tree）和森林（Forest）类是享元的客户端。如果不打算继续对树类进行开
// 发，你可以将它们合并。
export class Forest {
  private trees: Tree[] = []

  public plantTree(x: number, y: number, name: string, color: string) {
    const type = TreeFactory.getTreeType(name, color)
    const tree = new Tree(x, y, type)
    this.trees.push(tree)
  }

  public draw() {
    this.trees.forEach(t => t.draw(Date.now()))
  }

  public getTrees() {
    return this.trees
  }

  public getTreeTypes() {
    return TreeFactory.treeTypes
  }
}

const forest = new Forest()

// @ts-ignore
window.forest = forest
