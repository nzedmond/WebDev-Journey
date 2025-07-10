window.onload = function(){
    const addSquareBtn = document.querySelector('#add');
    addSquareBtn.onclick = createSquare;
    const changeColorBtn = document.querySelector('#colors');
    changeColorBtn.onclick = changeSquareColors;



    const squareArea = document.querySelector('#squarearea');
    const squareCount = parseInt(Math.random()*21) + 30;

    for(let i=0; i<squareCount; i++){
        createSquare();
    }
    const squares = document.querySelectorAll('.squarearea div');
    squares.forEach((square)=>{
        square.onclick = squareClick;
    })
};

function getRandomColor(){
    const letters = "0123456789abcdef";
    let result = "#";
    for(let i=0; i<6; i++){
        result += letters.charAt(parseInt(Math.random() * letters.length));
    }
    return result;
}

function createSquare(){
    const squareArea = document.querySelector('#squarearea');
    const square = document.createElement("div");
    // square.onclick = squareClick;
    square.className = "square";
    square.style.left = parseInt(Math.random()*650) + "px";
    square.style.top = parseInt(Math.random()*250) + "px";
    square.style.backgroundColor = getRandomColor();
    squareArea.appendChild(square);
}

function changeSquareColors(){
    const squares = document.querySelectorAll('#squarearea div');
    console.log(squares);
    squares.forEach((square) => {
        square.style.backgroundColor = getRandomColor();
    })
}
let maxZ = 1000;

function squareClick(){
    let oldZ = parseInt(this.style.zIndex);
    if(oldZ === maxZ){
        this.parentNode.removeChild(this);
    }else{
        maxZ++;
        this.style.zIndex = maxZ;
    }

}