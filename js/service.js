// 'use strict'
////////////////////////////////// vars////////////////////////////////////////
let gElCanvas
let gCtx
let gKeywordSearchCountMap = {
    'funny': 12, 'cat': 16, 'baby': 2
}
// let gImgs = [{
//     id: 1,
//     url: 'img/1.jpg',
//     keywords: ['funny', 'cat']

// }];
const gStickers=['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗']
let gStickersOnScreen=[]

let gMeme = {
    selectedImgId: 6,
    selectedLineIdx: 0,
    lines: [
        {
            xcordinate: 60,
            ycordinate: 20,
            txt: 'I sometimes eat Falafel',
            font:'Impact',
            size: 30,
            align: 'left',
            strokeColor: 'black',
            fillColor:'white'
        },
        {
            xcordinate: 100,
            ycordinate: 360,
            txt: 'I know, me too!',
            font:'Impact',
            size: 30,
            align: 'left',
            strokeColor: 'black',
            fillColor:'white'
        }
    ]
}
let gImgs = [
    {
        keywords: ['obama'],
        id: 1,
        src: "meme-imgs (square)/1.jpg",
    },
    {
        keywords: ['obama'],
        id: 2,
        src: "meme-imgs (square)/2.jpg",
    },
    {
        keywords: ['obama'],
        id: 3,
        src: "meme-imgs (square)/3.jpg",
    },
    {
        keywords: ['obama'],
        id: 4,
        src: "meme-imgs (square)/4.jpg",
    },
    {
        keywords: ['obama'],
        id: 5,
        src: "meme-imgs (square)/5.jpg",
    },
    {
        keywords: ['obama'],
        id: 6,
        src: "meme-imgs (square)/6.jpg",
    },
    {
        keywords: ['obama'],
        id: 7,
        src: "meme-imgs (square)/7.jpg",
    },
    {
        keywords: ['obama'],
        id: 8,
        src: "meme-imgs (square)/8.jpg",
    },
    {
        keywords: ['obama'],
        id: 9,
        src: "meme-imgs (square)/9.jpg",
    },
    {
        keywords: ['obama'],
        id: 10,
        src: "meme-imgs (square)/10.jpg",
    },
    {
        keywords: ['obama'],
        id: 11,
        src: "meme-imgs (square)/11.jpg",
    },
    {
        keywords: ['boxers'],
        id: 12,
        src: "meme-imgs (square)/12.jpg",
    },
    {
        keywords: ['boxers'],
        id: 13,
        src: "meme-imgs (square)/13.jpg",
    },
    {
        keywords: ['boxers'],
        id: 14,
        src: "meme-imgs (square)/14.jpg",
    },
    {
        keywords: ['boxers'],
        id: 15,
        src: "meme-imgs (square)/15.jpg",
    },
    {
        keywords: ['boxers'],
        id: 16,
        src: "meme-imgs (square)/16.jpg",
    },
    {
        keywords: ['boxers'],
        id: 17,
        src: "meme-imgs (square)/17.jpg",
    },
    {
        keywords: ['boxers'],
        id: 18,
        src: "meme-imgs (square)/18.jpg",
    },
]

////////////////////////////////// functions//////////////////////////////
function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    console.log('accesing monitor not good!!!')
    renderGallery()
    renderMeme()
    renderStickers()
}
function loadMeme() {
    const elImg = new Image()
    // elImg.src = `meme-imgs (square)/${gMeme.selectedImgId}.jpg`
    console.log(gImgs[gMeme.selectedImgId-1].src)
    elImg.src = `${gImgs[gMeme.selectedImgId-1].src}`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach((line, idx) => {
            drawText(line.txt, line.strokeColor,line.fillColor,line.font, line.size, idx)
        }
        )
        gStickersOnScreen.forEach((sticker,idx)=> {
            placeSticker(sticker.sticker,sticker.x,sticker.y,idx)
        }
        )
    }
}
function drawText(text, strokeColor,fillColor,font, size, idx) {

    // gCtx.lineWidth = 2
    x = gMeme.lines[idx].xcordinate
    y = gMeme.lines[idx].ycordinate
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = 'left'
    gCtx.textBaseline = 'top'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}
function setLineTxt(str) {
    gMeme.lines[gMeme.selectedLineIdx].txt = str
}

function setImg(id) {
    gMeme.selectedImgId = id
    renderMeme()

}

function changeFontSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val

}
function changeStrokeColor(strokeColor) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = strokeColor
}
function changeFillColor(fillColor){
    gMeme.lines[gMeme.selectedLineIdx].fillColor = fillColor
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx < gMeme.lines.length - 1) ? gMeme.selectedLineIdx + 1 : 0
}
function moveText(value) {
    gMeme.lines[gMeme.selectedLineIdx].ycordinate += value
}
function addLine() {
    gMeme.lines.push(
        {
            xcordinate: 100,
            ycordinate: 200,
            txt: 'im a third line',
            font:'Impact',
            size: 30,
            align: 'left',
            strokeColor: 'black',
            fillColor:'white'
        }
    )
}
function deleteLine(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
}
function changeAlign(align){
    gMeme.lines[gMeme.selectedLineIdx].align=align
}
function changeFont(font){
    gMeme.lines[gMeme.selectedLineIdx].font=font
    console.log(font)
}
function getStickers(){
    return gStickers
}
function addSticker(idx){
    gStickersOnScreen.push(
        {
            sticker:gStickers[idx],
            x:getRandomIntInclusive(0,gElCanvas.width),
            y:getRandomIntInclusive(0,gElCanvas.height),
        }
            )

    console.log(gStickersOnScreen)
    // gCtx.fillText(gStickers[idx],50,50)
}
function placeSticker(sticker,x,y,idx){
    gCtx.fillText(sticker,x,y)
}