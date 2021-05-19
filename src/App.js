import { useState, useEffect } from "react";
import TaxBracket2021 from "./images/TaxBracket-1stApril2021.png";
import TextField from "@material-ui/core/TextField";

function App() {
	const [taxAmount, setTaxAmount] = useState();
	const [accAmount, setAccAmount] = useState();
	const [taxBrackets, setTaxBrackets] = useState();
	const [accBracket, setAccBracket] = useState();
	const host = "http://localhost:5000";

	useEffect(() => {
		const getTaxBrackets = async () => {
			const fetchResult = await fetch(host + "/tax-brackets");
			setTaxBrackets(await fetchResult.json());
		};
		const getAccBracket = async () => {
			const fetchResult = await fetch(host + "/acc-bracket");
			setAccBracket(await fetchResult.json());
		};
		getTaxBrackets();
		getAccBracket();
	}, []);

	const calculateDetails = (event) => {
		const initialAmount = Number(event.target.value);
		if (initialAmount <= 0) return;

		const calculateTax = () => {
			let remainder = initialAmount;
			let taxAmount = 0;
			for (let i = 0; i < taxBrackets.length; i++) {
				const { threshold, rate } = taxBrackets[i];
				const previousThreshold = i > 0 && taxBrackets[i - 1].threshold;

				if (initialAmount <= threshold || i === taxBrackets.length - 1) {
					if (previousThreshold) remainder -= previousThreshold;
					taxAmount += remainder * (rate / 100);
					break;
				}

				const currentBracket = previousThreshold
					? threshold - previousThreshold
					: threshold;
				taxAmount += currentBracket * (rate / 100);
			}

			setTaxAmount(taxAmount.toFixed(2));
		};

		const calculateAcc = () => {
			const { threshold, rate } = accBracket;
			setAccAmount(
				(
					(initialAmount >= threshold ? threshold : initialAmount) *
					(rate / 100)
				).toFixed(2)
			);
		};

		calculateTax();
		calculateAcc();
	};

	return (
    <div className="App">
      <header className="App-header">
        <p>Tax Calculator</p>
        <TextField
          variant="outlined"
          size="small"
          color="secondary"
          label="Annual Income"
          onChange={calculateDetails}
        />
        <p>Tax Amount: {taxAmount}</p>
        <p>ACC Amount: {accAmount}</p>
        <p>Take home pay: {accAmount}</p>
        <img src={TaxBracket2021} alt="tax bracket" />
      </header>
    </div>
	);
}

export default App;
