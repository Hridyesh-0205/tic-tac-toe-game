let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newbutton = document.querySelector("#new");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;
let gameOver = false;

const winpattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// Reset Game
const resetgame = () => {
    turn0 = true;
    count = 0;
    gameOver = false;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

// Box Click
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if(turn0){
            box.innerText = "O";
            turn0 = false;
        }else{
            box.innerText = "X";
            turn0 = true;
        }

        box.disabled = true;
        count++;

        checkwinner();

        // Draw Check
        if(count === 9 && !gameOver){
            msg.innerText = "Game Draw!";
            msgcontainer.classList.remove("hide");
        }
    });
});

// Disable Boxes
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

// Enable Boxes
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

// Show Winner
const showwinner = (winner) => {
    gameOver = true;
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

// Check Winner
const checkwinner = () => {

    for(let pattern of winpattern){

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !== "" && pos2 !== "" && pos3 !== ""){
            if(pos1 === pos2 && pos2 === pos3){
                showwinner(pos1);
                return;
            }
        }
    }
};

// Buttons
newbutton.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);