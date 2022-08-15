import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

enum TicTacToePiece {
  X,
  O,
  None
}

class App extends React.Component<{}> {
  state = {};

  testArray: TicTacToePiece[] = [
    TicTacToePiece.X, TicTacToePiece.None, TicTacToePiece.X,
    TicTacToePiece.O, TicTacToePiece.O, TicTacToePiece.None,
    TicTacToePiece.None, TicTacToePiece.None, TicTacToePiece.None,
  ]

  getSquare(piece: TicTacToePiece)
  {
    let icon = <div/>
    if (piece === TicTacToePiece.X) {
      icon = <CloseIcon sx={{ fontSize: "85px" }}/>
    } else if (piece === TicTacToePiece.O) {
      icon = <RadioButtonUncheckedIcon sx={{ fontSize: "70px" }}/>
    }

    return <Button fullWidth sx={{
      minHeight: 140,
      textAlign: 'center',
    }}>
      {icon}
    </Button>
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
            <Typography variant="h6" color="inherit" noWrap>
              <h1>tic tac toe</h1>
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={4}>
                {this.testArray.map(piece =>
                  <Grid item xs={4}>
                    <Paper sx={{
                      backgroundColor: '#1A2027',
                      textAlign: 'center',
                    }}>
                      {this.getSquare(piece)}
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