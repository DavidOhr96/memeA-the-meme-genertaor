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

