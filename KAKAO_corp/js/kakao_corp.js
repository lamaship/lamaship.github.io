const comPile = document.querySelector('.com_pile')
let comPileUl = document.querySelectorAll('.com_pile > ul')

loadWork();
function loadWork (){
    for (let comPileUlindex = 0; comPileUlindex < comPileUl.length; comPileUlindex++) { //줄생략하기
        const comPlieLow = comPileUl[comPileUlindex]; 
        const comPlieLowLi = comPlieLow.querySelectorAll('li')
        for (let i = 0; i < comPlieLowLi.length; i++) {
            const comPileLowPlain = comPlieLowLi[i];
            const comPileLowPlainTxt = comPileLowPlain.querySelector('i');
            if(comPileLowPlainTxt !== null){
                const plainInner = comPileLowPlainTxt.innerText;
                if (plainInner.length > plainInner.substring(0,100).length){
                    const planinOver = plainInner.substring(100,plainInner.length);
                    const replacedString = plainInner.replace(planinOver,'...');                
                    comPileLowPlainTxt.innerText = replacedString;
                }
            }
        }  
    }
}
// header start
const header = document.querySelector('header')
let sideOn;
header.addEventListener('mouseover',(e)=>{
    e.preventDefault();
    const side = e.target.parentNode.querySelector('.side')
    if (curIndex === 1 || curIndex === 3){
        header.classList.remove('white')
    }
    if (e.target.tagName != 'A') return
    if (e.target.tagName === 'A'){
        e.target.parentNode.classList.add('under_line')
        if (!side)return
        side.classList.add('on')
        sideOn=side;
    }
})
header.addEventListener('mouseout',(e)=>{
    e.preventDefault();
    if (curIndex === 1 || curIndex === 3){
        header.classList.add('white')
    }
    if (e.relatedTarget === null){
        sideOn.classList.remove('on');
        e.target.parentNode.classList.remove('under_line')
    }
    if (!sideOn || !e.relatedTarget) return;
    if (!childCheck(sideOn, e.relatedTarget)){
        sideOn.classList.remove('on');
        e.target.parentNode.classList.remove('under_line')
    }
    if (e.target.tagName != 'A' ) return
    if (e.target.tagName === 'A'){
        e.target.parentNode.classList.remove('under_line')
    }
})
function childCheck(sideOn,related){
    while (related.tagName !== 'HTML'){
        if (sideOn === related) {
            return true
        }
        related = related.parentNode
    }
    return false
}


// header end
// slider start
const introInnerBox = document.querySelector('.com_intro');
const arrowNxt = introInnerBox.querySelector('.arrow_nxt');
const arrowPrv = introInnerBox.querySelector('.arrow_prv');
const sliderBox = introInnerBox.querySelector('.intro_slider');
const sliderBoxContent = sliderBox.querySelectorAll('li');
const sliderBoxLang = sliderBoxContent.length
let curIndex = 0;
let opacity = 1;
let inOpacity = 0.1;
const fadeDuration = 30;

function fadeOut (){
    let timeInterval = setInterval(()=>{
        if (opacity <= 0.1){
            clearInterval(timeInterval)
            sliderBoxContent[curIndex-1].style.display = 'none';
            opacity = 1;
        } else {
            sliderBoxContent[curIndex-1].style.opacity = opacity;
            opacity -= 0.1
        }
    },fadeDuration)
}
function fadein (){
    let inTimeInterval = setInterval(()=>{
        if (inOpacity >= 1){
            clearInterval(inTimeInterval)
            inOpacity = 0
        } else {
            sliderBoxContent[curIndex].style.display = 'block'
            sliderBoxContent[curIndex].style.opacity = inOpacity;
            inOpacity += 0.1
        }
    },fadeDuration)
}
function lastFadeOut (){
    let timeInterval = setInterval(()=>{
        if (opacity <= 0.1){
            clearInterval(timeInterval)
            sliderBoxContent[sliderBoxLang-1].style.display = 'none';
            opacity = 1;
        } else {
            sliderBoxContent[sliderBoxLang-1].style.opacity = opacity;
            opacity -= 0.1
        }
    },fadeDuration)
}
arrowNxt.addEventListener('click',(e)=>{
    e.preventDefault();
    if (curIndex === 0 || curIndex === 2){
        header.classList.add('white')
    } else {
        header.classList.remove('white')
    }
    if (curIndex < sliderBoxLang-1){
        fadein();
        fadeOut();
    } else if (curIndex === sliderBoxLang-1){
        fadein();
        lastFadeOut();
        curIndex = -1;
    }
    curSlide = sliderBoxContent[++curIndex];
})

function firstFadeOutBack (){
    let timeInterval = setInterval(()=>{
        if (opacity <= 0.1){
            clearInterval(timeInterval)
            sliderBoxContent[0].style.display = 'none';
            opacity = 1;
        } else {
            sliderBoxContent[0].style.opacity = opacity;
            opacity -= 0.1
        }
    },fadeDuration)
}
function fadeOutBack (){
    let timeInterval = setInterval(()=>{
        if (opacity <= 0.1){
            clearInterval(timeInterval)
            sliderBoxContent[curIndex+1].style.display = 'none';
            opacity = 1;
        } else {
            sliderBoxContent[curIndex+1].style.opacity = opacity;
            opacity -= 0.1
        }
    },fadeDuration)
}

arrowPrv.addEventListener('click',(e)=>{
    e.preventDefault();
    if (curIndex === 0 || curIndex === 2){
        header.classList.add('white')
    } else {
        header.classList.remove('white')
    }
    if (curIndex === 0){
        firstFadeOutBack();
        fadein();
        curIndex = sliderBoxLang
    } else if (curIndex <= sliderBoxLang-1){
        fadein();
        fadeOutBack();
    }
    curSlide = sliderBoxContent[--curIndex];
})
//slider end
//com family start
const comFamily = document.querySelector('.com_family');
const comFamilyA = comFamily.querySelector('A');
const comFamilyUl = comFamily.querySelector('UL');
comFamilyA.addEventListener('click',(e)=>{
    e.preventDefault();
    if (e.target.tagName != 'A')return;
    if (e.target.tagName === 'A'){
        if (!comFamilyUl.className){
            comFamilyUl.classList.add('on')
        } else {
            comFamilyUl.classList.remove('on')
        }
    }
})
//com family end


