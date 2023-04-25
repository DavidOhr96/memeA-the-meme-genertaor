'use strict'
function renderGallery(){
    let elGallery= document.querySelector('.gallery')
// elGallery.innerHTML=`<img src="meme-imgs (square)/10.jpg ">
//     <img src="meme-imgs (square)/11.jpg">`
elGallery.innerHTML=gImgs.map(img=>{
    console.log(img.src)
    return`<img src="${img.src}" onclick=onSelectImg(${img.id})>`

}).join('')
}
function onSelectImg(id){
    console.log(id, 'hey')
    setImg(id)
}


