import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { TicTacToe } from './tictactoe';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

class App extends React.Component<{}> {
  state = {}

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
        <TicTacToe />
      </ThemeProvider>
    )
  }
}

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(<App />);