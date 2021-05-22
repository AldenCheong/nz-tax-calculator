import { useState } from 'react';
import NumberFormat from "react-number-format";
import { Switch, FormControl, FormControlLabel, Select, MenuItem, InputLabel, TextField, InputAdornment } from '@material-ui/core';

const KiwiSaver = ({ checked, onToggle, setRate }) => {
	const [deductRate, setDeductRate] = useState(3);   
	const [showCustom, setShowCustom] = useState(false);
	const [customRate, setCustomRate] = useState(3);

	const updateRate = (event) => {
		const selectedValue = event.target.value;
		setDeductRate(selectedValue);
		setShowCustom(selectedValue === "Custom");
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
					<MenuItem value={3}>3%</MenuItem>
					<MenuItem value={4}>4%</MenuItem>
					<MenuItem value={6}>6%</MenuItem>
					<MenuItem value={8}>8%</MenuItem>
					<MenuItem value={10}>10%</MenuItem>
					<MenuItem value="Custom">
						<em>Custom</em>
					</MenuItem>
				</Select>
			</FormControl>}
			{showCustom && (
				<TextField
          variant="outlined"
          label="Custom"
					size="small"
					className="txt-custom-kiwisaver"
          InputProps={{
            endAdornment: <InputAdornment>%</InputAdornment>,
						inputComponent: NumberFormatCustom,
          }}
        />
			)}
		</>
	)
}

export default KiwiSaver