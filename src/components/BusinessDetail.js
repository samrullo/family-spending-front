import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BusinessDetail = () => {
  const { businessId } = useParams();

  return (
    <>
      <p>Business {businessId}</p>
      <ul>
        <li>
            <Link className="btn btn-primary" to={`/asset_account_names/${businessId}`}>Asset account names</Link>
        </li>
      </ul>
    </>
  );
};

export default BusinessDetail;
