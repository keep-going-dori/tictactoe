const gameDiv = document.querySelector(".game");
const tictactoeDiv = document.querySelector(".tictactoe");
const playButton = document.querySelector("#play");
const contianer = document.querySelector('.container');

let isPlaying = false;
let selectedXList = [];
let selectedOList = [];
let runCount = 0;
let player = 1;
let winner;

playButton.addEventListener("click",function() {
    if(!isPlaying){
        isPlaying = !isPlaying;
        playButton.innerHTML = "Retry?";
        const playerDiv1 = document.createElement("div");
        playerDiv1.className = "player";
        tictactoeDiv.appendChild(playerDiv1);
        playerDiv1.classList.add("active");
        playerDiv1.innerHTML = "player 1 - O";

        const playerDiv2 = document.createElement("div");
        playerDiv2.className = "player";
        tictactoeDiv.appendChild(playerDiv2);
        playerDiv2.innerHTML = "player 2 - X";


        const table = document.createElement("table");
        for(let size=0; size<3; size++){
            var row = document.createElement("tr");
            for(let j = 0; j<3; j++){
                var cell = document.createElement("td");
                cell.classList.add(`cell`);
                cell.classList.add(`${size}` + `${j}`)
                cell.addEventListener("click", (e)=> {if(!winner) drawIcon(e, playerDiv1, playerDiv2)});
                row.append(cell);
                // cellList.push(cell);
            }
            table.append(row);
        }
        tictactoeDiv.appendChild(table);
    }else{
        history.go(0);
    }
});

const decideWinner = (cell) => {
    const targetText = cell.childNodes[0].data;
    const className = cell.classList.item(1);

    if(targetText === 'O') {
        selectedOList.push([className[0], className[1]]);
        selectedOList.sort();
    } else if(targetText === 'X'){
        selectedXList.push([className[0], className[1]]);
        selectedXList.sort();
    }

    if(selectedOList.length >= 3) clacPoint(selectedOList, 1);
    if(selectedXList.length >= 3) clacPoint(selectedXList, 2);

    if(!winner && runCount === 9) {
        winner = 'Draw!';
        showWinner(winner);
    } else if(winner) {
        showWinner(winner);
    }
}

const clacPoint = (selectedList, player) => {
    let rowPoints = [0, 0, 0];
    let verticalPoints = [0, 0, 0];
    selectedList.forEach((arr) => {
        if (arr[0] === '0') rowPoints[0] = rowPoints[0] + 1;
        if (arr[0] === '1') rowPoints[1] = rowPoints[1] + 1;
        if (arr[0] === '2') rowPoints[2] = rowPoints[2] + 1;

        if (arr[1] === '0') verticalPoints[0] = verticalPoints[0] + 1;
        if (arr[1] === '1') verticalPoints[1] = verticalPoints[1] + 1;
        if (arr[1] === '2') verticalPoints[2] = verticalPoints[2] + 1;         
    })

    rowPoints.forEach((point)=> {
        if(point === 3) {
            if (!verticalPoints.includes(0)) {
                winner = `Player ${player} Win!`; 
                return;
            };
        }
    })

    verticalPoints.forEach((point)=> {
        if(point === 3) {
            if (!rowPoints.includes(0)) {
                winner = `Player ${player} Win!`;
                return;
            };
        }
    })

    if(!rowPoints.includes(0) && !verticalPoints.includes(0)) {
        let diagonalPoints = [0, 0, 0];
        let startPoint = [];
        selectedList.forEach((selectedItem)=> {
            if (JSON.stringify(selectedItem) == JSON.stringify(["0", "0"])){ 
                diagonalPoints[0] = diagonalPoints[0] + 1; 
                startPoint.push('left');
            }
            if (JSON.stringify(selectedItem) == JSON.stringify(["0", "2"])){ 
                diagonalPoints[0] = diagonalPoints[0] + 1; 
                startPoint.push('right');
            }
            if (JSON.stringify(selectedItem) == JSON.stringify(["1", "1"])) diagonalPoints[1] = diagonalPoints[1] + 1;
            if ((startPoint.includes('left') && JSON.stringify(selectedItem) == JSON.stringify(["2", "2"])) || (startPoint.includes('right') && JSON.stringify(selectedItem) == JSON.stringify(["2", "0"]))) diagonalPoints[2] = diagonalPoints[2] + 1;
        })
        if(!diagonalPoints.includes(0)) {
            winner = `Player ${player} Win!`;
            return;
        }
    }
}

const showWinner = (winner) => {
    const winnerDiv = document.createElement('div');
        winnerDiv.className = 'winner';
        winnerDiv.innerHTML = winner;
        contianer.appendChild(winnerDiv);
}

const drawIcon = (e, playerDiv1, playerDiv2) => {
    runCount ++;
    const cell = e.currentTarget;
    if(!cell.innerHTML){
        if(player === 1) {
            cell.innerHTML = 'O';
            player = 2;
            playerDiv1.classList.remove("active");
            playerDiv2.classList.add("active");
        } else if(player===2) {
            cell.innerHTML = 'X';
            player = 1;
            playerDiv2.classList.remove("active");
            playerDiv1.classList.add("active");
        }
        if(!winner) {
            decideWinner(cell);
        }
    }
}