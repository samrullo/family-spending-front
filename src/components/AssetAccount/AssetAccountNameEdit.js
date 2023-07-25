import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, ASSET_ACCOUNT_NAMES_ENDPOINT } from "../apiConfig";
import { fetchAssetAccountName } from "../APIUtils/fetch_data";

const AssetAccountNameEdit = () => {
  const navigate = useNavigate();
  const { businessId, assetAccountNameId } = useParams();
  const [newAssetAccountName, setNewAssetAccountName] = useState("");
  const [newAssetAccountDescription, setNewAssetAccountDescription] =
    useState("");

  const [assetAccountName, setAssetAccountName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const assetAccountName = await fetchAssetAccountName(assetAccountNameId);
      setAssetAccountName(assetAccountName);
    };

    fetchData();
  }, [assetAccountNameId]);

  useEffect(() => {
    if (assetAccountName) {
      setNewAssetAccountName(assetAccountName.name);
      setNewAssetAccountDescription(assetAccountName.description);
    }
  }, [assetAccountName]);

  const editAssetAccountName = async (name, description) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}${ASSET_ACCOUNT_NAMES_ENDPOINT}${assetAccountNameId}/`,
        {
          id: assetAccountNameId,
          business: businessId,
          name: name,
          description: description,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );

      console.log(`successfully edited ${JSON.stringify(response.data)}`);
      navigate(`/asset_account_names/${businessId}`, {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (error) {
      console.log(`error while editing a new asset account name : ${error}`);
    }
  };

  const handleNewAssetAccountName = async (e) => {
    e.preventDefault();
    await editAssetAccountName(newAssetAccountName, newAssetAccountDescription);
  };
  return (
    <>
      <div>
        <p>Edit Asset Account Name with id {assetAccountNameId}</p>
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
    </>
  );
};

export default AssetAccountNameEdit;
