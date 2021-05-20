import { useState, useEffect } from "react";
import TaxBracket2021 from "./images/TaxBracket-1stApril2021.png";
import AccBracket2021 from "./images/AccBracket-1stApril2021.png";
import TextField from "@material-ui/core/TextField";

function App() {
  const [income, setIncome] = useState();
	const [deductable, setDeductable] = useState({});
	const [bracket, setBracket] = useState();
  const [takeHomePay, setTakeHomePay] = useState();
	const host = "http://localhost:5000";

	useEffect(() => {
		const fetchBracket = async () => {
			const fetchTax = await fetch(host + "/tax-brackets");
			const fetchAcc = await fetch(host + "/acc-bracket");
      const taxBracket = await fetchTax.json();
      const accBracket = await fetchAcc.json();
			setBracket({
        tax: taxBracket,
        acc: accBracket,
      }); 
		};
    fetchBracket();
	}, []);

  useEffect(() => {
    const { tax, acc } = deductable;
    setTakeHomePay(income - tax - acc);
  }, [deductable])

	const calculateDetails = (event) => {
    const initialAmount = Number(event.target.value);
		setIncome(initialAmount);
		if (initialAmount <= 0) return;

		const calculateTax = () => {
			const taxBrackets = bracket.tax;
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

			return taxAmount.toFixed(2);
		};

		const calculateAcc = () => {
			const { threshold, rate } = bracket.acc;
			return (
				(initialAmount >= threshold ? threshold : initialAmount) *
				(rate / 100)
			).toFixed(2);
		};

		setDeductable({
			tax: calculateTax(),
			acc: calculateAcc(),
		});
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
				<p>Tax Amount: {deductable?.tax}</p>
				<p>ACC Amount: {deductable?.acc}</p>
				<p>Take home pay: {takeHomePay}</p>
				<img src={TaxBracket2021} alt="tax bracket" />
				<img src={AccBracket2021} alt="acc bracket" />
			</header>
		</div>
	);
}

export default App;
