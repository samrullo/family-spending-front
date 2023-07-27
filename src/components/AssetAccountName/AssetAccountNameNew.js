import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, ASSET_ACCOUNT_NAMES_ENDPOINT } from "../apiConfig";

const AssetAccountNameNew = () => {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [newAssetAccountName, setNewAssetAccountName] = useState("");
  const [newAssetAccountDescription, setNewAssetAccountDescription] =
    useState("");

  const createAssetAccountName = async (name, description) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${ASSET_ACCOUNT_NAMES_ENDPOINT}`,
        { business: businessId, name: name, description: description },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );

      console.log(`successfully created ${JSON.stringify(response.data)}`);
      navigate(`/asset_account_names/${businessId}`, {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
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
  };
  return (
    <>
      <div>
        <p>Create new Asset Account Name</p>
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

export default AssetAccountNameNew;
