import { Switch, FormControl, FormControlLabel, Select, MenuItem, InputLabel } from '@material-ui/core';

const KiwiSaver = ({ checked, onToggle, setRate }) => {
	let rate = 3;  
	const setDeductRate = (event) => {
		rate = event.target.value;
		setRate(event.target.value);
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
				<Select className="select" value={rate} label="KiwiSaver%" /*onChange={setDeductRate}*/>
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