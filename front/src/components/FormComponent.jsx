function FormComponent({
  period,
  setPeriod,
  timePeriod,
  setTimePeriod,
  privateIP,
  setPrivateIP,
  setLoad,
}) {
  const handleLoad = (e) => {
    e.preventDefault();
    setLoad(true); 
  };

  return (
    <form onSubmit={handleLoad}>
      <label htmlFor="timePeriod">Choose time period: </label>
      <select
        name="timePeriod"
        id="timePeriod"
        value={timePeriod}
        onChange={(e) => setTimePeriod(Number(e.target.value))}
      >
        <option value="86400000">Last day</option>
        <option value="604800000">Last week</option>
        <option value="2628000000">Last 30 days</option>
        <option value="15770000000">Last 6 months</option>
        <option value="31540000000">Last year</option>
      </select>
      <br />
      <label htmlFor="period">Period: </label>
      <input
        type="number"
        id="period"
        name="period"
        value={period}
        onChange={(e) => setPeriod(Number(e.target.value))}
      />
      <br />
      <label htmlFor="privateIP">Private IP: </label>
      <input
        type="text"
        id="privateIP"
        name="privateIP"
        value={privateIP}
        onChange={(e) => setPrivateIP(e.target.value)}
      />
      <br />
      <button type="submit">Load</button>
    </form>
  );
}

export default FormComponent;
