const fetchConstants = async () => {
	const host = "https://my-json-server.typicode.com/aldencheong/nz-tax-calculator";
  const fetchTax = await fetch(host + "/tax-brackets");
  const fetchAcc = await fetch(host + "/acc-bracket");
  const fetchKiwiSaverRate = await fetch(host + "/kiwisaver-rate-option");
  const taxBracket = await fetchTax.json();
  const accBracket = await fetchAcc.json();
  const kiwiSaverRateOptions = await fetchKiwiSaverRate.json();
  return {
    taxBracket: taxBracket,
    accBracket: accBracket,
    kiwiSaverRateOptions: kiwiSaverRateOptions,
  }
};

export default fetchConstants