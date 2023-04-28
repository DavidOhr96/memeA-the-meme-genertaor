'use strict'
function renderGallery(){
    let elGallery= document.querySelector('.gallery span')
elGallery.innerHTML=gImgs.map(img=>{
    return`<img src="${img.src}" onclick=onSelectImg(${img.id})>`
}).join('')
}
function onSelectImg(id){
    setImg(id)
    document.querySelector('.gallery').style.display='none'
    document.querySelector('main').style.display='flex'
    window.scrollTo(0,0); 
}


