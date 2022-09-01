// 只有当产品较为复杂且需要详细配置时，使用生成器模式才有意义。下面的两个
// 产品尽管没有同样的接口，但却相互关联。

// 一辆汽车可能配备有 GPS 设备、行车电脑和几个座位。不同型号的汽车（
// 运动型轿车、SUV 和敞篷车）可能会安装或启用不同的功能。
class Car {}

// 用户使用手册应该根据汽车配置进行编制，并介绍汽车的所有功能。
class Manual {}

// 生成器接口声明了创建产品对象不同部件的方法。
interface Builder {
  reset(): void
  setSeats(num: number): void
  setEngine(): void
  setTripComputer(): void
  setGPS(): void
}

class CarBuilder implements Builder {
  private car: Car | undefined

  // 一个新的生成器实例必须包含一个在后续组装过程中使用的空产品对象。
  constructor() {
    this.reset()
  }

  // reset（重置）方法可清除正在生成的对象。
  public reset() {
    this.car = new Car()
  }

  // 所有生成步骤都会与同一个产品实例进行交互。

  // 设置汽车座位的数量。
  public setSeats(num: number) {}

  // 安装指定的引擎。
  public setEngine() {}

  // 安装行车电脑。
  public setTripComputer() {}

  // 安装全球定位系统。
  public setGPS() {}

  // 具体生成器需要自行提供获取结果的方法。这是因为不同类型的生成器可能
  // 会创建不遵循相同接口的、完全不同的产品。所以也就无法在生成器接口中
  // 声明这些方法（至少在静态类型的编程语言中是这样的）。
  //
  // 通常在生成器实例将结果返回给客户端后，它们应该做好生成另一个产品的
  // 准备。因此生成器实例通常会在 `getProduct（获取产品）`方法主体末尾
  // 调用重置方法。但是该行为并不是必需的，你也可让生成器等待客户端明确
  // 调用重置方法后再去处理之前的结果。
  public getProduct(): Car | null {
    if (!this.car) return null

    const product = this.car
    this.reset()
    return product
  }
}

// 生成器与其他创建型模式的不同之处在于：它让你能创建不遵循相同接口的产品。
class CarManualBuilder implements Builder {
  private manual: Manual | undefined

  // 一个新的生成器实例必须包含一个在后续组装过程中使用的空产品对象。
  constructor() {
    this.reset()
  }

  // reset（重置）方法可清除正在生成的对象。
  public reset() {
    this.manual = new Manual()
  }

  // 所有生成步骤都会与同一个产品实例进行交互。

  // 添加关于汽车座椅功能的文档。
  public setSeats(num: number) {}

  // 添加关于引擎的介绍。
  public setEngine() {}

  // 添加关于行车电脑的介绍。
  public setTripComputer() {}

  // 添加关于 GPS 的介绍。
  public setGPS() {}

  // 返回使用手册并重置生成器。
  public getProduct(): Manual | null {
    if (!this.manual) return null

    const product = this.manual
    this.reset()
    return product
  }
}

// 主管只负责按照特定顺序执行生成步骤。其在根据特定步骤或配置来生成产品时
// 会很有帮助。由于客户端可以直接控制生成器，所以严格意义上来说，主管类并
// 不是必需的。
class Director {
  private builder: Builder | undefined

  // 主管可同由客户端代码传递给自身的任何生成器实例进行交互。客户端可通
  // 过这种方式改变最新组装完毕的产品的最终类型。
  public setBuilder(builder: Builder) {
    this.builder = builder
  }

  // 主管可使用同样的生成步骤创建多个产品变体。
  public constructSportsCar(builder: Builder) {
    builder.reset()
    builder.setSeats(2)
    builder.setEngine()
    builder.setTripComputer()
    builder.setGPS()
  }

  constructSUV(builder: Builder) {}
}

export class Application {
  public makeCar() {
    const director = new Director()

    const builderCar = new CarBuilder()
    director.constructSportsCar(builderCar)
    const car = builderCar.getProduct()

    const builderManual = new CarManualBuilder()
    director.constructSportsCar(builderManual)

    // 最终产品通常需要从生成器对象中获取，因为主管不知晓具体生成器和
    // 产品的存在，也不会对其产生依赖。
    const manual = builderManual.getProduct()
  }
}
