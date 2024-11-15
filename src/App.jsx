import { useState, useEffect } from "react";
import Main from "./components/Main";

function App() {
  const [data, setData] = useState(null); // State to hold currency data

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
        console.log(`Api data: ${apiData}`);
        setData(apiData.data); // Set currency data in state
      } catch (error) {
        console.log(error);
      }
    }
    fetchApiData();
  }, []);

  return (
    <>
      <Main data={data} />
    </>
  );
}

export default App;
