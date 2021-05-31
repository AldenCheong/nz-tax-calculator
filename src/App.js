import { useState, useEffect } from "react";
import TaxBracket2021 from "./images/TaxBracket-1stApril2021.png";
import AccBracket2021 from "./images/AccBracket-1stApril2021.png";
import { TextField, Select, MenuItem, FormControl, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import KiwiSaver from "./components/kiwisaver/kiwisaver";
import calculateDeductables from "./helpers/calculateDeductables";
import IncomeFrequency from "./helpers/IncomeFrequencyEnum";

import "./App.css";

function App() {
	const [incomeInput, setIncomeInput] = useState(0);
	const [annualIncome, setAnnualIncome] = useState(0);
	const [incomeFrequency, setIncomeFrequency] = useState(IncomeFrequency.annually);
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
		setTakeHomePay(annualIncome - tax - acc - kiwi);
	}, [deductable, annualIncome]);
  
  useEffect(() => {
    annualIncome >= 0 && setDeductable(calculateDeductables(annualIncome, bracket, kiwiSaver));
  }, [annualIncome, bracket, kiwiSaver])

  const convertIncomeToAnnually = (income, frequency) => {
    if (frequency === IncomeFrequency.hourly) income *= (52 * 40);
    if (frequency === IncomeFrequency.weekly) income *= 52;
    if (frequency === IncomeFrequency.monthly) income *= 12;
    return income;
  }
	const calculateIncome = (event) => {
    const inputValue = Number(event.target.value);
    setIncomeInput(inputValue);
    setAnnualIncome(convertIncomeToAnnually(inputValue, incomeFrequency));
  }
  const onToggleKiwiSaver = () => setKiwiSaver({ ...kiwiSaver, include: !kiwiSaver.include });
  const onSelectFrequency = (event) => {
    const frequency = event.target.value;
    setIncomeFrequency(frequency); 
    setAnnualIncome(convertIncomeToAnnually(incomeInput, frequency));
  }
  const setKiwiSaverRate = (rate) => setKiwiSaver({ ...kiwiSaver, rate: rate });
  const setIncomeFrequencyOptions = () => {
    return Object.values(IncomeFrequency).map((frequency) => (
      <MenuItem key={frequency} value={frequency}>{frequency}</MenuItem>
    ))
  }
  const getValues = (amount) => {
    return {
      hourly: (amount/(52*40)).toFixed(2),
      weekly: (amount/52).toFixed(2),
      monthly: (amount/12).toFixed(2),
      annually: Number(amount).toFixed(2),
    }
  }

  const rows = [
    { id: 0, variable: "Income", ...getValues(annualIncome) },
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
					label="Income"
					onChange={calculateIncome}
				/>
        <FormControl variant="outlined" size="small">
          <Select value={incomeFrequency} onChange={onSelectFrequency}>
            {setIncomeFrequencyOptions()}
          </Select>
        </FormControl>
				{bracket?.kiwiSaverOptions && (<KiwiSaver
					checked={kiwiSaver.include}
					onToggle={onToggleKiwiSaver}
          options={bracket.kiwiSaverOptions}
					setKiwiSaverRate={setKiwiSaverRate}
				/>)}
				<div className="data-grid">
          <DataGrid rows={rows} columns={columns} hideFooter="true" autoHeight="true" />
        </div>
        <Accordion className="accordion-explanation">
          <AccordionSummary expandIcon={<ExpandMore />}>
            Explanation
          </AccordionSummary>
          <AccordionDetails className="explanation-details">
            <div>
              <p>Tax brackets:</p> 
              <img src={TaxBracket2021} alt="tax bracket" />
            </div>
            <div>
              <p>Acc limitation:</p>
              <img src={AccBracket2021} alt="acc bracket" />
            </div>
          </AccordionDetails>
        </Accordion>
			</header>
		</div>
	);
}

export default App;
