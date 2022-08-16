import { TicTacToeBase, TicTacToePiece } from "./TicTacToeBase";

export class TicTacToeSimpleton extends TicTacToeBase {
    public getBestMove(_: TicTacToePiece): number {
        for (let index of [...Array(9).keys()]) {
            if (this.board[index] === TicTacToePiece.None) {
                return index
            }
        }

        return -1
    }
}