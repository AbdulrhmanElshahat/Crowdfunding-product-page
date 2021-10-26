// Select all elements
let overLay = document.querySelector('.over-lay'),
    homeBtns=document.querySelectorAll('.home'),
    modelBox = document.querySelector('.model'),
    modelBoxStatus= localStorage.getItem('modelStatus'),
    closeModel = modelBox.querySelector('.close'),
    boxes = Array.from(modelBox.querySelectorAll('.box')),
    noRewardBox = boxes[0],   //first box
    opacityBox = boxes[boxes.length -1],   //last box
    selectionBox ,
    enterPledge= document.querySelector('.enter-your-pledge'),
    continueBtn =enterPledge.querySelector('.continue'),
    pledgeValue = enterPledge.querySelector('input'),
    pledgeValuePerant = pledgeValue.parentElement,
    titleBoxes = document.querySelectorAll('.title'),
    circles = document.querySelectorAll('.circle'),
    modelTahks = document.querySelector('.model-thanks'),
    modelTahksStatus = localStorage.getItem('modelThankStatus'),
    goItBtn = modelTahks.querySelector('.btn'),
    menue = document.querySelector('.menue'),
    menueBtn = document.querySelector('.open-menue'),
    closeMenue = document.querySelector('.close-menue'),
    activeStatus = localStorage.getItem('activebox')
// models status in locale storage
if(modelBoxStatus === 'block'){showModel(overLay , modelBox)}
if(modelTahksStatus === 'flex'){ showModel(overLay , modelTahks)}
if(activeStatus !== null){active(boxes[activeStatus] , noRewardBox)}
// open model 1
homeBtns.forEach((btn , index) =>{
    btn.onclick = _=>{
        showModel(overLay , modelBox)
        selectBox(index)
        if(selectionBox !== noRewardBox && selectBox[0] !== boxes[boxes.length - 1]){
            active(selectionBox , noRewardBox)
            localStorage.setItem('activebox',index)
        }
    }
})
// close model 2
closeModel.onclick =_=>{
    hideModel(overLay , modelBox)
    inActive()
    localStorage.removeItem('activebox')
}
//active 3
click(titleBoxes);
click(circles);
// containue btn
continueBtn.onclick = _=>{
    //placeholder value 
    let inputPlaceholder = pledgeValue.placeholder,
         // slice minimum of input placeholder and convert it to number
        minValue = parseFloat(inputPlaceholder.slice(1));
    if(noRewardBox.lastElementChild === enterPledge || pledgeValue.value >= minValue){
        inActive()
        hideModel(overLay , modelBox)
        pledgeValue.value = ''
        showModel(overLay , modelTahks)
        pledgeValuePerant.classList.remove('wrong-value') 
        localStorage.removeItem('activebox')
    }else{
        pledgeValuePerant.classList.add('wrong-value')
    }
}
//Go It 
goItBtn.onclick = _=> {hideModel(overLay , modelTahks)};
//opne menue
menueBtn.onclick = _=>{showModel(overLay , menueBtn)}
//close menue
closeMenue.onclick = _=>{hideModel(overLay,menue)}
//Show the model
function showModel(ele, ele1){
    ele.style.display = 'block'
    ele1.style.display = 'block'
    switch (ele1) {
        case modelBox:
            window.scrollTo(0 , 210)
            localStorage.setItem('modelStatus', 'block');
            break;
        case  modelTahks:
            ele1.style.display = 'flex'
            localStorage.setItem('modelThankStatus', 'flex');
            break;
        case menueBtn:
            menueBtn.style.display = 'none'
            closeMenue.style.display = 'block'
            menue.style.display = 'block'
            break;
    }
}
// hide the model
function hideModel(ele,ele1){
    ele.style.display = 'none';
    ele1.style.display = 'none';
    localStorage.removeItem('modelStatus')
    localStorage.removeItem('modelThankStatus')
    pledgeValuePerant.classList.remove('wrong-value')
    if(ele1 === menue){
        menueBtn.style.display='block';
        closeMenue.style.display='none'
    }
}
//Add active classes to the selection box 
function active(element , element1){
    element.classList.add('active-border'); 
    element.querySelector('.fill').style.display = 'block';
    element.querySelector('p').classList.add('line'); 
    element.appendChild(enterPledge); 
    if(element=== element1){ 
        enterPledge.querySelector('.pledge-value').style.display = 'none' 
    }else{
        enterPledge.querySelector('.pledge-value').style.display = 'block'
        pledgeValue.placeholder = element.querySelector('.value').textContent
    }
}
//remove active classes from the selection box 
function inActive(){ 
    boxes.forEach(box =>{
        box.classList.remove('active-border');
        box.querySelector('.fill').style.display = 'none';
        box.querySelector('p').classList.remove('line');
        if(box.lastElementChild.classList.contains('enter-your-pledge')){
            box.lastElementChild.remove()
        }
    })
}
//get selection box
function selectBox(item){
    activeBox = boxes.filter((box, i ) => i == item); 
    selectionBox = activeBox[0]
}
// click on circle or title of the pledge
function click(btns){
    btns.forEach((title , index)=>{
        title.onclick = _=>{
            selectBox(index)
            if(selectionBox !== opacityBox){
                inActive()
                active(selectionBox , noRewardBox)
                pledgeValue.value = ''
                pledgeValuePerant.classList.remove('wrong-value')
                localStorage.setItem('activebox',index)
            }
        }
    })
}