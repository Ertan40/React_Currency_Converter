export default function Main(props) {
  const { data, toCurrency } = props;

  return (
    <div className="Main component">
      <div>
        <h3>Currency Exchange Rate</h3>
        <p className="currency-info">
          {" "}
          {toCurrency} rate: {data?.[toCurrency] || "Not available"}
        </p>
      </div>
    </div>
  );
}
