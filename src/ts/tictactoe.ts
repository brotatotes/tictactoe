export enum TTTPiece {
    None = 0,
    X,
    O,
}

export class TTTGame {
    private board: TTTPiece[]

    constructor() {
        this.board = new Array(9).fill(TTTPiece.None)
    }

    public getBoard() {
        return this.board
    }

    public getPiece(index: number) {
        return this.board[index]
    }

    public setPiece(index: number, piece: TTTPiece) {
        this.board[index] = piece
    }

    public getWinner(): TTTPiece {
        return this.checkRowWinner() || this.checkColWinner() || this.checkDiagWinner()
    }

    private checkRowWinner(): TTTPiece {
        for (let r = 0; r < 3; r++) {
            let winner = this.checkArrWinner([r * 3, r * 3 + 1, r * 3 + 2])
            if (winner) {
                return winner
            }
        }

        return TTTPiece.None
    }

    private checkColWinner(): TTTPiece {
        for (let c = 0; c < 3; c++) {
            let winner = this.checkArrWinner([c, c + 3, c + 6])
            if (winner) {
                return winner
            }
        }

        return TTTPiece.None
    }

    private checkDiagWinner(): TTTPiece {
        return this.checkArrWinner([0, 4, 8]) || this.checkArrWinner([2, 4, 6])
    }

    private checkArrWinner(arr: number[]): TTTPiece {
        let pieces = arr.map(i => this.board[i])
        if (pieces.every((v) => v === pieces[0])) {
            return pieces[0]
        }

        return TTTPiece.None
    }
}