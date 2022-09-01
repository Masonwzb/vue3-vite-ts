interface Button {
  render(): void
  onClick(): void
}

abstract class Dialog {
  abstract createButton(): Button

  render() {
    // 调用工厂方法创建一个产品对象。
    const okButton = this.createButton()
    // 现在使用产品。
    okButton.render()
    okButton.onClick()
  }
}

class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton()
  }
}

class WebDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton()
  }
}

class WindowsButton implements Button {
  render() {
    console.log('WindowsButton render')
  }

  onClick() {
    console.log('WindowsButton onClick')
  }
}

class HTMLButton implements Button {
  render() {
    console.log('HTMLButton render')
  }

  onClick() {
    console.log('HTMLButton onClick')
  }
}

export class Application {
  private dialog: Dialog | undefined

  // 程序根据当前配置或环境设定选择创建者的类型。
  initialize(type: string) {
    if (type === 'Windows') {
      this.dialog = new WindowsDialog()
    } else if (type === 'Web') {
      this.dialog = new WebDialog()
    } else {
      throw new Error('错误！未知的操作系统。')
    }
  }

  render() {
    this.dialog?.render()
  }
}

;(function () {
  const app = new Application()
  app.initialize('Windows')
  app.render()
})()
