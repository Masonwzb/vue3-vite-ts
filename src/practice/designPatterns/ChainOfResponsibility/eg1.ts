// 处理者接口声明了一个创建处理者链的方法。还声明了一个执行请求的方法。
interface ComponentWithContextualHelp {
  showHelp(): void
}

// 简单组件的基础类。
abstract class Component implements ComponentWithContextualHelp {
  public tooltipText: string = ''

  // 组件容器在处理者链中作为“下一个”链接。
  public container: Container | null = null

  // 如果组件设定了帮助文字，那它将会显示提示信息。如果组件没有帮助文字
  // 且其容器存在，那它会将调用传递给容器。
  showHelp() {
    if (this.tooltipText !== '') {
      // 显示提示信息。
      console.log('tooltipText = ', this.tooltipText)
    } else {
      this.container?.showHelp()
    }
  }
}

// 容器可以将简单组件和其他容器作为其子项目。链关系将在这里建立。该类将从
// 其父类处继承 showHelp（显示帮助）的行为。
abstract class Container extends Component {
  protected children: Component[] = []

  add(child: Component) {
    this.children.push(child)
    child.container = this
  }
}

// 原始组件应该能够使用帮助操作的默认实现……
class Button extends Component {}
// ……

// 但复杂组件可能会对默认实现进行重写。如果无法以新的方式来提供帮助文字，
// 那组件总是还能调用基础实现的（参见 Component 类）。
class Panel extends Container {
  public modalHelpText: string = ''

  showHelp() {
    if (this.modalHelpText !== '') {
      // 显示包含帮助文字的模态窗口。
      console.log('modalHelpText = ', this.modalHelpText)
    } else super.showHelp()
  }
}

// ……同上……
class Dialog extends Container {
  public wikiPageURL: string = ''

  showHelp() {
    console.log('dialog children = ', this.children, this)

    if (this.wikiPageURL !== '') {
      // 打开百科帮助页面。
      console.log('wikiPageURL = ', this.wikiPageURL)
    } else super.showHelp()
  }
}

// 客户端代码。
export class Application {
  // 每个程序都能以不同方式对链进行配置。
  createUI() {
    const dialog = new Dialog()
    dialog.wikiPageURL = 'http://……'
    const panel = new Panel()
    // panel.modalHelpText = '本面板用于……'
    const ok = new Button()
    ok.tooltipText = '这是一个确认按钮……'
    const cancel = new Button()
    // cancel.tooltipText = '这是一个取消按钮……'
    // ……
    panel.add(ok)
    panel.add(cancel)
    dialog.add(panel)

    cancel.showHelp()
    console.log('cancel  = ', cancel)
  }

  // 想象这里会发生什么。
  onF1KeyPress() {
    this.createUI()
  }
}

void (function () {
  const app = new Application()
  app.onF1KeyPress()
})()
