import * as React from 'react';
import { Paper, Grid, Box, Button, Container, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ReplayIcon from '@mui/icons-material/Replay';
import { TicTacToeRandom as TicTacToeBaby } from './TicTacToeRandom';
import { TicTacToePiece } from './TicTacToeBase';
import { TicTacToeToddler } from './TicTacToeToddler';

enum Opponent {
  Baby,
  Toddler,
}

export class TicTacToe extends React.Component<{}> {
  state = {
    tictactoe: new TicTacToeBaby(),
    winner: TicTacToePiece.None,
    nextOpponent: Opponent.Baby
  }

  getSquare(piece: TicTacToePiece, index: number) {
    let icon = <div />
    if (piece === TicTacToePiece.X) {
      icon = <CloseIcon sx={{ fontSize: "85px" }} />
    } else if (piece === TicTacToePiece.O) {
      icon = <RadioButtonUncheckedIcon sx={{ fontSize: "70px" }} />
    }

    return (
      <Button fullWidth sx={{ minHeight: 140, textAlign: 'center', }} onClick={() => this.clickSquare(index)}>
        {icon}
      </Button>
    )
  }

  clickSquare(index: number) {
    if (!this.state.tictactoe.isGameOver() && this.state.tictactoe.getPiece(index) === TicTacToePiece.None) {
      this.state.tictactoe.setPiece(index, TicTacToePiece.X)
      let winner = this.state.tictactoe.getWinner()

      if (!this.state.tictactoe.isGameOver()) {
        let botMove = this.state.tictactoe.getBestMove(TicTacToePiece.O)
        this.state.tictactoe.setPiece(botMove, TicTacToePiece.O)
        winner = this.state.tictactoe.getWinner()
      }

      this.setState({ tictactoe: this.state.tictactoe, winner: winner })
    }
  }

  getResultText() {
    let text = "it's a tie 🥲"
    if (this.state.winner !== TicTacToePiece.None) {
      text = (this.state.winner === TicTacToePiece.X ? "amazing 🙄" : "how did you lose? 🤣")
    }

    return (
      <Typography variant="h4" color="inherit" noWrap sx={{ textAlign: 'center', padding: 0 }}>
        {text}
      </Typography>
    )
  }

  getResetButton() {
    return (
      <Button disabled={this.state.tictactoe.isBoardEmpty() && this.opponentMatchesGame()} onClick={() => this.resetGame()} sx={{ marginLeft: 10 }}>
        <ReplayIcon sx={{ fontSize: "50px" }} />
        {/* <Typography variant="h4" color="inherit" noWrap sx={{ textAlign: 'center' }}>
          Apply
        </Typography> */}
      </Button>
    )
  }

  opponentMatchesGame() {
    return this.state.nextOpponent === Opponent.Baby && this.state.tictactoe instanceof TicTacToeBaby
      || this.state.nextOpponent === Opponent.Toddler && this.state.tictactoe instanceof TicTacToeToddler
  }

  resetGame() {
    let gameType = TicTacToeBaby
    if (this.state.nextOpponent === Opponent.Toddler) {
      gameType = TicTacToeToddler
    }

    console.log(gameType)

    this.setState({ tictactoe: new gameType(), winner: TicTacToePiece.None })
  }

  changeOpponent(event) {
    this.setState({ nextOpponent: event.target.value })
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
        <Box textAlign='center' sx={{ minHeight: 100, p: 5 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Opponent</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.nextOpponent}
              label="Opponent"
              onChange={(e) => this.changeOpponent(e)}
            >
              <MenuItem value={Opponent.Baby}>baby</MenuItem>
              <MenuItem value={Opponent.Toddler}>toddler</MenuItem>
            </Select>
          </FormControl>
          {this.getResetButton()}
        </Box>
        <Box textAlign='center' sx={{ minHeight: 80 }}>
          {this.state.tictactoe.isGameOver() ? this.getResultText() : null}
        </Box>
      </Container>
    )
  }
}

