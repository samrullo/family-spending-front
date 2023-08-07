import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import DataTable from "../DataTable";
import {
  fetchBusinessAdateAssetAccounts,
  fetchBusiness,
} from "../APIUtils/fetch_data";

const AssetAccount = ({ businessId, adate,timestamp }) => {
  console.log(`received props business id ${businessId} and adate ${adate}`);
  const navigate = useNavigate();
  const [business, setBusiness] = useState();
  const [assetAccounts, setAssetAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setAssetAccounts(
        await fetchBusinessAdateAssetAccounts(businessId, adate)
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
        `/asset_account/${businessId}/${adate}/edit/${selectedRowData.id}`
      );
    }
  }, [selectedRowData]);

  return (
    <>
      <h2>
        Asset Accounts as of {adate} for business {businessId}
      </h2>
      <Link
        className="btn btn-primary"
        to={`/asset_account/${businessId}/${adate}/new`}
      >
        New Asset Account
      </Link>

      {assetAccounts.length !== 0 ? (
        <DataTable
          data={assetAccounts}
          hiddenColumns={[
            "id",
            "business_name",
            "created_at",
            "modified_at",
            "asset_account_name",
            "business",
            "modified_by",
          ]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      ) : (
        <p>no asset accounts</p>
      )}
    </>
  );
};

export default AssetAccount;
