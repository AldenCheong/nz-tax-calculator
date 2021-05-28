import { useState, useEffect } from "react";
import TaxBracket2021 from "./images/TaxBracket-1stApril2021.png";
import AccBracket2021 from "./images/AccBracket-1stApril2021.png";
import { TextField } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import KiwiSaver from "./components/kiwisaver/kiwisaver";
import calculateDeductables from "./helpers/calculateDeductables";

import "./App.css";

function App() {
	const [income, setIncome] = useState(0);
	const [deductable, setDeductable] = useState({ tax: 0, acc: 0, kiwi: 0 });
	const [bracket, setBracket] = useState({ tax: [], acc: [] });
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
		setTakeHomePay(income - tax - acc - kiwi);
	}, [deductable, income]);
  
  useEffect(() => {
    income >= 0 && setDeductable(calculateDeductables(income, bracket, kiwiSaver));
  }, [income, bracket, kiwiSaver])

	const calculateDetails = (event) => setIncome(Number(event.target.value));
  const onToggleKiwiSaver = () => setKiwiSaver({ ...kiwiSaver, include: !kiwiSaver.include });
  const setKiwiSaverRate = (rate) => setKiwiSaver({ ...kiwiSaver, rate: rate });
  const getValues = (amount) => {
    return {
      hourly: (amount/(52*40)).toFixed(2),
      weekly: (amount/52).toFixed(2),
      monthly: (amount/12).toFixed(2),
      annually: Number(amount).toFixed(2),
    }
  }

  const rows = [
    { id: 0, variable: "Income", ...getValues(income) },
    { id: 1, variable: "Tax", ...getValues(deductable.tax) },
    { id: 2, variable: "Acc", ...getValues(deductable.acc) },
    { id: 3, variable: "KiwiSaver", ...getValues(deductable.kiwi) },
    { id: 4, variable: "Take Home Pay", ...getValues(takeHomePay) },
  ]

  const columns = [
    { field: "variable", headerName: " ", flex: 1 },
    { field: "hourly", headerName: "Hourly", flex: 1 },
    { field: "weekly", headerName: "Weekly", flex: 1 },
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
