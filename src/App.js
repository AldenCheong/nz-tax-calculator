import { useState, useEffect } from "react";
import TaxBracket2021 from "./images/TaxBracket-1stApril2021.png";
import AccBracket2021 from "./images/AccBracket-1stApril2021.png";
import {
	TextField,
	Select,
	MenuItem,
	FormControl,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Card,
	CardContent,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import KiwiSaver from "./components/kiwisaver";
import DetailDonutChart from "./components/DetailDonutChart";
import calculateDeductables from "./helpers/calculateDeductables";
import IncomeFrequency from "./helpers/IncomeFrequencyEnum";
import fetchConstants from "./helpers/fetchConstants";

import "./App.css";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
	card: {
		backgroundColor: "cornsilk",
		margin: "25px auto",
		maxWidth: 1100,
	},
	accordion: {
		backgroundColor: "transparent",
		margin: "16px 0",
		borderRadius: 5,
	},
	noMarginTop: {
		marginTop: "0",
	},
	accordionDetails: {
		flexDirection: "column",
	},
	dataGrid: {
		backgroundColor: "#fffbed",
		"& .row-positive": {
			backgroundColor: "palegreen",
		},
		"& .row-negative": {
			backgroundColor: "lightpink",
		},
		"& .row-neutral": {
			backgroundColor: "lightskyblue",
			fontWeight: "bold",
		},
	},
});

