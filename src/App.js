import {Provider} from 'react-redux';
import {
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@material-ui/core';
import {green} from '@material-ui/core/colors';
import RestaurentScreen from './components/RestaurentScreen';
import store from './store';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Opinion Ate</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <RestaurentScreen />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
