import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import DataTable from "../DataTable";
import {
  fetchBusinessAdateIncomes,  // Assuming you have a fetching function for incomes
  fetchBusiness,
} from "../APIUtils/fetch_data";

const Income = ({ businessId, adate,timestamp }) => {
  console.log(`received props business id ${businessId} and adate ${adate}`);
  const navigate = useNavigate();
  const [business, setBusiness] = useState();
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIncomes(
        await fetchBusinessAdateIncomes(businessId, adate)
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
        `/income/${businessId}/${adate}/edit/${selectedRowData.id}`
      );
    }
  }, [selectedRowData]);

  return (
    <>
      <h2>
        Incomes as of {adate} for business {businessId}
      </h2>
      <Link
        className="btn btn-primary"
        to={`/income/${businessId}/${adate}/new`}
      >
        New Income
      </Link>

      {incomes.length !== 0 ? (
        <DataTable
          data={incomes}
          hiddenColumns={[
            "id",
            "business_name",
            "created_at",
            "modified_at",
            "income_name",  // Assuming the column name might be 'income_name' for incomes
            "business",
            "modified_by",
          ]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      ) : (
        <p>no incomes</p>
      )}
    </>
  );
};

export default Income;
