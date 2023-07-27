import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../DataTable";
import { fetchAssetAccountNames, fetchBusiness } from "../APIUtils/fetch_data";

const AssetAccountName = () => {
  const { businessId } = useParams();

  const [assetAccountNames, setAssetAccountNames] = useState([]);
  const [business, setBusiness] = useState({});

  let { state = {} } = useLocation();
  let { timestamp } = state ?? {};

  useEffect(() => {
    const fetchData = async () => {
      const asset_account_names = await fetchAssetAccountNames(businessId);
      console.log(
        `I got asset_account_names inside AssetAccountName ${asset_account_names.length}`
      );
      setAssetAccountNames(asset_account_names);

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
      navigate(`/asset_account_names/${businessId}/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="container bp-5">
        <p>
          Asset Account Names for business id {businessId} : {business.name}
        </p>
        <Link
          className="btn btn-primary"
          to={`/asset_account_names/${businessId}/new`}
        >
          New asset account name
        </Link>

        <Outlet />
        <p>selected row data is {JSON.stringify(selectedRowData)}</p>
      </div>
      {assetAccountNames.length === 0 ? (
        <p>No asset account names</p>
      ) : (
        <DataTable
          onRowClick={handleRowClick}
          data={assetAccountNames.map((accountName) => {
            return {
              id: accountName.id,
              name: accountName.name,
              description: accountName.description,
            };
          })}
        />
      )}
    </>
  );
};

export default AssetAccountName;
