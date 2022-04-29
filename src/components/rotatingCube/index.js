
// Global variable
const defaultPerspective = '-150px';
// const pageX = window.screen.width;
// const pageY = window.screen.height;
// Track the mouse move
let mouseX = 0;
let mouseY = 0;
let originX = 0;
let originY = 0;
let lastXDeg = 0;
let lastYDeg = 0;
let initX = 0;
let initY = 0;
// The speed of the cube following movement
const speed = 0.1;
let whetherMouseDown = false;


window.addEventListener('load', () => {
    drawContent();

    const cube = document.querySelector('.cube');
    const faceFront = document.querySelector('.face.front')
    faceFront?.addEventListener('click', () => {
        lastXDeg = 0;
        lastYDeg = 0;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
    })
    faceFront?.addEventListener('dblclick', () => {
        lastXDeg = -180;
        lastYDeg = 0;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
    })

    const faceBack = document.querySelector('.face.back')
    faceBack?.addEventListener('click', () => {
        lastXDeg = -180;
        lastYDeg = 0;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
    })
    faceBack?.addEventListener('dblclick', () => {
        lastXDeg = 0;
        lastYDeg = 0;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
    })

    const faceLeft = document.querySelector('.face.left')
    faceLeft?.addEventListener('click', () => {
        lastXDeg = 90;
        lastYDeg = 0;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(-90deg) rotateX(0deg)`;
    })
    faceLeft?.addEventListener('dblclick', () => {
        lastXDeg = -90;
        lastYDeg = 0;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(90deg) rotateX(0deg)`;
    })

    const faceRight = document.querySelector('.face.right')
    faceRight?.addEventListener('click', () => {
        lastXDeg = -90;
        lastYDeg = 0;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(90deg) rotateX(0deg)`;
    })
    faceRight?.addEventListener('dblclick', () => {
        lastXDeg = 90;
        lastYDeg = 0;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(-90deg) rotateX(0deg)`;
    })

    const faceTop = document.querySelector('.face.top')
    faceTop?.addEventListener('click', () => {
        lastXDeg = 0;
        lastYDeg = -90;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
    })
    faceTop?.addEventListener('dblclick', () => {
        lastXDeg = 0;
        lastYDeg = 90;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
    })

    const faceBottom = document.querySelector('.face.bottom')
    faceBottom?.addEventListener('click', () => {
        lastXDeg = 0;
        lastYDeg = 90;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
    })
    faceBottom?.addEventListener('dblclick', () => {
        lastXDeg = 0;
        lastYDeg = -90;
        cube.style.transform = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
    })
});
window.addEventListener('mousedown', (e) => {
    e.stopPropagation()
    e.preventDefault()
    originX = getAngle(e.pageX / getWidth())
    originY = getAngle(e.pageY / getHeight())
    initX = lastXDeg
    initY = lastYDeg
    whetherMouseDown = true
})
window.addEventListener('mousemove', (e) => {
    if (whetherMouseDown) {
        updateMousePosition(e);
    }
});
window.addEventListener('mouseup', (e) => {
    e.stopPropagation()
    e.preventDefault()
    originX = 0
    originY = 0
    initX = 0
    initY = 0
    whetherMouseDown = false
})

// Set inner html for face
function drawContent() {
    const faces = Array.from(document.querySelectorAll('.face'));
    for (const face of faces) {
        face.innerHTML = `
        <div class='outer-layer'></div>
        <div class='cover cicle'></div>
        <div class='inner cicle'>
        <i class="fas fa-heart">${face.classList[1]}</i>
        `
    }
}

// Follow mouse movement
function updateMousePosition(e) {
    mouseX = e.pageX / getWidth();
    mouseY = e.pageY / getHeight();
    rotateCube()
}

function rotateCube() {
    // lastXDeg = lastXDeg + (getAngle(mouseX) - lastXDeg) * speed;
    // lastYDeg = lastYDeg + (getAngle(mouseY) - lastYDeg) * speed;
    lastXDeg = initX +  getAngle(mouseX) - originX
    lastYDeg = initY +  getAngle(mouseY) - originY

    if (lastXDeg > 360) lastXDeg = lastXDeg - 360
    if (lastXDeg < -360) lastXDeg = lastXDeg + 360
    if (lastYDeg > 360) lastYDeg = lastYDeg - 360
    if (lastYDeg < -360) lastYDeg = lastYDeg + 360

    let newStyle = `translateZ(${defaultPerspective}) rotateY(${-lastXDeg}deg) rotateX(${lastYDeg}deg)`;
    const cube = document.querySelector('.cube');
    cube.style.transform = newStyle
}

// this function return the corresponding angle for an x value
function getAngle(x) {
    return 180 - 360 * x;
}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}
