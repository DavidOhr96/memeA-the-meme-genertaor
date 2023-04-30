'use strict'
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
}
function renderImg(img) {
    gImgs.push({
        keywords: ['self-uploaded'],
        id: gImgs.length + 1,
        src: `${img.src}`,
    })
    setImg(gImgs.length)
    renderGallery()
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}
function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}
function resizeCanvas(elImg) {
    const elContainer = document.querySelector('.canvas-container')
    const ratioa = elImg.height * elContainer.offsetWidth
    const ratiob = ratioa / elImg.width
    gElCanvas.height = ratiob
    gElCanvas.width = elContainer.offsetWidth
}
function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // console.log('pos:', pos)
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        // console.log('ev.pageX:', ev.pageX)
        // console.log('ev.pageY:', ev.pageY)
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        // console.log('pos:', pos)
    }
    return pos
}
function isTextClicked(clickedPos) {

    // let isText = gMeme.lines.find((line, idx) => {
    //    return line.xcordinate < clickedPos.x &&
    //         gCtx.measureText(line.txt).width + line.xcordinate > clickedPos.x &&
    //         line.ycordinate < clickedPos.y &&
    //         line.ycordinate + 30 > clickedPos.y
    //         gMeme.selectedLineIdx=idx
    //     })
    
    // console.log(isText)
    return gMeme.lines.find((line, idx) => {
        gMeme.selectedLineIdx=idx
        return line.xcordinate < clickedPos.x &&
             gCtx.measureText(line.txt).width + line.xcordinate > clickedPos.x &&
             line.ycordinate < clickedPos.y &&
             line.ycordinate + 30 > clickedPos.y
             gMeme.selectedLineIdx=idx
         })
     
    // return distance <= gCircle.size
}
function setCircleDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}
function moveCircle(dx, dy) {
    // console.log('dx:', dx)
    // console.log('dy:', dy)
    gMeme.lines[gMeme.selectedLineIdx].xcordinate += dx
    gMeme.lines[gMeme.selectedLineIdx].ycordinate += dy
}
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // Listen for resize ev
    window.addEventListener('resize', () => {
        onInit()
    })
}
function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos:', pos)
    if (!isTextClicked(pos)) return
    setStrForInputBox()
    setCircleDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // const { isDrag } = getCircle()
    if (!gMeme.lines[gMeme.selectedLineIdx].isDrag) return
    // console.log('Move')

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveCircle(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme()
}

function onUp() {
    // console.log('Up')
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
}




// function textselectorandmover(){
//     console.log('mama')
// requestAnimationFrame(renderLoop);
// var selectedText;
// const mouse = {
//     x: 0,
//     y: 0,
//     bounds: gElCanvas.getBoundingClientRect(),
//     button: false,
//     dragging: false,
//     dragOffsetX: 0,
//     dragOffsetY: 0,
//     events(event) {  // mouse event handler should only record current mouse state
//         const m = mouse;
//         if (event.type === "mousedown") { m.button = true }
//         else if (event.type === "mouseup") { m.button = false }
//         m.x = event.pageX - m.bounds.left - scrollX;
//         m.y = event.pageY - m.bounds.top - scrollY;
//     }
// };
// document.addEventListener("mousemove", mouse.events);
// document.addEventListener("mousedown", mouse.events);
// document.addEventListener("mouseup", mouse.events);
// function renderLoop(time) {
//     if (!textItems.length) { addDemoText() }
//     textItems[0].update("Frame time: " + time.toFixed(3) + "ms");
//     var cursor = "default";
//     handleMouse();
//     gCtx.clearRect(0, 0, gCtx.canvas.width, gCtx.canvas.height);
//     textItems.draw(gCtx);
//     if (selectedText) {
//         cursor = mouse.dragging ? "none" : "move";
//         gCtx.fillStyle = "#08F"; // highlight selected text
//         console.log('papa')
//         selectedText.draw();
//     }
//     gElCanvas.style.cursor = cursor;
//     requestAnimationFrame(renderLoop);
// }
// function handleMouse() {
//     const m = mouse;
//     const text = selectedText;
//     if (m.button) {
//         if (!m.dragging && text !== undefined) {
//             m.dragging = true;
//             m.dragOffsetX = text.x - m.x;
//             m.dragOffsetY = text.y - m.y;
//         }
//         if (m.dragging) {
//             text.x = m.x + m.dragOffsetX;
//             text.y = m.y + m.dragOffsetY;
//             text.keepOnCanvas()
//         }
//     } else {
//         if (m.dragging) {
//             selectedText = undefined;
//             m.dragging = false;
//         }
//         selectedText = textItems.getUnder(m);
//     }
// }

// const textItems = Object.assign([],{
//     getUnder(point) { // returns undefined if no text under
//         for(const t of this) {
//             if (point.x >= t.x && point.x <= t.x + t.width && point.y < t.y + t.size && point.y >= t.y) {
//                 return t;
//             }
//         }
//     },
//     add(gCtx, text, x,  y, color = "#000", size = 24, font = "arial") { // context gCtx to measure the text
//         var item;
//         gCtx.font = size + "px " + font;
//         const width = gCtx.measureText(text).width;
//         this.push(item = {text, x, y, color, font, size, width,
//             draw() {
//                 gCtx.font = this.size + "px " + this.font;
//                 gCtx.textBaseline = "hanging";
//                 gCtx.fillText(this.text, this.x, this.y);
//             },
//             keepOnCanvas() {
//                 console.log('gCtx.Canvas.width',gCtx.canvas.width,'this.width',)
//                 const maxX = gCtx.canvas.width - this.width;
//                 const maxY = gCtx.canvas.height - this.size;
//                 this.x < 0 && (this.x = 0);
//                 this.y < 0 && (this.y = 0);
//                 this.x >= maxX && (this.x = maxX - 1);
//                 this.y >= maxY && (this.y = maxY - 1);
//             },
//             update(text) {
//                 this.text = text;
//                 gCtx.font = this.size + "px " + this.font;
//                 this.width = gCtx.measureText(text).width;
//                 this.keepOnCanvas();
//             }
//         });
//         return item;
//     },
//     draw(gCtx) {
//         for(const text of this) {
//             gCtx.fillStyle = text.color;
//             text.draw();
//         }
//     }
// });
// function addDemoText() {
//     var idx = 0;
//     textItems.add(gCtx, "", 0, 0);
//     for (const t of "HI there! Some text to move with the mouse. Move mouse 🐭 over text items. Click and drag to move the text. 😁 😀".split(" ")) {
//         const text = textItems.add(gCtx, t, idx % (gElCanvas.width - 80), (idx / (gElCanvas.width - 80) | 0) * 26 + 26);
//         text.keepOnCanvas();
//         idx += text.width + 12
//     }
// }
// }


