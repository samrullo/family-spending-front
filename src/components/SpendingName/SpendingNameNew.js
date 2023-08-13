import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  SPENDING_NAMES_ENDPOINT,
} from "../APIUtils/ApiEndpoints";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { fetchAssetAccountNames } from "../APIUtils/fetch_data";
import { createResource } from "../APIUtils/create_data";

const SpendingNameNew = () => {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [newSpendingName, setNewSpendingName] = useState("");
  const [newSpendingDescription, setNewSpendingDescription] = useState("");
  const [newSpendingDefaultAmount, setNewSpendingDefaultAmount] = useState(0);
  const [assetAccountNames, setAssetAccountNames] = useState([]);
  const [newAssetAccountName, setNewAssetAccountName] = useState("");

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

  const createSpendingName = async (
    name,
    description,
    defaultAmount,
    assetAccountNameId
  ) => {
    const new_payload = {
      business: businessId,
      name: name,
      description: description,
      default_amount: defaultAmount,
      associated_asset_account_name: assetAccountNameId,
    };
    await createResource(
      `${API_BASE_URL}${SPENDING_NAMES_ENDPOINT}`,
      new_payload,
      "spending name"
    );
    navigate(`/spending_names/${businessId}`, {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
  };

  const handleNewSpendingName = async (e) => {
    e.preventDefault();
    await createSpendingName(
      newSpendingName,
      newSpendingDescription,
      newSpendingDefaultAmount,
      newAssetAccountName.value
    );
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
      fieldType: "number",
      fieldLabel: "Default Amount",
      fieldValue: newSpendingDefaultAmount,
      setFieldValue: setNewSpendingDefaultAmount,
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
    <GenericNewData
      title="New Income Name"
      formFields={formFields}
      handleNewData={handleNewSpendingName}
    />
  );
};

export default SpendingNameNew;
