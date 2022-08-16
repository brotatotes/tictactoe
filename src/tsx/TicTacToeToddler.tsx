import { TicTacToeBase, TicTacToePiece } from "./TicTacToeBase";

export class TicTacToeToddler extends TicTacToeBase {
  public getBestMove(player: TicTacToePiece): number {
    let possibleMoves = [...Array(9).keys()].filter((i) => this.board[i] === TicTacToePiece.None);
    let diag1 = [0, 4, 8];
    let diag2 = [2, 4, 6];

    // Win if possible.
    for (let move of possibleMoves) {
      let r = Math.floor(move / 3);
      let c = move % 3;

      let row = [r * 3, r * 3 + 1, r * 3 + 2];
      let col = [c, c + 3, c + 6];

      if (this.hasTwo(player, row)) {
        return move;
      }

      if (this.hasTwo(player, col)) {
        return move;
      }

      if (diag1.includes(move) && this.hasTwo(player, diag1)) {
        return move;
      }

      if (diag2.includes(move) && this.hasTwo(player, diag2)) {
        return move;
      }
    }

    // Block opponent if possible.
    for (let move of possibleMoves) {
      let r = Math.floor(move / 3);
      let c = move % 3;

      let row = [r * 3, r * 3 + 1, r * 3 + 2];
      let col = [c, c + 3, c + 6];

      let otherPlayer = TicTacToePiece.X;
      if (player === TicTacToePiece.X) {
        otherPlayer = TicTacToePiece.O;
      }

      if (this.hasTwo(otherPlayer, row)) {
        return move;
      }

      if (this.hasTwo(otherPlayer, col)) {
        return move;
      }

      if (diag1.includes(move) && this.hasTwo(otherPlayer, diag1)) {
        return move;
      }

      if (diag2.includes(move) && this.hasTwo(otherPlayer, diag2)) {
        return move;
      }
    }

    // No immediate win or block possible. Get 2 in a row.
    for (let move of possibleMoves) {
      let r = Math.floor(move / 3);
      let c = move % 3;

      let row = [r * 3, r * 3 + 1, r * 3 + 2];
      let col = [c, c + 3, c + 6];

      if (this.hasOne(player, row)) {
        return move;
      }

      if (this.hasOne(player, col)) {
        return move;
      }

      if (diag1.includes(move) && this.hasOne(player, diag1)) {
        return move;
      }

      if (diag2.includes(move) && this.hasOne(player, diag2)) {
        return move;
      }
    }

    return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  }

  private hasTwo(player: TicTacToePiece, arr: number[]): boolean {
    return arr.filter((i) => this.board[i] === player).length === 2
      && arr.filter((i) => this.board[i] === TicTacToePiece.None).length === 1;
  }

  private hasOne(player: TicTacToePiece, arr: number[]): boolean {
    return arr.filter((i) => this.board[i] === player).length === 1
      && arr.filter((i) => this.board[i] === TicTacToePiece.None).length === 2;
  }
}