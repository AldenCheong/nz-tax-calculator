import { useState, useEffect } from 'react';
import NumberFormat from "react-number-format";
import { Switch, FormControl, FormControlLabel, Select, MenuItem, InputLabel, TextField, InputAdornment } from '@material-ui/core';

const KiwiSaver = ({ checked, onToggle, setKiwiSaverRate }) => {
	const DEFAULT_RATE = 3;
	const [deductRate, setDeductRate] = useState(DEFAULT_RATE);   
	const [showCustom, setShowCustom] = useState(false);
	const [customRate, setCustomRate] = useState();

	useEffect(() => {
		setKiwiSaverRate(DEFAULT_RATE);
	}, []);

	const updateRate = (event) => {
		const selectedValue = event.target.value;
		const isCustom = selectedValue === "Custom";
		setDeductRate(selectedValue);
		setShowCustom(isCustom);
		if (!isCustom) setKiwiSaverRate(selectedValue);
	}

	const updateCustomRate = (event) => { 
		const inputValue = event.target.value;
		setCustomRate(inputValue);
		setKiwiSaverRate(inputValue);
	}

	return (
		<>
			<FormControlLabel 
				control={(
					<Switch name="kiwiSaver" color="primary" checked={checked} onChange={onToggle}/>   
				)}
				label="KiwiSaver"
			/>
			{checked && <FormControl variant="outlined" size="small">
				<InputLabel>KiwiSaver%</InputLabel> 
				<Select className="select-kiwisaver" value={deductRate} label="KiwiSaver%" onChange={updateRate}>
					<MenuItem value={DEFAULT_RATE}>{DEFAULT_RATE}%</MenuItem>
					<MenuItem value={4}>4%</MenuItem>
					<MenuItem value={6}>6%</MenuItem>
					<MenuItem value={8}>8%</MenuItem>
					<MenuItem value={10}>10%</MenuItem>
					<MenuItem value="Custom">
						<em>Custom</em>
					</MenuItem>
				</Select>
			</FormControl>}
			{checked && showCustom && (
				<TextField
          variant="outlined"
          label="Custom"
					size="small"
					value={customRate}
					className="txt-custom-kiwisaver"
          InputProps={{
            endAdornment: <InputAdornment>%</InputAdornment>,
						inputComponent: NumberFormatCustom,
          }}
					onChange={updateCustomRate}
        />
			)}
		</>
	)
}

const NumberFormatCustom = (props) => {
	const { inputRef, onChange, ...other } = props;
	const MIN_RATE = 1;
	const MAX_RATE = 100;
	const withRateLimit = (inputObj) => {
		const { value } = inputObj;
		if (value >= MIN_RATE && value <= MAX_RATE) return inputObj;
	}

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			isAllowed={withRateLimit}
		/>
	);
}

export default KiwiSaver