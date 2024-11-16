import { useState, useEffect } from "react";
import Main from "./components/Main";

function App() {
  const [currencyData, setCurrencyData] = useState(null); // State to hold currency data
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("BGN");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const CACHE_KEY = "currencyData";
  const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24hrs in milliseconds

  useEffect(() => {
    async function fetchApiData() {
      const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
      const URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new error(`HTTP error! ${response.status}`);
        }
        const apiData = await response.json();
        console.log(`Fetched API data: ${apiData.data}`);

        setCurrencyData(apiData.data); // Set currency data in state
        setCurrencies(Object.keys(apiData.data));
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: apiData.data, timestamp: Date.now() })
        );
      } catch (error) {
        console.log(error);
      }
    }
    function loadCachedData() {
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRY) {
        console.log("Using cached data.");
        setCurrencyData(cachedData.data);
        setCurrencies(Object.keys(cachedData.data));
      } else {
        console.log(
          "Cached data is expired or not available, fetching new data"
        );
        localStorage.removeItem(CACHE_KEY);
        fetchApiData();
      }
    }
    // fetchApiData();
    loadCachedData();
  }, []);

  const handleConvert = () => {
    // console.log("Input amount:", amount);
    if (currencyData) {
      const fromRate = currencyData[fromCurrency];
      const toRate = currencyData[toCurrency];
      const result = (amount * toRate) / fromRate;
      setConvertedAmount(result.toFixed(2));
    }
  };

  return (
    <>
      <div className="currency-converter">
        <h1>Currency Converter</h1>
        <div className="from-currency-div">
          <label htmlFor="from-currency">From:</label>
          <select
            id="from-currency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="to-currency-div">
          <label htmlFor="to-currency">To:</label>
          <select
            id="to-currency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="amount-div">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter an amount"
          />
        </div>
        <button onClick={handleConvert}>Convert</button>
        {convertedAmount !== null && (
          <div className="result">
            <h2>
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </h2>
          </div>
        )}
        <Main data={currencyData} />
      </div>
    </>
  );
}

export default App;

// data coming from API
// {
//   "data": {
//       "AUD": 1.540470307,
//       "BGN": 1.8357802287,
//       "BRL": 5.8081610936,
//       "CAD": 1.3995102309,
//       "CHF": 0.8858101666,
//       "CNY": 7.2246613507,
//       "CZK": 23.9095047599,
//       "DKK": 7.0603212673,
//       "EUR": 0.9465901872,
//       ....

//   }
