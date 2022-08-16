export abstract class TicTacToeBase {
  protected board: TicTacToePiece[];

  constructor() {
    this.board = new Array(9).fill(TicTacToePiece.None);
  }

  public getBoard() {
    return this.board;
  }

  public getPiece(index: number) {
    return this.board[index];
  }

  public setPiece(index: number, piece: TicTacToePiece) {
    this.board[index] = piece;
  }

  public isBoardEmpty(): boolean {
    return this.board.every((p) => p === TicTacToePiece.None)
  }

  public getWinner(): TicTacToePiece {
    return this.checkRowWinner() || this.checkColWinner() || this.checkDiagWinner();
  }

  public isGameOver(): boolean {
    return this.getWinner() !== TicTacToePiece.None || this.board.every((p) => p !== TicTacToePiece.None);
  }

  public abstract getBestMove(player: TicTacToePiece): number

  private checkRowWinner(): TicTacToePiece {
    for (let r = 0; r < 3; r++) {
      let winner = this.checkArrWinner([r * 3, r * 3 + 1, r * 3 + 2]);
      if (winner) {
        return winner;
      }
    }

    return TicTacToePiece.None;
  }

  private checkColWinner(): TicTacToePiece {
    for (let c = 0; c < 3; c++) {
      let winner = this.checkArrWinner([c, c + 3, c + 6]);
      if (winner) {
        return winner;
      }
    }

    return TicTacToePiece.None;
  }

  private checkDiagWinner(): TicTacToePiece {
    return this.checkArrWinner([0, 4, 8]) || this.checkArrWinner([2, 4, 6]);
  }

  private checkArrWinner(arr: number[]): TicTacToePiece {
    let pieces = arr.map(i => this.board[i]);
    if (pieces.every((v) => v === pieces[0])) {
      return pieces[0];
    }

    return TicTacToePiece.None;
  }
}

export enum TicTacToePiece {
  None = 0,
  X,
  O,
}