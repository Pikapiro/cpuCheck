import  { useState, useEffect } from "react";
import "./App.css";
import ChartComponent from "./components/ChartComponent";
import FormComponent from "./components/FormComponent";


function App() {
  const [dataAPI, setDataAPI] = useState([]);
  const [period, setPeriod] = useState();
  const [timePeriod, setTimePeriod] = useState(86400000);
  const [privateIP, setPrivateIP] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchDataAPI = async () => {
      if (!privateIP || !timePeriod || !period) {
        setErrorMsg("Please provide valid inputs.");
        return;
      }

      const url = `http://localhost:3300/api/metrics?privateIP=${privateIP}&timePeriod=${timePeriod}&period=${period}`;
      console.log("Requesting URL:", url);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        if (!data.Datapoints || data.Datapoints.length === 0) {
          setErrorMsg("No data available for the given parameters.");
          return;
        }

        const sortedData = data.Datapoints.sort(
          (a, b) => new Date(a.Timestamp) - new Date(b.Timestamp)
        );
        setDataAPI(
          sortedData.map((item) => ({
            x: new Date(item.Timestamp).toGMTString(),
            y: item.Average,
          }))
        );
        setErrorMsg("");
      } catch (error) {
        console.error("Error fetching metrics:", error.message);
        setErrorMsg(error.message);
      } 
    };

    if (load) {
      fetchDataAPI();
      setLoad(false); // Reset the load state after fetching
    }
  }, [load]);

  return (
    <div className="container">
      <FormComponent
        period={period}
        setPeriod={setPeriod}
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
        privateIP={privateIP}
        setPrivateIP={setPrivateIP}
        setLoad={setLoad}
      />
      {errorMsg && <p>{errorMsg}</p>}
  <ChartComponent dataAPI={dataAPI} />
    </div>
  );
}

export default App;
