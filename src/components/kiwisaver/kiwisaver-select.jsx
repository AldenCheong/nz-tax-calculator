import { useState } from 'react';
import { Switch, FormControl, FormControlLabel, Select, MenuItem, InputLabel, TextField, InputAdornment } from '@material-ui/core';

const KiwiSaver = ({ checked, onToggle, setRate }) => {
	const [deductRate, setDeductRate] = useState(3);   
	const [showCustom, setShowCustom] = useState(true);

	const updateRate = (event) => {
		setDeductRate(event.target.value);
	}

	const validateCustomField = (event) => {
		const inputValue = event.target.value;
		if (Number(inputValue) === NaN) {
			event.target.value = 0
		}
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
          label="Custom"
					size="small"
					className="txt-custom-kiwisaver"
          InputProps={{
            endAdornment: <InputAdornment>%</InputAdornment>,
          }}
          variant="outlined"
					onChange={validateCustomField}
        />
			)}
		</>
	)
}

export default KiwiSaver