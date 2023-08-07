import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, ASSET_ACCOUNT_NAMES_ENDPOINT } from "../APIUtils/ApiEndpoints";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { createResource } from "../APIUtils/create_data";

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

  const formFields = [
    {
      fieldType: "text",
      fieldLabel: "Name",
      fieldValue: newAssetAccountName,
      setFieldValue: setNewAssetAccountName,
    },
    {
      fieldType: "text",
      fieldLabel: "Description",
      fieldValue: newAssetAccountDescription,
      setFieldValue: setNewAssetAccountDescription,
    },
  ];

  return (
    <GenericNewData
      title="New Asset Account Name"
      formFields={formFields}
      handleNewData={handleNewAssetAccountName}
    />
  );
};

export default AssetAccountNameNew;
