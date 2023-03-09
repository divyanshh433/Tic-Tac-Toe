const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector('.game-info');
const newGameBtn=document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//lets create a function to initialize the game
function initGame(){
    currentPlayer='X';
    gameGrid=["","","","","","","","",""];
    //ui pe empty nhi hue boxes
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents='all';
        box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove('active');
    gameInfo.innerText=`Current Player - ${currentPlayer}`;


}

initGame();


function swapTurn(){
    if(currentPlayer==='X'){
        currentPlayer='O';

    }
    else{
        currentPlayer="X";
    }
    //ui update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}


function checkGameOver(){
    let answer="";
    winningPositions.forEach((position)=>{
        //all 3 boxes should be empty and should have same value
        if((gameGrid[position[0]]!="" || gameGrid[position[1]]!="" || gameGrid[position[2]]!="")
        && (gameGrid[position[0]]===gameGrid[position[1]]&&gameGrid[position[1]]===gameGrid[position[2]])){
            //check winner
            if(gameGrid[position[0]]==="X"){
                answer="X";

            }
            else{
                answer="O";
            }
            //disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents='none';
            });

            //green
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    });

    //it means we have winner
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }
    //there is tie
    if (answer===""){
        let fillCount=0;
        gameGrid.forEach((box)=>{
            if (box!==""){
                fillCount++;
            }
        });

        //board filled
        if (fillCount==9){
            gameInfo.innerText='Game Tied!';
            newGameBtn.classList.add('active');
        }
    }
    

}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents='none';
        //swap turn
        swapTurn();
        //game over?
        checkGameOver();
    }
}


boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    });
});

newGameBtn.addEventListener("click",initGame);