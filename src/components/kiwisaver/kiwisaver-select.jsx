import { useState } from 'react';
import { Switch, FormControl, FormControlLabel, Select, MenuItem, InputLabel } from '@material-ui/core';

const KiwiSaver = ({ checked, onToggle, setRate }) => {
	const [deductRate, setDeductRate] = useState(3);   
	const [showCustom, setShowCustom] = useState(false);

	const updateRate = (event) => {
		setDeductRate(event.target.value);
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
				<Select className="select" value={deductRate} label="KiwiSaver%" onChange={updateRate}>
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
		</>
	)
}

export default KiwiSaver