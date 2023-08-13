import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, INCOME_NAMES_ENDPOINT } from "../APIUtils/ApiEndpoints";
import {
  fetchIncomeName,
  fetchAssetAccountNames,
} from "../APIUtils/fetch_data";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { updateResource, deleteResource } from "../APIUtils/create_data";

const IncomeNameEdit = () => {
  const navigate = useNavigate();
  const { businessId, incomeNameId } = useParams();
  const [newIncomeName, setNewIncomeName] = useState("");
  const [newIncomeDescription, setNewIncomeDescription] = useState("");
  const [newIncomeDefaultAmount, setNewIncomeDefaultAmount] = useState(0);
  const [newAssetAccountName, setNewAssetAccountName] = useState("");
  const [assetAccountNames, setAssetAccountNames] = useState([]);

  const [incomeName, setIncomeName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const IncomeName = await fetchIncomeName(incomeNameId);
      setIncomeName(IncomeName);
    };

    fetchData();
  }, [incomeNameId]);

  useEffect(() => {
    if (incomeName) {
      setNewIncomeName(incomeName.name);
      setNewIncomeDescription(incomeName.description);
      setNewIncomeDefaultAmount(incomeName.default_amount);
      setNewAssetAccountName({
        value: incomeName.associated_asset_account_name,
        label: incomeName.asset_account_name,
      });
    }
  }, [incomeName]);

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

  const editIncomeName = async (
    name,
    description,
    defaultAmount,
    assetAccountNameId
  ) => {
    const new_payload = {
      id: incomeNameId,
      business: businessId,
      name: name,
      description: description,
      default_amount: defaultAmount,
      associated_asset_account_name: assetAccountNameId,
    };
    await updateResource(
      `${API_BASE_URL}${INCOME_NAMES_ENDPOINT}${incomeNameId}/`,
      new_payload,
      "income name"
    );
    navigate(`/income_names/${businessId}`, {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
  };

  const handleEditIncomeName = async (e) => {
    e.preventDefault();
    await editIncomeName(
      newIncomeName,
      newIncomeDescription,
      newIncomeDefaultAmount,
      newAssetAccountName.value
    );
  };

  const deleteIncomeName = async () => {
    await deleteResource(
      `${API_BASE_URL}${INCOME_NAMES_ENDPOINT}${incomeNameId}`,
      "income name"
    );
    navigate(`/income_names/${businessId}`, {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
  };

  const handleDeleteIncomeName = () => {
    deleteIncomeName();
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
    <GenericEditData
      title={`Edit asset account name ${incomeNameId}`}
      formFields={formFields}
      handleEdit={handleEditIncomeName}
      handleDelete={handleDeleteIncomeName}
    />
  );
};

export default IncomeNameEdit;
