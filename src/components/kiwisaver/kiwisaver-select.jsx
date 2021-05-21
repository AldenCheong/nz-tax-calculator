import { Switch, FormControl, FormControlLabel, Select, MenuItem, InputLabel } from '@material-ui/core';

const KiwiSaver = ({}) => {
	return (
		<>
			<FormControlLabel 
				control={(
					<Switch name="kiwiSaver" color="primary" />   
				)}
				label="KiwiSaver"
			/>
			<FormControl variant="outlined" size="small">
				<InputLabel id="select-kiwisaver-percentage">KiwiSaver%</InputLabel> 
				<Select className="select" labelId="select-kiwisaver-percentage" label="KiwiSaver%">
					<MenuItem value="">
						<em>Opt out</em>
					</MenuItem>
					<MenuItem value={3}>3%</MenuItem>
					<MenuItem value={4}>4%</MenuItem>
					<MenuItem value={6}>6%</MenuItem>
					<MenuItem value={8}>8%</MenuItem>
					<MenuItem value={10}>10%</MenuItem>
					<MenuItem value="Custom">
						<em>Custom</em>
					</MenuItem>
				</Select>
			</FormControl>
		</>
	)
}

export default KiwiSaver