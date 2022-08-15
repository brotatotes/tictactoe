import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography } from '@mui/material';
import { TTTGame, TTTPiece } from './tictactoe';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

class App extends React.Component<{}> {
  state = {
    tictactoe : new TTTGame()
  };

  getSquare(piece: TTTPiece, index: number)
  {
    let icon = <div/>
    if (piece === TTTPiece.X) {
      icon = <CloseIcon sx={{ fontSize: "85px" }}/>
    } else if (piece === TTTPiece.O) {
      icon = <RadioButtonUncheckedIcon sx={{ fontSize: "70px" }}/>
    }

    return <Button fullWidth sx={{ minHeight: 140, textAlign: 'center', }} onClick={(e) => this.clickSquare(index)}>
      {icon}
    </Button>
  }

  clickSquare(index: number) {
    if (this.state.tictactoe.getPiece(index)) {
      this.state.tictactoe.setPiece(index, TTTPiece.X)
      console.log(this.state.tictactoe.getBoard())
      this.setState({ tictactoe: this.state.tictactoe })
    }
  }

  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography variant="h2" color="inherit" noWrap>
              tic tac toe
            </Typography>
          </Toolbar>
        </AppBar>
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
        </Container>
      </ThemeProvider>
    )
  }
}

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(<App />);