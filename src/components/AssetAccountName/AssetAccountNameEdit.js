import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  ASSET_ACCOUNT_NAMES_ENDPOINT,
} from "../APIUtils/ApiEndpoints";
import { fetchAssetAccountName } from "../APIUtils/fetch_data";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { updateResource, deleteResource } from "../APIUtils/create_data";

const AssetAccountNameEdit = () => {
  const navigate = useNavigate();
  const { businessId, assetAccountNameId } = useParams();
  const [newAssetAccountName, setNewAssetAccountName] = useState("");
  const [newAssetAccountDescription, setNewAssetAccountDescription] =
    useState("");
  const [newAssetAccountDefaultAmount, setNewAssetAccountDefaultAmount] =
    useState(0);

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
      setNewAssetAccountDefaultAmount(assetAccountName.default_amount);
    }
  }, [assetAccountName]);

  const editAssetAccountName = async (name, description, defaultAmount) => {
    const new_payload = {
      id: assetAccountNameId,
      business: businessId,
      name: name,
      default_amount: defaultAmount,
      description: description,
    };
    await updateResource(
      `${API_BASE_URL}${ASSET_ACCOUNT_NAMES_ENDPOINT}${assetAccountNameId}/`,
      new_payload,
      "asset account name"
    );
    navigate(`/asset_account_names/${businessId}`, {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
  };

  const handleEditAssetAccountName = async (e) => {
    e.preventDefault();
    await editAssetAccountName(
      newAssetAccountName,
      newAssetAccountDescription,
      newAssetAccountDefaultAmount
    );
  };

  const deleteAssetAccountName = async () => {
    await deleteResource(
      `${API_BASE_URL}${ASSET_ACCOUNT_NAMES_ENDPOINT}${assetAccountNameId}`,
      "asset account name"
    );
    navigate(`/asset_account_names/${businessId}`, {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
  };

  const handleDeleteAssetAccountName = () => {
    deleteAssetAccountName();
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
    {
      fieldType: "number",
      fieldLabel: "Default Amount",
      fieldValue: newAssetAccountDefaultAmount,
      setFieldValue: setNewAssetAccountDefaultAmount,
    },
  ];

  return (
    <GenericEditData
      title={`Edit asset account name ${assetAccountNameId}`}
      formFields={formFields}
      handleEdit={handleEditAssetAccountName}
      handleDelete={handleDeleteAssetAccountName}
    />
  );
};

export default AssetAccountNameEdit;
