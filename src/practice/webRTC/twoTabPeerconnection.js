// message port
const channel = new MessageChannel()

const iframeNode = document.querySelector('iframe')
const main = document.querySelector('.main')
iframeNode.addEventListener('load', () => {
  channel.port1.onmessage = async event => {
    main.innerHTML = event.data.type

    switch (event.data.type) {
      case 'answer':
        await handleAnswer(event.data)
        break
      case 'candidate':
        await handleCandidate(event)
        break
      default:
        break
    }
  }

  const startButton = document.getElementById('startButton')
  const callButton = document.getElementById('callButton')
  const hangupButton = document.getElementById('hangupButton')
  hangupButton.disabled = true
  const localVideo = document.getElementById('localVideo')

  let pc1
  let localStream

  async function handleAnswer(answer) {
    console.log('pc1 get answer ？ ', answer)
    await pc1.setRemoteDescription(answer)
    onSetRemoteSuccess()
  }

  startButton.onclick = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    localVideo.srcObject = localStream

    startButton.disabled = true
    hangupButton.disabled = false
  }

  callButton.onclick = () => {
    makeCall().then(() => {
      console.log('start call ~')
    })
  }

  async function makeCall() {
    await createPeerConnection()

    const offer = await pc1.createOffer()
    await pc1.setLocalDescription(offer)
    iframeNode.contentWindow.postMessage({ type: 'offer', sdp: offer.sdp }, '*', [channel.port2])
    onSetLocalSuccess(pc1)
  }

  function createPeerConnection() {
    pc1 = new RTCPeerConnection()
    pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e))
    pc1.addEventListener('iceconnectionstatechange', e => onIceStateChange(pc1, e))

    const videoTracks = localStream.getVideoTracks()
    const audioTracks = localStream.getAudioTracks()
    if (videoTracks.length > 0) {
      console.log(`Using video device: ${videoTracks[0].label}`, videoTracks)
    }
    if (audioTracks.length > 0) {
      console.log(`Using audio device: ${audioTracks[0].label}`, audioTracks)
    }

    localStream.getTracks().forEach(track => {
      pc1.addTrack(track, localStream)
    })
  }

  async function onIceCandidate(pc, e) {
    const message = {
      type: 'candidate',
      candidate: null
    }
    if (e.candidate) {
      message.candidate = e.candidate.candidate
      message.sdpMid = e.candidate.sdpMid
      message.sdpMLineIndex = e.candidate.sdpMLineIndex
      console.log(`pc1 ICE candidate:\n${e.candidate ? e.candidate.candidate : '(null)'}`)
    }
    iframeNode.contentWindow.postMessage(message, '*')
  }

  async function handleCandidate(event) {
    console.log('the pc1 handleCandidate -  ', event)
    try {
      if (!event.data.candidate) {
        await pc1.addIceCandidate(null)
      } else {
        await pc1.addIceCandidate(event.data)
      }
      onAddIceCandidateSuccess()
    } catch (e) {
      onAddIceCandidateError(e)
    }
  }

  function onAddIceCandidateSuccess() {
    console.log('pc1 addIceCandidate success')
  }

  function onAddIceCandidateError(error) {
    console.log(`pc1 failed to add ICE Candidate: ${error.toString()}`)
  }

  function onIceStateChange(pc, event) {
    if (pc) {
      console.log(`pc1 ICE state: ${pc.iceConnectionState}`)
      console.log('pc1 ICE state change event: ', event)
    }
  }

  function onSetLocalSuccess() {
    console.log('pc1 setLocalDescription complete')
  }

  function onSetRemoteSuccess() {
    console.log('pc1 setRemoteDescription complete')
  }

  async function getImageBitmap() {
    const track = localStream.getVideoTracks()[0]
    const imageCapture = new ImageCapture(track)
    const bitmap = await imageCapture.grabFrame()
    console.log('bitmap =  ', bitmap)
  }

  /**
   * Take Photo
   */
  const canvas = document.getElementById('canvas')
  const photo = document.getElementById('photo')
  const takePhotoBtn = document.getElementById('takePhotoBtn')

  function getImageBuffer() {
    canvas.width = localVideo.videoWidth
    canvas.height = localVideo.videoHeight
    canvas.getContext('2d').drawImage(localVideo, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/png')
    photo.setAttribute('src', dataUrl)
    canvas.toBlob(async blob => {
      console.log('啦啦啦- - ', blob)
      const buffer = await blob.arrayBuffer()
      console.log('single image buffer - ', buffer)
    })
  }

  takePhotoBtn.addEventListener('click', getImageBuffer)
})
