import { useState, useEffect } from "react";
import TaxBracket2021 from "./images/TaxBracket-1stApril2021.png";
import AccBracket2021 from "./images/AccBracket-1stApril2021.png";
import { TextField } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
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
			const fetchKiwiSaverRate = await fetch(host + "/kiwisaver-rate-option");
			const taxBracket = await fetchTax.json();
			const accBracket = await fetchAcc.json();
      const kiwiSaverRateOptions = await fetchKiwiSaverRate.json();
			setBracket({
				tax: taxBracket,
				acc: accBracket,
        kiwiSaverOptions: kiwiSaverRateOptions,
			});
      setKiwiSaver({
        include: false,
        rate: kiwiSaverRateOptions[0],
      })
		};
		fetchBracket();
	}, []);

	useEffect(() => {
		const { tax, acc, kiwi } = deductable;
		setTakeHomePay((income - tax - acc - kiwi).toFixed(2));
	}, [deductable, income]);
  
  useEffect(() => {
    income >= 0 && setDeductable(calculateDeductables(income, bracket, kiwiSaver));
  }, [income, bracket, kiwiSaver])

	const calculateDetails = (event) => setIncome(Number(event.target.value));
  const onToggleKiwiSaver = () => setKiwiSaver({ ...kiwiSaver, include: !kiwiSaver.include });
  const setKiwiSaverRate = (rate) => setKiwiSaver({ ...kiwiSaver, rate: rate });

  const rows = [
    { id: 1, variable: "Tax", monthly: (deductable.tax/12).toFixed(2), annually: deductable.tax },
    { id: 2, variable: "Acc", monthly: (deductable.acc/12).toFixed(2), annually: deductable.acc },
    { id: 3, variable: "KiwiSaver", monthly: (deductable.kiwi/12).toFixed(2), annually: deductable.kiwi },
    { id: 4, variable: "Take Home Pay", monthly: (takeHomePay/12).toFixed(2), annually: takeHomePay },
  ]

  const columns = [
    { field: "variable", headerName: "Deducted Variable", flex: 1 },
    { field: "monthly", headerName: "Monthly", flex: 1 },
    { field: "annually", headerName: "Annually", flex: 1 },
  ]

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
				{bracket?.kiwiSaverOptions && (<KiwiSaver
					checked={kiwiSaver.include}
					onToggle={onToggleKiwiSaver}
          options={bracket.kiwiSaverOptions}
					setKiwiSaverRate={setKiwiSaverRate}
				/>)}
				<div className="data-grid">
          <DataGrid rows={rows} columns={columns} hideFooter="true" autoHeight="true" />
        </div>
				<img src={TaxBracket2021} alt="tax bracket" />
				<img src={AccBracket2021} alt="acc bracket" />
			</header>
		</div>
	);
}

export default App;
