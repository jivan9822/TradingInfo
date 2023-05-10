import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TradingInfo() {
  const [tradingData, setTradingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTradingData = async () => {
      try {
        const response = await axios.get(
          'https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=0w1W91Hnq5nPepj4d5nz7CzDJDbIp7ZT'
        );
        setTradingData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchTradingData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          {tradingData.map((trade, ind) => (
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
    </div>
  );
}
export default TradingInfo;
