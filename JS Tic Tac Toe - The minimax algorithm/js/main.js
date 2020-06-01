let moves = 0;
const human = "X";
const AI = "O";
let board = [];
const cells = document.querySelectorAll(".cell");

function init() {
  startGame();

  cells.forEach(cell => {
    board.push(Number(cell.id));
  });
}

function startGame() {
  cells.forEach(cell => {
    cell.innerHTML = "";
    cell.addEventListener("click", move);
  });
}

function move(square) {
  if (square.target.innerHTML == "") {

    // filling actual borad on UI and in the array

    square.target.innerHTML = human;
    board[square.target.id] = human;
    ++moves;
    square.target.removeEventListener("click", move);

    // check for winner

    let result = checkWinner(board, AI);
    if (moves === 9 && !result.winner) {
      declareWinner("error", "Tie game");
    } else if (result.winner) {
      declareWinner("success", `${result.winner} won the game`);
    }
  }

  const bestMoveForAI = minimax(board, AI);
  ++moves;

  
  
  board[bestMoveForAI.index] = AI;
  cells[bestMoveForAI.index].innerHTML = AI;
  cells[bestMoveForAI.index].removeEventListener('click', move);

  console.log(board);


  let result = checkWinner(board, AI);
  if (moves === 9 && !result.winner) {
    declareWinner("error", "Tie game");
  } else if (result.winner) {
    declareWinner("success", `${result.winner} won the game`);
  }


}

function declareWinner(icon, text) {
  // to show the modal respectively

  swal({
    title: icon === "success" ? "Success" : "Draw",
    text,
    icon
  })

  // start the new game
  moves = 0;
  board = [];
  startGame();
}

function checkWinner(array, player) {
  let winner;

  // straight way checking
  if (
    (array[0] === player && array[1] === player && array[2] === player) ||
    (array[3] === player && array[4] === player && array[5] === player) ||
    (array[6] === player && array[7] === player && array[8] === player)
  ) {
    winner = player;
    return { winner: winner, message: `${player} won the game.` };
  }

  // downside checking
  if (
    (array[0] === player && array[3] === player && array[6] === player) ||
    (array[1] === player && array[4] === player && array[7] === player) ||
    (array[2] === player && array[5] === player && array[8] === player)
  ) {
    winner = player;
    return { winner: winner, message: `${player} won the game.` };
  }

  // diagonal check
  if (
    (array[0] === player && array[4] === player && array[8] === player) ||
    (array[2] === player && array[4] === player && array[6] === player)
  ) {
    winner = player;
    return { winner: winner, message: `${player} won the game.` };
  }

  if (winner !== null && array.every(cell => cell !== "")) {
    return { winner: null, message: "Tie Game" };
  }
}

function minimax(newBoard, player) {
  // evaluate the availabe spots
  const availSpots = newBoard.filter(cell => typeof cell === "number");

  // return the score accordingly +10 = AI, -10 = player, 0 = 'TIE'
  if (checkWinner(newBoard, player).winner === player) {
    return { score: -10 };
  } else if (checkWinner(newBoard, AI).winner === AI) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  // to store the all possibles moves in the form of an array
  var moves = [];

  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    // collecting the scores;
    if (player === AI) {
      var result = minimax(newBoard, human);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, AI);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  let bestMove;

  if (player === AI) {
    var bestScore = -100;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 100;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

init();
