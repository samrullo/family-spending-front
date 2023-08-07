import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  INCOME_NAMES_ENDPOINT,
} from "../APIUtils/ApiEndpoints";
import { fetchIncomeName,fetchAssetAccountNames } from "../APIUtils/fetch_data";
import GenericEditData from "../GenericDataComponents/GenericEditData";


const IncomeNameEdit = () => {
  const navigate = useNavigate();
  const { businessId, incomeNameId } = useParams();
  const [newIncomeName, setNewIncomeName] = useState("");
  const [newIncomeDescription, setNewIncomeDescription] = useState("");
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

  const editIncomeName = async (name, description, assetAccountNameId) => {
    try {
      console.log(
        `will attempt to update income id : ${incomeNameId}, name ${name}, desc ${description}, asset account name id ${assetAccountNameId}`
      );
      const response = await axios.put(
        `${API_BASE_URL}${INCOME_NAMES_ENDPOINT}${incomeNameId}/`,
        {
          id: incomeNameId,
          business: businessId,
          name: name,
          description: description,
          associated_asset_account_name: assetAccountNameId,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );

      console.log(`successfully edited ${JSON.stringify(response.data)}`);
      navigate(`/income_names/${businessId}`, {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (error) {
      console.log(`error while editing income name : ${error}`);
    }
  };

  const handleEditIncomeName = async (e) => {
    e.preventDefault();
    await editIncomeName(
      newIncomeName,
      newIncomeDescription,
      newAssetAccountName.value
    );
  };

  const deleteIncomeName = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}${INCOME_NAMES_ENDPOINT}${incomeNameId}`,
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );
      console.log(` successfully deleted ${incomeNameId} ${response.data}`);
      navigate(`/income_names/${businessId}`, {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (error) {
      console.log(`Error when deleting income name ${error}`);
    }
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
