import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, INCOME_NAMES_ENDPOINT } from "../APIUtils/ApiEndpoints";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { fetchAssetAccountNames } from "../APIUtils/fetch_data";
import { createResource } from "../APIUtils/create_data";

const IncomeNameNew = () => {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [newIncomeName, setNewIncomeName] = useState("");
  const [newIncomeDescription, setNewIncomeDescription] = useState("");
  const [newIncomeDefaultAmount, setNewIncomeDefaultAmount] = useState(0);
  const [assetAccountNames, setAssetAccountNames] = useState([]);
  const [newAssetAccountName, setNewAssetAccountName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const assetAccountNames = await fetchAssetAccountNames(businessId);
      setAssetAccountNames(assetAccountNames);
    };

    fetchData();
  }, []);

  console.log(`we have ${assetAccountNames.length} asset account names`);
  const assetAccountNameOptions = assetAccountNames.map((assetAccountName) => {
    return { value: assetAccountName.id, label: assetAccountName.name };
  });

  const createIncomeName = async (
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
      `${API_BASE_URL}${INCOME_NAMES_ENDPOINT}`,
      new_payload,
      "income name"
    );
    navigate(`/income_names/${businessId}`, {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
  };

  const handleNewIncomeName = async (e) => {
    e.preventDefault();
    await createIncomeName(
      newIncomeName,
      newIncomeDescription,
      newIncomeDefaultAmount,
      newAssetAccountName.value
    );
  };

  const formFields = [
    {
      fieldType: "text",
      fieldLabel: "Name",
      fieldValue: newIncomeName,
      setFieldValue: setNewIncomeName,
    },
    {
      fieldType: "text",
      fieldLabel: "Description",
      fieldValue: newIncomeDescription,
      setFieldValue: setNewIncomeDescription,
    },
    {
      fieldType: "number",
      fieldLabel: "Default Amount",
      fieldValue: newIncomeDefaultAmount,
      setFieldValue: setNewIncomeDefaultAmount,
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
      handleNewData={handleNewIncomeName}
    />
  );
};

export default IncomeNameNew;
