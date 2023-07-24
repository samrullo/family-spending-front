import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  API_BASE_URL,
  ASSET_ACCOUNT_NAMES_ENDPOINT,
  BUSINESS_ASSET_ACCOUNT_NAMES_FUNC,
  BUSINESSES_ENDPOINT,
} from "../apiConfig";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../DataTable";

const AssetAccountName = () => {
  const { businessId } = useParams();
  const business_asset_account_names_endpoint =
    BUSINESS_ASSET_ACCOUNT_NAMES_FUNC(businessId);
  const [assetAccountNames, setAssetAccountNames] = useState([]);
  const [business, setBusiness] = useState({});

  const [newAssetAccountName, setNewAssetAccountName] = useState();
  const [newAssetAccountDescription, setNewAssetAccountDescription] =
    useState();

  useEffect(() => {
    if (assetAccountNames.length === 0) {
      fetchAssetAccountNames();
    }

    if (Object.keys(business).length === 0) {
      fetchBusiness();
    }
  }, []);

  const fetchAssetAccountNames = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${business_asset_account_names_endpoint}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setAssetAccountNames(response.data);
      console.log(`fetched ${assetAccountNames.length} asset account names`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBusiness = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${BUSINESSES_ENDPOINT}${businessId}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setBusiness(response.data);
    } catch (error) {
      console.log(
        `error while fetching business by business id ${businessId} : ${error}`
      );
    }
  };

  const createAssetAccountName = async (name, description) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${ASSET_ACCOUNT_NAMES_ENDPOINT}`,
        { business: businessId, name: name, description: description },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );

      console.log(`successfully created ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.log(`error while creating a new asset account name : ${error}`);
    }
  };

  const handleNewAssetAccountName = async (e) => {
    e.preventDefault();
    await createAssetAccountName(
      newAssetAccountName,
      newAssetAccountDescription
    );

    await fetchAssetAccountNames();
  };

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
        <form className="form" onSubmit={handleNewAssetAccountName}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={newAssetAccountName}
              onChange={(e) => setNewAssetAccountName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              value={newAssetAccountDescription}
              onChange={(e) => {
                setNewAssetAccountDescription(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-dark mt-3">Submit</button>
          </div>
        </form>
      </div>
      {assetAccountNames.length === 0 ? (
        <p>No asset account names</p>
      ) : (
        <DataTable
          data={assetAccountNames.map((accountName) => {
            return {
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
