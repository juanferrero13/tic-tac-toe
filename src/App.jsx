import confetti from "canvas-confetti"
import { useState } from "react"
import Board from "./components/Board.jsx"
import Turns from "./components/Turns.jsx"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { TURNS } from "./constants.js"
import { checkEndGame, checkWinnerFrom } from "./logic/board.js"

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // No actualizamos esta posición si ya tiene algo
    if (board[index] || winner) return
    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guardamos la partida en el localStorage
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)
    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Resetear el juego</button>

      <Board board={board} updateBoard={updateBoard} />

      <Turns turn={turn} />
      
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
