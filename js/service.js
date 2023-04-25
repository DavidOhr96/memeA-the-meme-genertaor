'use strict'
let gElCanvas
let gCtx
function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    console.log(gElCanvas)
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
}