// 抽象工厂接口声明了一组能返回不同抽象产品的方法。这些产品属于同一个系列
// 且在高层主题或概念上具有相关性。同系列的产品通常能相互搭配使用。系列产
// 品可有多个变体，但不同变体的产品不能搭配使用。
interface GUIFactory {
  createButton(): Button
  createCheckbox(): Checkbox
}

// 具体工厂可生成属于同一变体的系列产品。工厂会确保其创建的产品能相互搭配
// 使用。具体工厂方法签名会返回一个抽象产品，但在方法内部则会对具体产品进
// 行实例化。
class WinFactory implements GUIFactory {
  public createButton(): Button {
    return new WinButton()
  }

  public createCheckbox(): Checkbox {
    return new WinCheckbox()
  }
}

// 每个具体工厂中都会包含一个相应的产品变体。
class MacFactory implements GUIFactory {
  public createButton(): Button {
    return new MacButton()
  }

  public createCheckbox(): Checkbox {
    return new MacCheckbox()
  }
}

// 系列产品中的特定产品必须有一个基础接口。所有产品变体都必须实现这个接口。
interface Button {
  paint(): void
}

class WinButton implements Button {
  paint() {
    console.log('WinButton paint')
  }
}

class MacButton implements Button {
  paint() {
    console.log('MacButton  paint')
  }
}

// 这是另一个产品的基础接口。所有产品都可以互动，但是只有相同具体变体的产
// 品之间才能够正确地进行交互。
interface Checkbox {
  paint(): void
}

class WinCheckbox implements Checkbox {
  paint() {
    console.log('WinCheckbox  paint')
  }
}

class MacCheckbox  implements Checkbox {
  paint() {
    console.log('MacCheckbox   paint')
  }
}

class Application {
  private factory: GUIFactory
  private button: Button

  constructor(factory: GUIFactory) {
    this.factory = factory
  }

  public createUI() {
    this.button = this.factory.createButton()
  }

  public paint() {
    this.button.paint()
  }
}

export class ApplicationConfigurator {
  private factory: GUIFactory

  // 程序根据当前配置或环境设定选择创建者的类型。
  initialize(type: string) {
    if (type === 'Windows') {
      this.factory = new WinFactory()
    } else if (type === 'Mac') {
      this.factory = new MacFactory()
    } else {
      throw new Error('错误！未知的操作系统。')
    }

    const app = new Application(this.factory)
    app.createUI()
    app.paint()
  }
}

(function() {
  const app = new ApplicationConfigurator()
  app.initialize('Windows')
})()


