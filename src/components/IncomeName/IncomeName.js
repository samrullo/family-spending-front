import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { fetchIncomeNames, fetchBusiness } from "../APIUtils/fetch_data";

const IncomeName = () => {
  const { businessId } = useParams();

  const [incomeNames, setIncomeNames] = useState([]);
  const [business, setBusiness] = useState({});

  let { state = {} } = useLocation();
  let { timestamp } = state ?? {};

  useEffect(() => {
    const fetchData = async () => {
      const income_names = await fetchIncomeNames(businessId);
      console.log(
        `I got income_names inside IncomeName ${income_names.length}`
      );
      setIncomeNames(income_names);

      if (Object.keys(business).length === 0) {
        const business = await fetchBusiness(businessId);
        setBusiness(business);
      }
    };

    fetchData();
  }, [timestamp]);

  const navigate = useNavigate();

  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  useEffect(() => {
    if (selectedRowData) {
      navigate(`/income_names/${businessId}/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  return (
    <>
      <div className="container bp-5">
        <p>
          Income Names for business id {businessId} : {business.name}
        </p>
        <Link
          className="btn btn-primary"
          to={`/businesses/detail/${businessId}`}
        >
          Back to business detail
        </Link>

        <Link
          className="btn btn-primary"
          to={`/income_names/${businessId}/new`}
        >
          New income name
        </Link>

        <Outlet />
      </div>
      {incomeNames.length === 0 ? (
        <p>No income names</p>
      ) : (
        <DataTable
          onRowClick={handleRowClick}
          hiddenColumns={["id"]}
          width_pct={100}
          data={incomeNames.map((incomeName) => {
            return {
              id: incomeName.id,
              name: incomeName.name,
              description: incomeName.description,
              account_name: incomeName.asset_account_name,
            };
          })}
        />
      )}
    </>
  );
};

export default IncomeName;
