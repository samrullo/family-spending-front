import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BusinessDetail = () => {
  const { businessId } = useParams();

  return (
    <>
      <p>Business {businessId}</p>
      <ul className="list-group">
        <li className="list-group-item">
          <Link
            className="btn btn-primary"
            to={`/asset_account_names/${businessId}`}
          >
            Asset account names
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="btn btn-primary" to={`/income_names/${businessId}`}>
            Income names
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="btn btn-primary" to={`/spending_names/${businessId}`}>Spending Names</Link>
        </li>
        <li className="list-group-item">
          <Link className="btn btn-primary" to={`/business_balances/${businessId}`}>Business Balances</Link>
        </li>
        <li className="list-group-item">
          <Link className="btn btn-primary" to={`/businesses`}>Back to businesses</Link>
        </li>
      </ul>
    </>
  );
};

export default BusinessDetail;
