import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

class App extends React.Component<{}> {
  state = {};

  testArray = [
    'X', '_', 'X',
    'O', 'O', '_',
    '_', '_', '_',
  ]

  // getRandomIcon() {
  //   return (
  //     Math.random() > 0.5 ? <RadioButtonUncheckedIcon /> : <ClearIcon />
  //   )
  // }

  // getSquare(icon) {
  //   return (
  //     <Grid item xs={4}>
  //       <Item>{icon}</Item>
  //     </Grid>
  //   )
  // }

  // getRandomSquare() {
  //   let icon = this.getRandomIcon();
  //   console.log(icon);
  //   return this.getSquare(icon);
  // }

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
                {this.testArray.map(_ =>
                  <Grid item xs={4}>
                    <Item>
                      <Button>
                        <ClearIcon />
                      </Button>
                    </Item>
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