import { TicTacToeBase, TicTacToePiece } from "./TicTacToeBase";

export class TicTacToeRandom extends TicTacToeBase {
  public getBestMove(_: TicTacToePiece): number {
    let botIndex = Math.floor(Math.random() * 9);
    while (this.getPiece(botIndex) !== TicTacToePiece.None) {
      botIndex = Math.floor(Math.random() * 9);
    }

    return botIndex;
  }
}