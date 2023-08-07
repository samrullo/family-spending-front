import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import DataTable from "../DataTable";
import {
  fetchBusinessAdateSpendings,  // Assuming you have a fetching function for spendings
  fetchBusiness,
} from "../APIUtils/fetch_data";

const Spending = ({ businessId, adate, timestamp }) => {
  console.log(`received props business id ${businessId} and adate ${adate}`);
  
  const navigate = useNavigate();
  const [business, setBusiness] = useState();
  const [spendings, setSpendings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setSpendings(
        await fetchBusinessAdateSpendings(businessId, adate)
      );

      setBusiness(await fetchBusiness(businessId));
    };
    fetchData();
  }, [timestamp]);

  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  useEffect(() => {
    if (selectedRowData) {
      navigate(
        `/spending/${businessId}/${adate}/edit/${selectedRowData.id}`
      );
    }
  }, [selectedRowData]);

  return (
    <>
      <h2>
        Spendings as of {adate} for business {businessId}
      </h2>
      <Link
        className="btn btn-primary"
        to={`/spending/${businessId}/${adate}/new`}
      >
        New Spending
      </Link>

      {spendings.length !== 0 ? (
        <DataTable
          data={spendings}
          hiddenColumns={[
            "id",
            "business_name",
            "created_at",
            "modified_at",
            "spending_name",  // Assuming the column name might be 'spending_name' for spendings
            "business",
            "modified_by",
          ]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      ) : (
        <p>no spendings</p>
      )}
    </>
  );
};

export default Spending;
