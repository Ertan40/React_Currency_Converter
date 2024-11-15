export default function Main(props) {
  const { data } = props;

  return (
    <div className="Main component">
      <div>
        <h2>Currency info</h2>
        <p>Bulgarian Leva rate: {data?.BGN || "Not available"}</p>
      </div>
    </div>
  );
}
