import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  ASSET_ACCOUNT_NAMES_ENDPOINT,
} from "../APIUtils/ApiEndpoints";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { createResource } from "../APIUtils/create_data";

const AssetAccountNameNew = () => {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [newAssetAccountName, setNewAssetAccountName] = useState("");
  const [newAssetAccountDescription, setNewAssetAccountDescription] =
    useState("");

  const createAssetAccountName = async (name, description) => {
    const new_payload = {
      business: businessId,
      name: name,
      description: description,
    };
    await createResource(
      `${API_BASE_URL}${ASSET_ACCOUNT_NAMES_ENDPOINT}`,
      new_payload,
      "asset account name"
    );
    navigate(`/asset_account_names/${businessId}`, {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
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