function App() {
	const [incomeInput, setIncomeInput] = useState(0);
	const [annualIncome, setAnnualIncome] = useState(0);
	const [hourPerWeek, setHourPerWeek] = useState(40);
	const [incomeFrequency, setIncomeFrequency] = useState(IncomeFrequency.annually);
	const [deductable, setDeductable] = useState({ tax: 0, acc: 0, kiwi: 0 });
	const [bracket, setBracket] = useState({ tax: [], acc: [] });
	const [kiwiSaver, setKiwiSaver] = useState({
		include: false,
		rate: 0,
	});
	const [takeHomePay, setTakeHomePay] = useState();
	const styles = useStyles();

	useEffect(() => {
		const asyncFetchConstant = async () => {
			const { 
        taxBracket, 
        accBracket, 
        kiwiSaverRateOptions 
      } =	await fetchConstants();
			setBracket({
				tax: taxBracket,
				acc: accBracket,
				kiwiSaverOptions: kiwiSaverRateOptions,
			});
			setKiwiSaver({
				include: false,
				rate: kiwiSaverRateOptions[0],
			});
		};
		asyncFetchConstant();
	}, []);

	useEffect(() => {
		const { tax, acc, kiwi } = deductable;
		setTakeHomePay(annualIncome - tax - acc - kiwi);
	}, [deductable, annualIncome]);

	useEffect(() => {
		annualIncome >= 0 &&
			setDeductable(calculateDeductables(annualIncome, bracket, kiwiSaver));
	}, [annualIncome, bracket, kiwiSaver]);

	useEffect(() => {
		let income = incomeInput;
		if (incomeFrequency === IncomeFrequency.hourly) income *= 52 * hourPerWeek;
		if (incomeFrequency === IncomeFrequency.weekly) income *= 52;
		if (incomeFrequency === IncomeFrequency.fortnightly) income *= 26;
		if (incomeFrequency === IncomeFrequency.monthly) income *= 12;
		setAnnualIncome(income);
	}, [incomeInput, hourPerWeek, incomeFrequency]);

	const calculateIncome = (event) => setIncomeInput(Number(event.target.value));
	const updateHourPerWeek = (event) => setHourPerWeek(event.target.value);
	const onSelectFrequency = (event) => setIncomeFrequency(event.target.value);
	const onToggleKiwiSaver = () =>
		setKiwiSaver({ ...kiwiSaver, include: !kiwiSaver.include });
	const setKiwiSaverRate = (rate) => setKiwiSaver({ ...kiwiSaver, rate: rate });
	const setIncomeFrequencyOptions = () => {
		return Object.values(IncomeFrequency).map((frequency) => (
			<MenuItem key={frequency} value={frequency}>
				{frequency}
			</MenuItem>
		));
	};

	const populateDataRows = () => {
		const { tax, acc, kiwi } = deductable;
		const potentialRows = [
			{ label: "Gross Pay", value: annualIncome },
			{ label: "Tax", value: tax },
			{ label: "Acc", value: acc },
			{ label: "KiwiSaver", value: kiwi },
			{ label: "Take Home Pay", value: takeHomePay },
		];
		const getValues = (amount) => {
			return {
				hourly: (amount / (52 * hourPerWeek)).toFixed(2),
				weekly: (amount / 52).toFixed(2),
				fortnightly: (amount / 26).toFixed(2),
				monthly: (amount / 12).toFixed(2),
				annually: Number(amount).toFixed(2),
				percentage: annualIncome
					? ((amount / annualIncome) * 100).toFixed(2) + "%"
					: "0%",
			};
		};
		const setWithTemplate = (index, label, value) => {
			return {
				id: index,
				variable: label,
				...getValues(value),
			};
		};

		return potentialRows
			.map((row, index) => {
				if (row.label === "KiwiSaver" && !kiwiSaver.include) {
					return false;
				}
				return setWithTemplate(index, row.label, row.value);
			})
			.filter((x) => x); // filter to get only those with values
	};

	const columns = [
		{ field: "variable", headerName: " ", flex: 1 },
		{ field: "hourly", headerName: "Hourly", flex: 1 },
		{ field: "weekly", headerName: "Weekly", flex: 1 },
		{ field: "fortnightly", headerName: "Fortnightly", flex: 1 },
		{ field: "monthly", headerName: "Monthly", flex: 1 },
		{ field: "annually", headerName: "Annually", flex: 1 },
		{ field: "percentage", headerName: "Approx. %", flex: 1 },
	];

	const mainGridGetRowClassName = (params) => {
		const variable = params.getValue(params.id, "variable");
		if (variable === "Gross Pay") return "row-positive";
		if (variable === "Take Home Pay") return "row-neutral";
		return "row-negative";
	};

	return (
		<Card className={styles.card} variant="outlined">
			<CardContent>
				<header className="App-header">
					<p>Tax Calculator</p>
				</header>
				<TextField
					variant="outlined"
					size="small"
					color="secondary"
					label="Income"
					onChange={calculateIncome}
				/>
				<FormControl variant="outlined" size="small">
					<Select
						value={incomeFrequency}
						color="secondary"
						onChange={onSelectFrequency}
					>
						{setIncomeFrequencyOptions()}
					</Select>
				</FormControl>
				<Accordion className={styles.accordion}>
					<AccordionSummary expandIcon={<ExpandMore />}>
						Options
					</AccordionSummary>
					<AccordionDetails className={styles.accordionDetails}>
						{bracket?.kiwiSaverOptions && (
							<KiwiSaver
								checked={kiwiSaver.include}
								onToggle={onToggleKiwiSaver}
								options={bracket.kiwiSaverOptions}
								setKiwiSaverRate={setKiwiSaverRate}
							/>
						)}
						<div className="div-hourperweek">
							<TextField
								variant="outlined"
								size="small"
								color="secondary"
								className="txt-hourperweek"
								label="Hour per week"
								value={hourPerWeek}
								onChange={updateHourPerWeek}
							/>
						</div>
					</AccordionDetails>
				</Accordion>
				<div className={styles.dataGrid}>
					<DataGrid
						rows={populateDataRows()}
						columns={columns}
						hideFooter="true"
						autoHeight="true"
						getRowClassName={mainGridGetRowClassName}
					/>
				</div>
				{annualIncome > 0 && (
					<DetailDonutChart chartData={populateDataRows()} />
				)}
				<Accordion
					className={`${styles.accordion} ${
						annualIncome ? styles.noMarginTop : ""
					}`}
				>
					<AccordionSummary expandIcon={<ExpandMore />}>
						Reference
					</AccordionSummary>
					<AccordionDetails className={styles.accordionDetails}>
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
			</CardContent>
		</Card>
	);
}

export default App;
