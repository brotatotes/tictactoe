import * as React from 'react';
import { Paper, Grid, Box, Button, Container, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ReplayIcon from '@mui/icons-material/Replay';

export class TicTacToe extends React.Component<{}> {
  state = {
    tictactoe: new TTTGame(),
    // playerTurn: true,
    winner: TTTPiece.None
  }

  getSquare(piece: TTTPiece, index: number) {
    let icon = <div />
    if (piece === TTTPiece.X) {
      icon = <CloseIcon sx={{ fontSize: "85px" }} />
    } else if (piece === TTTPiece.O) {
      icon = <RadioButtonUncheckedIcon sx={{ fontSize: "70px" }} />
    }

    return (
      <Button fullWidth sx={{ minHeight: 140, textAlign: 'center', }} onClick={() => this.clickSquare(index)}>
        {icon}
      </Button>
    )
  }

  clickSquare(index: number) {
    if (!this.state.tictactoe.isGameOver() && this.state.tictactoe.getPiece(index) === TTTPiece.None) {
      this.state.tictactoe.setPiece(index, TTTPiece.X)
      let winner = this.state.tictactoe.getWinner()

      if (!this.state.tictactoe.isGameOver()) {
        let botMove = this.state.tictactoe.getRandomMove(TTTPiece.O)
        this.state.tictactoe.setPiece(botMove, TTTPiece.O)
        winner = this.state.tictactoe.getWinner()
      }

      this.setState({ tictactoe: this.state.tictactoe, winner: winner })
    }
  }

  getResultText() {
    let text = "it's a tie 🥲"
    if (this.state.winner !== TTTPiece.None) {
      text = (this.state.winner === TTTPiece.X ? "nice job i guess 🙄" : "how did you lose? 🤣")
    }

    return (
      <Typography variant="h4" color="inherit" noWrap sx={{ textAlign: 'center', padding: 0 }}>
        {text}
      </Typography>
    )
  }

  resetGame() {
    this.setState({ tictactoe: new TTTGame(), winner: TTTPiece.None })
  }

  render() {
    return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              {this.state.tictactoe.getBoard().map((piece, index) =>
                <Grid key={index} item xs={4}>
                  <Paper sx={{
                    backgroundColor: '#1A2027',
                    textAlign: 'center',
                  }}>
                    {this.getSquare(piece, index)}
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>
        <Box textAlign='center' sx={{ minHeight: 100 }}>
          <Button onClick={() => this.resetGame()}>
            <ReplayIcon sx={{ fontSize: "50px" }} />
          </Button>
        </Box>
        <Box textAlign='center' sx={{ minHeight: 80 }}>
          {this.state.tictactoe.isGameOver() ? this.getResultText() : null}
        </Box>
      </Container>
    )
  }
}

enum TTTPiece {
  None = 0,
  X,
  O,
}

class TTTGame {
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

  public isGameOver(): boolean {
    return this.getWinner() !== TTTPiece.None || this.board.every((p) => p !== TTTPiece.None)
  }

  public getRandomMove(player: TTTPiece): number {
    let botIndex = Math.floor(Math.random() * 9)
    while (this.getPiece(botIndex) !== TTTPiece.None) {
      botIndex = Math.floor(Math.random() * 9)
    }

    return botIndex
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