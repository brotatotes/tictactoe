import { TicTacToePiece } from "./TicTacToeBase";
import { TicTacToeToddler } from "./TicTacToeToddler";

export class TicTacToeLoser extends TicTacToeToddler {
  public getBestMove(player: TicTacToePiece): number {
    if (player === TicTacToePiece.X) {
      return super.getBestMove(TicTacToePiece.O)
    } else {
      return super.getBestMove(TicTacToePiece.X)
    }
  }
}