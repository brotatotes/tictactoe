import { TicTacToePiece } from "./TicTacToeBase";
import { TicTacToeToddler } from "./TicTacToeToddler";

export class TicTacToeCheater extends TicTacToeToddler {
  public getBestMove(player: TicTacToePiece): number {
    let otherPlayer = TicTacToePiece.X
    if (player === TicTacToePiece.X) {
      otherPlayer = TicTacToePiece.O
    }

    let otherPlayerPieces = [...Array(9).keys()].filter((i) => this.board[i] === otherPlayer)

    if (otherPlayerPieces.length > 2) {
      return otherPlayerPieces[Math.floor(Math.random() * otherPlayerPieces.length)]
    }

    return super.getBestMove(player)
  }
}