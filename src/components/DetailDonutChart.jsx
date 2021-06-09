import { Doughnut } from "react-chartjs-2";

const styles = {
	donutChart: {
		width: 400,
		height: 400,
	},
};

const DetailDonutChart = () => {
	const data = {
		labels: ["Negative", "Neutral", "Positive"],
		datasets: [
			{
				data: [300, 50, 100],
				backgroundColor: ["lightpink", "lightskyblue", "palegreen"],
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
			<Doughnut data={data} options={options} />
		</div>
	);
};

export default DetailDonutChart;
