// 装饰可以改变组件接口所定义的操作。
interface DataSource {
  writeData(data: string): void
  readData(): void
}

// 具体组件提供操作的默认实现。这些类在程序中可能会有几个变体。
class FileDataSource implements DataSource {
  constructor() {}

  writeData(data: string) {
    console.log('writeData = ', data)
  }
  // 将数据写入文件。
  readData() {}
  // 从文件读取数据。
}

// 装饰基类和其他组件遵循相同的接口。该类的主要任务是定义所有具体装饰的封
// 装接口。封装的默认实现代码中可能会包含一个保存被封装组件的成员变量，并
// 且负责对其进行初始化。
class DataSourceDecorator implements DataSource {
  protected wrappee: DataSource

  constructor(source: DataSource) {
    this.wrappee = source
  }

  // 装饰基类会直接将所有工作分派给被封装组件。具体装饰中则可以新增一些
  // 额外的行为。
  writeData(data: string) {
    this.wrappee.writeData(data)
  }

  // 具体装饰可调用其父类的操作实现，而不是直接调用被封装对象。这种方式
  // 可简化装饰类的扩展工作。
  readData() {
    return this.wrappee.readData()
  }
}

// 具体装饰必须在被封装对象上调用方法，不过也可以自行在结果中添加一些内容。
// 装饰必须在调用封装对象之前或之后执行额外的行为。
class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string) {
    this.wrappee.writeData(`EncryptionDecorator - ${data}`)
  }
  // 1. 对传递数据进行加密。
  // 2. 将加密后数据传递给被封装对象 writeData（写入数据）方法。

  readData() {}
  // 1. 通过被封装对象的 readData（读取数据）方法获取数据。
  // 2. 如果数据被加密就尝试解密。
  // 3. 返回结果。
}

// 你可以将对象封装在多层装饰中。
class CompressionDecorator extends DataSourceDecorator {
  writeData(data: string) {
    this.wrappee.writeData(`CompressionDecorator - ${data}`)
  }
  // 1. 压缩传递数据。
  // 2. 将压缩后数据传递给被封装对象 writeData（写入数据）方法。

  readData() {}
  // 1. 通过被封装对象的 readData（读取数据）方法获取数据。
  // 2. 如果数据被压缩就尝试解压。
  // 3. 返回结果。
}

// 选项 1：装饰组件的简单示例
export class Application {
  private source: FileDataSource | null = null

  dumbUsageExample() {
    this.source = new FileDataSource()
    this.source.writeData('somefile.dat')
    // 已将明码数据写入目标文件。

    this.source = new CompressionDecorator(this.source)
    this.source.writeData('somefile.dat')
    // 已将压缩数据写入目标文件。

    this.source = new EncryptionDecorator(this.source)
    // 源变量中现在包含：
    // Encryption > Compression > FileDataSource
    this.source.writeData('somefile.dat')
    // 已将压缩且加密的数据写入目标文件
  }
}

new Application().dumbUsageExample()
