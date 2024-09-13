import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { turns } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { resetGameStorage, saveGameToStorage } from "./Storage/Storage.js";

function App() {
  const [board, setBoard] = useState(()=>{
    console.log('Inicializar estado')
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null);
  })
    
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? turns.X
  });


  const [winner, setWinner] = useState(null);



  const resetGame = () =>{
    setBoard (Array(9).fill(null))
    setTurn(turns.X)
    setWinner(null)

    resetGameStorage()
  }
  
const updateBoard = (index) => {
    // no actualiza si ya hay algo
    if (board[index] || winner) return;
    // actualiza
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambia el turno
    const newTurn = turn == turns.X ? turns.O : turns.X;
    setTurn(newTurn);
    // Guardar partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Triki</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn == turns.X}>{turns.X}</Square>
        <Square isSelected={turn == turns.O}>{turns.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  );
}

export default App;
