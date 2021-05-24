export default function calculateDeductables(initialAmount, bracket, kiwiSaver) {
	if (initialAmount <= 0) return;

	const calculateTax = () => {
		const taxBrackets = bracket.tax;
		let remainder = initialAmount;
		let taxAmount = 0;
		for (let i = 0; i < taxBrackets.length; i++) {
			const { threshold, rate } = taxBrackets[i];
			const previousThreshold = i > 0 && taxBrackets[i - 1].threshold;

			if (initialAmount <= threshold || i === taxBrackets.length - 1) {
				if (previousThreshold) remainder -= previousThreshold;
				taxAmount += remainder * (rate / 100);
				break;
			}

			const currentBracket = previousThreshold
				? threshold - previousThreshold
				: threshold;
			taxAmount += currentBracket * (rate / 100);
		}

		return taxAmount.toFixed(2);
	};

	const calculateAcc = () => {
		const { threshold, rate } = bracket.acc;
		return (
			(initialAmount >= threshold ? threshold : initialAmount) *
			(rate / 100)
		).toFixed(2);
	};

	const calculateKiwiSaver = () => {
		const { include, rate } = kiwiSaver;
		if (!include) return 0;
		return ((initialAmount * rate) / 100).toFixed(2);
	};

	return {
		tax: calculateTax(),
		acc: calculateAcc(),
		kiwi: calculateKiwiSaver(),
	};
};
