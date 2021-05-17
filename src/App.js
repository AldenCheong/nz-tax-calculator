import { useState } from "react";
import logo from "./logo.svg";
import TaxBracket2021 from "./images/TaxBracket-1stApril2021.png";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		text: {
			primary: "#fff",
		},
	},
});

function App() {
	const [afterTaxAmount, setAfterTaxAmount] = useState(null);

	const calcAfterTaxAmount = (event) => {
		setAfterTaxAmount(Number(event.target.value) / 2);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>Tax Calculator</p>
					<TextField
						variant="filled"
						color="secondary"
						label="Annual Income"
						onChange={calcAfterTaxAmount}
					/>
					<p>After tax: {afterTaxAmount}</p>
					<img src={TaxBracket2021} alt="tax bracket" />
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
