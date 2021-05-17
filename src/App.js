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
		const brackets = [
			{
        threshold: 14000, 
        operator: "<",
        rate: 10.5
      },
			{
        threshold: 48000, 
        operator: "<",
        rate: 17.5
      },
			{
        threshold: 70000, 
        operator: "<",
        rate: 30
      },
			{
        threshold: 180000, 
        operator: "<",
        rate: 33
      },
			{
        threshold: 180000, 
        operator: ">",
        rate: 39
      },
    ];

    

		//setAfterTaxAmount(Number(event.target.value) / 2);
		setAfterTaxAmount(brackets[0].threshold);
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
