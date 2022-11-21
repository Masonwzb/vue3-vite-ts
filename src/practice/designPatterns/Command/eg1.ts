// 命令基类会为所有具体命令定义通用接口。
abstract class Command {
  protected app: Application
  protected editor: Editor
  protected backup: string = ''

  constructor(app: Application, editor: Editor) {
    this.app = app
    this.editor = editor
  }

  // 备份编辑器状态。
  saveBackup() {
    this.backup = this.editor.text
  }

  // 恢复编辑器状态。
  undo() {
    this.editor.text = this.backup

    console.log('undo editor text = ', this.editor.text)
  }

  // 执行方法被声明为抽象以强制所有具体命令提供自己的实现。该方法必须根
  // 据命令是否更改编辑器的状态返回 true 或 false。
  abstract execute(): boolean
}

// 这里是具体命令。
class CopyCommand extends Command {
  // 复制命令不会被保存到历史记录中，因为它没有改变编辑器的状态。
  execute() {
    this.app.clipboard = this.editor.getSelection()
    return false
  }
}

class CutCommand extends Command {
  // 剪切命令改变了编辑器的状态，因此它必须被保存到历史记录中。只要方法
  // 返回 true，它就会被保存。
  execute() {
    this.saveBackup()
    this.app.clipboard = this.editor.getSelection()
    this.editor.deleteSelection()

    console.log('cut execute text = ', this.editor.text)
    return true
  }
}

class PasteCommand extends Command {
  execute() {
    this.saveBackup()
    this.editor.replaceSelection(this.app.clipboard)
    return true
  }
}

// 撤销操作也是一个命令。
class UndoCommand extends Command {
  execute() {
    this.app.undo()
    return false
  }
}

// 全局命令历史记录就是一个堆桟。
class CommandHistory {
  private history: Command[] = []

  // 后进……
  push(c: Command) {
    this.history.push(c)

    console.log('history = ', this.history)
  }
  // 将命令压入历史记录数组的末尾。

  // ……先出
  pop(): Command | undefined {
    return this.history.pop()
  }
  // 从历史记录中取出最近的命令。

  getHistory() {
    return this.history
  }
}

// 编辑器类包含实际的文本编辑操作。它会担任接收者的角色：最后所有命令都会
// 将执行工作委派给编辑器的方法。
class Editor {
  public text: string = 'fuck the world'

  getSelection(): any {}
  // 返回选中的文字。

  deleteSelection(): any {
    this.text = ''
  }
  // 删除选中的文字。

  replaceSelection(text: string): any {}
  // 在当前位置插入剪贴板中的内容。
}

// 应用程序类会设置对象之间的关系。它会担任发送者的角色：当需要完成某些工
// 作时，它会创建并执行一个命令对象。
export class Application {
  public clipboard: string = ''
  private editors: Editor[] = []
  private activeEditor: Editor = new Editor()
  private history: CommandHistory = new CommandHistory()

  // 将命令分派给 UI 对象的代码可能会是这样的。
  createUI() {
    // ……
    const copy = () => {
      this.executeCommand(new CopyCommand(this, this.activeEditor))
    }
    // copyButton.setCommand(copy)
    // shortcuts.onKeyPress("Ctrl+C", copy)

    const cut = () => {
      this.executeCommand(new CutCommand(this, this.activeEditor))
    }

    console.log('裁剪前 editor text = ', this.activeEditor.text)
    console.log('进行裁剪 ~')
    cut()

    setTimeout(() => {
      console.log('10 秒之后 ~')
      console.log('进行恢复 ~')
      this.undo()
    }, 10000)
    // cutButton.setCommand(cut)
    // shortcuts.onKeyPress("Ctrl+X", cut)

    const paste = () => {
      this.executeCommand(new PasteCommand(this, this.activeEditor))
    }
    // pasteButton.setCommand(paste)
    // shortcuts.onKeyPress("Ctrl+V", paste)

    const undo = () => {
      this.executeCommand(new UndoCommand(this, this.activeEditor))
    }
    // undoButton.setCommand(undo)
    // shortcuts.onKeyPress("Ctrl+Z", undo)
  }

  // 执行一个命令并检查它是否需要被添加到历史记录中。
  executeCommand(command: Command) {
    if (command.execute()) {
      this.history.push(command)
    }
  }

  // 从历史记录中取出最近的命令并运行其 undo（撤销）方法。请注意，你并
  // 不知晓该命令所属的类。但是我们不需要知晓，因为命令自己知道如何撤销
  // 其动作。
  undo() {
    const command = this.history.pop()

    console.log('undo history = ', this.history.getHistory())

    if (command) {
      command.undo()
    }
  }

  test() {
    this.createUI()
  }
}

void (function () {
  const app = new Application()
  app.test()
})()
