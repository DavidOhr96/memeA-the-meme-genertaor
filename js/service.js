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

let gMeme = {
    selectedImgId: 6,
    selectedLineIdx: 0,
    lines: [
        {
            xcordinate:0,
            ycordinate:0,
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        },
        {
            xcordinate:80,
            ycordinate:80,
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}
const gImgs=[
    {
        keywords: ['obama'],
id:10,
src:"meme-imgs (square)/10.jpg",
},
{
    keywords: ['boxers'],
id:11,
src:"meme-imgs (square)/11.jpg",
},
]

g
////////////////////////////////// functions//////////////////////////////
function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    console.log(gElCanvas)
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    console.log('accesing monitor not good!!!')
    renderGallery()
}
function loadMeme() {
    const elImg = new Image()
    elImg.src = `meme-imgs (square)/${gMeme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach((line,idx)=>{
            drawText(line.txt,idx)
        }
            )
    }

}

function drawText(text,idx) {

    // gCtx.lineWidth = 2
    x=gMeme.lines[idx].xcordinate
    y=gMeme.lines[idx].ycordinate
    gCtx.strokeStyle = gMeme.lines[0].color
    gCtx.fillStyle = 'black'
    gCtx.font = `${gMeme.lines[0].size}px Arial`
    gCtx.textAlign = 'left'
    gCtx.textBaseline = 'top'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}
function setLineTxt(str){
    gMeme.lines[0].txt=str
}

function setImg(id){
gMeme.selectedImgId=id
renderMeme()

}

function ChangeFontSize(val){
    gMeme.lines[0].size+=val

}
function ChangeColor(color){
    gMeme.lines[0].color=color
}