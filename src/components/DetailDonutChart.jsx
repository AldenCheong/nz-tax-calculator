import { Doughnut } from "react-chartjs-2";

const styles = {
	donutChart: {
		width: 400,
		height: 400,
	},
};

const DetailDonutChart = ({ chartData }) => {
	let labels = [];
	let annuallies = [];
	let percentages = [];
	let colors = [];
	chartData.forEach((row) => {
		if (row.variable === "Gross Pay") return;
		labels.push(row.variable);
		annuallies.push(row.annually);
		percentages.push(row.percentage);
		colors.push(
			row.variable === "Take Home Pay" ? "lightskyblue" : "lightpink"
		);
	});

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
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} (${percentages[tooltipItem.dataIndex]})`,
        },
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
