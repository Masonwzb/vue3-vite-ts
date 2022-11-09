// 这里有复杂第三方视频转换框架中的一些类。我们不知晓其中的代码，因此无法
// 对其进行简化。

class VideoFile {}
// ……

class OggCompressionCodec {}
// ……

class MPEG4CompressionCodec {}
// ……

class CodecFactory {}
// ……

class BitrateReader {}
// ……

class AudioMixer {}
// ……

// 为了将框架的复杂性隐藏在一个简单接口背后，我们创建了一个外观类。它是在
// 功能性和简洁性之间做出的权衡。
class VideoConverter {
  convert(filename: string, format: string) {
    // const file = new VideoFile(filename)
    // const sourceCodec = (new CodecFactory).extract(file)
    let destinationCodec: any
    if (format == 'mp4') {
      destinationCodec = new MPEG4CompressionCodec()
    } else {
      destinationCodec = new OggCompressionCodec()
    }
    // const buffer = BitrateReader.read(filename, sourceCodec)
    // const result = BitrateReader.convert(buffer, destinationCodec)
    // const result = (new AudioMixer()).fix(result)
    // return new File(result)
  }
}

// 应用程序的类并不依赖于复杂框架中成千上万的类。同样，如果你决定更换框架，
// 那只需重写外观类即可。
export class Application {
  main() {
    const convertor = new VideoConverter()
    const mp4 = convertor.convert('funny-cats-video.ogg', 'mp4')
    // mp4.save()
  }
}
