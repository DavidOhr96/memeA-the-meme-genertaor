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
        drawText(`${gMeme.lines[0].txt}`, 50, 50)
    }

}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

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