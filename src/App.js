import { useState, useEffect } from "react";
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
	const [afterTaxAmount, setAfterTaxAmount] = useState();
  const [taxBrackets, setTaxBrackets] = useState();
  const bracketUrl = "http://localhost:5000/brackets";

  useEffect(() => {
    const getTaxBrackets = async () => {
      const fetchResult = await fetch(bracketUrl);
      setTaxBrackets(await fetchResult.json());
    }
    getTaxBrackets();
  }, [])

	const calcAfterTaxAmount = (event) => {
		const initialAmount = Number(event.target.value);
    if (initialAmount <= 0) return;

    let remainder = initialAmount;
    let taxAmount = 0;
    for (let i = 0; i < taxBrackets.length; i++) {
      const {threshold, rate} = taxBrackets[i];
      const previousThreshold = i > 0 && taxBrackets[i - 1].threshold;
      
      if (initialAmount <= threshold || i === (taxBrackets.length - 1)) {
        if (previousThreshold) remainder -= previousThreshold;
        taxAmount += remainder * (rate / 100);
        break;
      }

      const currentBracket = previousThreshold ? threshold - previousThreshold : threshold;
      taxAmount += currentBracket * (rate / 100);
    }

		setAfterTaxAmount(taxAmount.toFixed(2));
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
					<p>Tax Amount: {afterTaxAmount}</p>
					<img src={TaxBracket2021} alt="tax bracket" />
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
