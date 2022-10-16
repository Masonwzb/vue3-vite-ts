// “抽象部分”定义了两个类层次结构中“控制”部分的接口。它管理着一个指向“实
// 现部分”层次结构中对象的引用，并会将所有真实工作委派给该对象。
class RemoteControl {
  protected device: Device
  constructor(device: Device) {
    this.device = device
  }

  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable()
    } else {
      this.device.enable()
    }
  }

  volumeDown() {
    this.device.setVolume(this.device.getVolume() - 10)
  }

  volumeUp() {
    this.device.setVolume(this.device.getVolume() + 10)
  }

  channelDown() {
    this.device.setChannel(this.device.getChannel() - 1)
  }

  channelUp() {
    this.device.setChannel(this.device.getChannel() + 1)
  }
}

// 你可以独立于设备类的方式从抽象层中扩展类。
class AdvancedRemoteControl extends RemoteControl {
  mute() {
    this.device.setVolume(0)
  }
}

// “实现部分”接口声明了在所有具体实现类中通用的方法。它不需要与抽象接口相
// 匹配。实际上，这两个接口可以完全不一样。通常实现接口只提供原语操作，而
// 抽象接口则会基于这些操作定义较高层次的操作。
interface Device {
  isEnabled(): boolean
  enable(): boolean
  disable(): boolean
  getVolume(): number
  setVolume(percent: number): void
  getChannel(): number
  setChannel(channel: number): void
}

/**
// 所有设备都遵循相同的接口。
class Tv implements Device {}
    // ……

class Radio implements Device {}
    // ……


// 客户端代码中的某个位置。
const tv = new Tv()
const remote1 = new RemoteControl(tv)
remote1.togglePower()

const radio = new Radio()
const remote2 = new AdvancedRemoteControl(radio)
 */
