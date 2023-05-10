import { useState } from 'react';
import classes from './DisplayOneStockDetails.module.css';
import CompanyDetails from './CompanyDetails';
import { useSelector } from 'react-redux';

const DisplayOneStockDetails = ({ stock }) => {
  const [showCompanyDetails, setCompanyDetails] = useState(false);
  const [text, setText] = useState('Company Details');
  const company = useSelector((state) => state.stock.stockDetail);
  const onClickHandler = (e) => {
    e.preventDefault();
    if (text === 'Company Details') {
      setCompanyDetails(true);
      setText('Hide Details');
    } else {
      setCompanyDetails(false);
      setText('Company Details');
    }
  };
  return (
    <div className={classes.stockDetails}>
      <button className={classes.button} onClick={onClickHandler}>
        {text}
      </button>
      {showCompanyDetails && company && <CompanyDetails company={company} />}
      <h2>Stock Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Ticker</td>
            <td>{stock.T}</td>
          </tr>
          <tr>
            <td>Current Price</td>
            <td>{stock.c}</td>
          </tr>
          <tr>
            <td>High</td>
            <td>{stock.h}</td>
          </tr>
          <tr>
            <td>Low</td>
            <td>{stock.l}</td>
          </tr>
          <tr>
            <td>Number of Shares</td>
            <td>{stock.n}</td>
          </tr>
          <tr>
            <td>Open Price</td>
            <td>{stock.o}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{new Date(stock.t).toLocaleString()}</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{stock.v}</td>
          </tr>
          <tr>
            <td>Volume Weighted Average Price</td>
            <td>{stock.vw}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DisplayOneStockDetails;
