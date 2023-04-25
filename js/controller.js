'use service'
function renderMeme(){
    loadMeme()
}
function onSetLineTxt(ev){
    
const elInput=document.querySelector('[name=my-line]')
const str=elInput.value
elInput.value=''
    setLineTxt(str)
    renderMeme()
}

function onChangeFontSize(val){
    ChangeFontSize(val)
    renderMeme()
}
function onChangeColor(){
    const color=document.querySelector('[name=text-color]').value
    ChangeColor(color)
    renderMeme()

}