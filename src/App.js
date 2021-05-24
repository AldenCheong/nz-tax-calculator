import { useState, useEffect } from "react";
import TaxBracket2021 from "./images/TaxBracket-1stApril2021.png";
import AccBracket2021 from "./images/AccBracket-1stApril2021.png";
import { TextField } from "@material-ui/core";
import KiwiSaver from "./components/kiwisaver/kiwisaver";
import calculateDeductables from "./helpers/calculateDeductables";

import "./App.css";

function App() {
	const [income, setIncome] = useState();
	const [deductable, setDeductable] = useState({});
	const [bracket, setBracket] = useState();
	const [kiwiSaver, setKiwiSaver] = useState({
		include: false,
		rate: 0,
	});
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
		const { tax, acc, kiwi } = deductable;
		setTakeHomePay(income - tax - acc - kiwi);
	}, [deductable, income]);
  
  useEffect(() => {
    income > 0 && setDeductable(calculateDeductables(income, bracket, kiwiSaver));
  }, [income, bracket, kiwiSaver])

	const calculateDetails = (event) => setIncome(Number(event.target.value));
  const onToggleKiwiSaver = () => setKiwiSaver({ ...kiwiSaver, include: !kiwiSaver.include });
  const setKiwiSaverRate = (rate) => setKiwiSaver({ ...kiwiSaver, rate: rate });

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
				<KiwiSaver
					checked={kiwiSaver.include}
					onToggle={onToggleKiwiSaver}
					setKiwiSaverRate={setKiwiSaverRate}
				/>
				<p>KiwiSave rate: {kiwiSaver.rate}</p>
				<p>Tax Amount: {deductable?.tax}</p>
				<p>ACC Amount: {deductable?.acc}</p>
				<p>KiwiSaver Amount: {deductable?.kiwi}</p>
				<p>Take home pay: {takeHomePay}</p>
				<img src={TaxBracket2021} alt="tax bracket" />
				<img src={AccBracket2021} alt="acc bracket" />
			</header>
		</div>
	);
}

export default App;
