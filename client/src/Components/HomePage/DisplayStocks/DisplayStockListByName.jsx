const DisplayStockListByName = (props) => {
  return (
    <div>
      <h2>StockListByName</h2>
      <table>
        <thead>
          <tr>
            <th>TickerId</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((trade, ind) => (
            <tr key={ind}>
              <td
                onClick={() => props.sendId(trade.ticker)}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                {trade.ticker}
              </td>
              <td>{trade.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DisplayStockListByName;
