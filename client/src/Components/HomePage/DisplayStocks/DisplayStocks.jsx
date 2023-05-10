import { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './DisplayStocks.module.css';

const DisplayStocks = () => {
  const tradingData = useSelector((state) => state.stock.stocks);
  const [numResults, setNumResults] = useState(100); // set initial number of results to display

  const handleShowMoreResults = () => {
    setNumResults(numResults + 100); // increment number of results to display by 100
  };

  return (
    <div>
      <h2>Trading Information</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>ProductId</th>
            <th>Price</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {tradingData.slice(0, numResults).map((trade, ind) => (
            <tr key={ind}>
              <td>{new Date(trade.t).toLocaleString()}</td>
              <td>{trade.T}</td>
              <td>{trade.vw}</td>
              <td>{trade.o}</td>
              <td>{trade.h}</td>
              <td>{trade.l}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleShowMoreResults}>Show more</button>
    </div>
  );
};

export default DisplayStocks;
