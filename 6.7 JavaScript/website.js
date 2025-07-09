const clickMeBtn = document.querySelector('.outside-btn');
clickMeBtn.onclick = changeBtnColor;

function changeBtnColor(){
    this.className = 'clickedbtn';
}