import { useState } from 'react';
import NumberFormat from "react-number-format";
import { Switch, FormControl, FormControlLabel, Select, MenuItem, InputLabel, TextField, InputAdornment } from '@material-ui/core';

const KiwiSaver = ({ checked, onToggle, options, setKiwiSaverRate }) => {
	const [deductRate, setDeductRate] = useState(options[0]);   
	const [showCustom, setShowCustom] = useState(false);
	const [customRate, setCustomRate] = useState();

	const updateRate = (event) => {
		const selectedValue = event.target.value;
		const isCustom = selectedValue === "Custom";
		setDeductRate(selectedValue);
		setShowCustom(isCustom);
		!isCustom && setKiwiSaverRate(selectedValue);
	}

	const updateCustomRate = (event) => { 
		const inputValue = event.target.value;
		setCustomRate(inputValue);
		setKiwiSaverRate(inputValue);
	}

	const setOptions = () => {
		return (options.concat("Custom"))
			.map((option) => (<MenuItem key={option} value={option}>{option}%</MenuItem>));
	}

	return (
		<div className="kiwisaver">
			<FormControlLabel 
				control={(
					<Switch name="kiwiSaver" color="primary" checked={checked} onChange={onToggle}/>   
				)}
				label="KiwiSaver"
			/>
			{checked && <FormControl variant="outlined" size="small">
				<InputLabel>KiwiSaver%</InputLabel> 
				<Select className="select-kiwisaver" value={deductRate} label="KiwiSaver%" onChange={updateRate}>
					{setOptions()}
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
		</div>
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

KiwiSaver.defaultProps = {
	options: [3, 4, 6, 8, 10]
}

export default KiwiSaver