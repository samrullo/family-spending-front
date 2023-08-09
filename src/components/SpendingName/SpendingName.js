import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { fetchSpendingNames, fetchBusiness } from "../APIUtils/fetch_data";

const SpendingName = () => {
  const { businessId } = useParams();

  const [spendingNames, setSpendingNames] = useState([]);
  const [business, setBusiness] = useState({});

  let { state = {} } = useLocation();
  let { timestamp } = state ?? {};

  useEffect(() => {
    const fetchData = async () => {
      const spending_names = await fetchSpendingNames(businessId);
      console.log(
        `I got spending_names inside SpendingName ${spending_names.length}`
      );
      setSpendingNames(spending_names);

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
      navigate(`/spending_names/${businessId}/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  return (
    <>
      <div className="container bp-5">
        <p>
          Spending Names for business id {businessId} : {business.name}
        </p>
        <Link
          className="btn btn-primary"
          to={`/businesses/detail/${businessId}`}
        >
          Back to business detail
        </Link>
        <Link
          className="btn btn-primary"
          to={`/spending_names/${businessId}/new`}
        >
          New spending name
        </Link>

        <Outlet />
        
      </div>
      {spendingNames.length === 0 ? (
        <p>No spending names</p>
      ) : (
        <DataTable
          onRowClick={handleRowClick}
          hiddenColumns={["id"]}
          width_pct={100}
          data={spendingNames.map((spendingName) => {
            return {
              id: spendingName.id,
              name: spendingName.name,
              description: spendingName.description,
              account_name : spendingName.asset_account_name
            };
          })}
        />
      )}
    </>
  );
};

export default SpendingName;
