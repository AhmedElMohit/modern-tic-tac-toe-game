const X_CLASS = 'x';
const CIRCLE_CLASS = 'circel';
const WINNING_COMBUNATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const borderElement = document.querySelector('[data-border]');
const overLay=document.getElementById('overLay');
const resultText=document.getElementById('resultText');
const restartButton=document.getElementById('restartButton')

let circleTurn = false;
startGame()
function startGame(){
    setHoverMark()
    cellElements.forEach(cellElement=>{
    cellElement.classList.remove(X_CLASS)
    cellElement.classList.remove(CIRCLE_CLASS)
    cellElement.removeEventListener('click',handleClick)
    cellElement.addEventListener('click',handleClick,{once:true})
})

}


function handleClick(e){
    const cellElement=e.target;
    //the current class we are working with ;
    const currentClass=circleTurn?CIRCLE_CLASS:X_CLASS;
    //PLACE THE MARK INSIDE THE CELL;
    placeMark(currentClass,cellElement)
    //getting the winner if exists
     getWinner(currentClass)
    //change the class in each click;
    switchTurns()
    //hover matk setup;
    setHoverMark()
    
}
function placeMark(currentClass, cellElement) {
    cellElement.classList.add(currentClass)
}
function switchTurns() {
    circleTurn = !circleTurn
}
function setHoverMark() {
    borderElement.classList.remove(X_CLASS)
    borderElement.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        borderElement.classList.add(CIRCLE_CLASS)
    }else{
        borderElement.classList.add(X_CLASS)
    }
}
function getWinner(currentClass){
    if(checkWin(currentClass)){
       overLay.classList.add('show');
       const result=currentClass==CIRCLE_CLASS?"o's":"X's";
       resultText.innerText=`${result} wins`
    }else if(isDraw()){
       overLay.classList.add('show');
       resultText.innerText="tie game"
    }
}

function checkWin(currentClass){
    return WINNING_COMBUNATIONS.some(combunation=>{
        return combunation.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS)|| cell.classList.contains(CIRCLE_CLASS)
    })

}
restartButton.addEventListener('click',()=>{
    overLay.classList.remove('show');
    startGame()
})