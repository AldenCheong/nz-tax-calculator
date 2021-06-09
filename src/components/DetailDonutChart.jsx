import { Doughnut } from "react-chartjs-2";

const styles = {
	donutChart: {
		width: 400,
		height: 400,
	},
};

const DetailDonutChart = ({ data }) => {
  let labels = []
  let annuallies = []
  let colors = []
  data.forEach((row) => {
    if (row.variable === "Gross Pay") return;
    labels.push(row.variable)
    annuallies.push(row.annually)
    colors.push(row.variable === "Take Home Pay" ? "lightskyblue" : "lightpink")
  })

	const processedData = {
		labels: labels,
		datasets: [
			{
				data: annuallies,
				backgroundColor: colors,
				hoverOffset: 5,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
		layout: {
			padding: {
				left: 20,
				right: 20,
				top: 20,
				bottom: 20,
			},
		},
	};

	return (
		<div style={styles.donutChart}>
			<Doughnut data={processedData} options={options} />
		</div>
	);
};

export default DetailDonutChart;
