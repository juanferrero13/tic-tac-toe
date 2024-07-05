import { WINNER_COMBOS } from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {
    // Revisamos todoas las convinaciones ganadores para saber si X u O ganó
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a]
        }
    }
    // Si no hay ganador
    return null
}

export const checkEndGame = (newBoard) => {
    // Revisamos si hay un empate si no tenemos mas casilleros vacios en el tablero
    return newBoard.every((square) => square !== null)
}
