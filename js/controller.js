'use service'
function onInit() {
    initCanvas()
    addListeners()
    renderGallery()
    renderMeme()
    renderStickers()
}
function renderMeme() {
    loadMeme()
}
function onSetLineTxt() {

    const elInput = document.querySelector('[name=my-line]')
    const str = elInput.value

    setLineTxt(str)
    renderMeme()

}
function onChangeFontSize(val) {
    changeFontSize(val)
    renderMeme()
}
function onChangeStrokeColor() {
    const color = document.querySelector('[name=stroke-color]').value
    changeStrokeColor(color)
    renderMeme()
}
function onChangeFillColor() {
    const color = document.querySelector('[name=fill-color]').value
    changeFillColor(color)
    renderMeme()
}
function onChangeLine() {
    switchLine()
    setStrForInputBox()
    renderMeme()
}
function onMoveText(value) {
    moveText(value)
    renderMeme()
}
function onAddLine() {
    addLine()
    renderMeme()
}
function onDeleteLine() {
    deleteLine()
    renderMeme()
}
function onChangeAlign(align) {
    changeAlign(align)
    renderMeme()
}
function onChangeFont() {
    const val = document.querySelector('select').value
    changeFont(val)
    renderMeme()
}
function renderStickers() {
    const elStickerContainer = document.querySelector('.sticker-container')
    const stickers = getStickers()

    let HTMLstr = stickers.map((sticker, idx) => {
        return `<div class="sticker" onclick=onAddSticker(${idx})> ${sticker}</div>`
    }).join('')
    elStickerContainer.innerHTML = HTMLstr
}
function onAddSticker(idx) {
    addSticker(idx)
    renderMeme()
}
function onDownload(elLink) {
    downloadImg(elLink)
}
function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}
function setStrForInputBox(){
    elInput = document.querySelector('[name=my-line]')
    str = getLine()
    elInput.value = (str === 'Edit text') ? '' : str
}
function onOpenGallery(isLogo){
    document.querySelector('.gallery').style.display='flex'
    document.querySelector('main').style.display='none'
    document.querySelector('.about').style.display='none'
    if(!isLogo)document.body.classList.toggle('menu-open');
    window.scrollTo(0,0); 
}
function onOpenAbout(){
    document.querySelector('.gallery').style.display='none'
    document.querySelector('main').style.display='none'
    document.querySelector('.about').style.display='grid'
    document.body.classList.toggle('menu-open');
    window.scrollTo(0,0); 
}