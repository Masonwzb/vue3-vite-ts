export class Database {
  private static instance: Database

  private constructor() {
    // 单例的构造函数必须永远是私有类型，以防止使用`new`运算符直接调用构造方法。
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Database()
    }
    return this.instance
  }

  public initialize() {
    console.log('Database initialize')
  }
}

// init
Database.getInstance().initialize()
