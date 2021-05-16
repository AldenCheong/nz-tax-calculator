import logo from "./logo.svg";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#fff",
    }
  },
});

function App() {
	return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Tax Calculator</p>
          <TextField variant="filled" color="secondary" label="Annual Income" />
        </header>
      </div>
    </ThemeProvider>
	);
}

export default App;
