// 远程服务接口。
interface ThirdPartyTVLib {
  listVideos(): void
  getVideoInfo(id: string): void
  downloadVideo(id: string): void
}

// 服务连接器的具体实现。该类的方法可以向腾讯视频请求信息。请求速度取决于
// 用户和腾讯视频的互联网连接情况。如果同时发送大量请求，即使所请求的信息
// 一模一样，程序的速度依然会减慢。
class ThirdPartyTVClass implements ThirdPartyTVLib {
  listVideos() {}
  // 向腾讯视频发送一个 API 请求。

  getVideoInfo(id: string) {}
  // 获取某个视频的元数据。

  downloadVideo(id: string) {}
  // 从腾讯视频下载一个视频文件。
}

// 为了节省网络带宽，我们可以将请求结果缓存下来并保存一段时间。但你可能无
// 法直接将这些代码放入服务类中。比如该类可能是第三方程序库的一部分或其签
// 名是`final（最终）`。因此我们会在一个实现了服务类接口的新代理类中放入
// 缓存代码。当代理类接收到真实请求后，才会将其委派给服务对象。
class CachedTVClass implements ThirdPartyTVLib {
  private service: ThirdPartyTVLib
  private listCache: any
  private videoCache: any
  private needReset: any

  constructor(service: ThirdPartyTVLib) {
    this.service = service
  }

  listVideos() {
    if (this.listCache === null || this.needReset) {
      this.listCache = this.service.listVideos()
      return this.listCache
    }
  }

  getVideoInfo(id: string) {
    if (this.videoCache == null || this.needReset) this.videoCache = this.service.getVideoInfo(id)
    return this.videoCache
  }

  downloadVideo(id: string) {
    if (this.needReset) this.service.downloadVideo(id)
  }
}

// 之前直接与服务对象交互的 GUI 类不需要改变，前提是它仅通过接口与服务对
// 象交互。我们可以安全地传递一个代理对象来代替真实服务对象，因为它们都实
// 现了相同的接口。
class TVManager {
  protected service: ThirdPartyTVLib

  constructor(service: ThirdPartyTVLib) {
    this.service = service
  }

  // 渲染视频页面。
  renderVideoPage(id: string) {
    const info = this.service.getVideoInfo(id)
  }

  // 渲染视频缩略图列表。
  renderListPanel() {
    const list = this.service.listVideos()
  }

  reactOnUserInput() {
    this.renderVideoPage('')
    this.renderListPanel()
  }
}

// 程序可在运行时对代理进行配置。
export class Application {
  public init() {
    const aTVService = new ThirdPartyTVClass()
    const aTVProxy = new CachedTVClass(aTVService)
    const manager = new TVManager(aTVProxy)
    manager.reactOnUserInput()
  }
}
