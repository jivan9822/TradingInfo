import classes from './CompanyDetails.module.css';

const CompanyDetails = ({ company }) => {
  return (
    <div className={classes.companyDetails}>
      <h2>{company.name}</h2>
      <table>
        <tbody>
          <tr>
            <th>Ticker</th>
            <td>{company.ticker}</td>
          </tr>
          <tr>
            <th>Market Cap</th>
            <td>{company.market_cap}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{company.phone_number}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              {company.address?.address1}, {company.address?.city},{' '}
              {company.address?.state} {company.address?.postal_code}
            </td>
          </tr>
        </tbody>
      </table>
      <p className={classes.description}>{company.description}</p>
    </div>
  );
};

export default CompanyDetails;
