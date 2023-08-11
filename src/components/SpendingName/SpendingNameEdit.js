import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  SPENDING_NAMES_ENDPOINT,
} from "../APIUtils/ApiEndpoints";
import {
  fetchSpendingName,
  fetchAssetAccountNames,
} from "../APIUtils/fetch_data";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import {
  updateResource,
  deleteResource,
  createResource,
} from "../APIUtils/create_data";

const SpendingNameEdit = () => {
  const navigate = useNavigate();
  const { businessId, spendingNameId } = useParams();
  const [newSpendingName, setNewSpendingName] = useState("");
  const [newSpendingDescription, setNewSpendingDescription] = useState("");
  const [newAssetAccountName, setNewAssetAccountName] = useState("");
  const [assetAccountNames, setAssetAccountNames] = useState([]);

  const [spendingName, setSpendingName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const spendingName = await fetchSpendingName(spendingNameId);
      setSpendingName(spendingName);
    };

    fetchData();
  }, [spendingNameId]);

  useEffect(() => {
    if (spendingName) {
      setNewSpendingName(spendingName.name);
      setNewSpendingDescription(spendingName.description);
      setNewAssetAccountName({
        value: spendingName.associated_asset_account_name,
        label: spendingName.asset_account_name,
      });
    }
  }, [spendingName]);

  useEffect(() => {
    const fetchData = async () => {
      const assetAccountNames = await fetchAssetAccountNames(businessId);
      setAssetAccountNames(assetAccountNames);
    };

    fetchData();
  }, []);

  const assetAccountNameOptions = assetAccountNames.map((assetAccountName) => {
    return { value: assetAccountName.id, label: assetAccountName.name };
  });

  const editSpendingName = async (name, description, assetAccountNameId) => {
    const new_payload = {
      id: spendingNameId,
      business: businessId,
      name: name,
      description: description,
      associated_asset_account_name: assetAccountNameId,
    };
    await updateResource(
      `${API_BASE_URL}${SPENDING_NAMES_ENDPOINT}${spendingNameId}/`,
      new_payload,
      "spending name"
    );
    navigate(`/spending_names/${businessId}`, {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
  };

  const handleEditSpendingName = async (e) => {
    e.preventDefault();
    await editSpendingName(
      newSpendingName,
      newSpendingDescription,
      newAssetAccountName.value
    );
  };

  const deleteSpendingName = async () => {
    await deleteResource(
      `${API_BASE_URL}${SPENDING_NAMES_ENDPOINT}${spendingNameId}`,
      "spending name"
    );
    navigate(`/spending_names/${businessId}`, {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
  };

  const handleDeleteSpendingName = () => {
    deleteSpendingName();
  };

  const formFields = [
    {
      fieldType: "text",
      fieldLabel: "Name",
      fieldValue: newSpendingName,
      setFieldValue: setNewSpendingName,
    },
    {
      fieldType: "text",
      fieldLabel: "Description",
      fieldValue: newSpendingDescription,
      setFieldValue: setNewSpendingDescription,
    },
    {
      fieldType: "select",
      fieldLabel: "Asset Account Name",
      fieldValue: newAssetAccountName,
      setFieldValue: setNewAssetAccountName,
      selectOptions: assetAccountNameOptions,
    },
  ];

  return (
    <GenericEditData
      title={`Edit asset account name ${spendingNameId}`}
      formFields={formFields}
      handleEdit={handleEditSpendingName}
      handleDelete={handleDeleteSpendingName}
    />
  );
};

export default SpendingNameEdit;
