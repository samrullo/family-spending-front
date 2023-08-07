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
    try {
      console.log(
        `will attempt to update spending id : ${spendingNameId}, name ${name}, desc ${description}, asset account name id ${assetAccountNameId}`
      );
      const response = await axios.put(
        `${API_BASE_URL}${SPENDING_NAMES_ENDPOINT}${spendingNameId}/`,
        {
          id: spendingNameId,
          business: businessId,
          name: name,
          description: description,
          associated_asset_account_name: assetAccountNameId,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );

      console.log(`successfully edited ${JSON.stringify(response.data)}`);
      navigate(`/spending_names/${businessId}`, {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (error) {
      console.log(`error while editing spending name : ${error}`);
    }
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
    try {
      const response = await axios.delete(
        `${API_BASE_URL}${SPENDING_NAMES_ENDPOINT}${spendingNameId}`,
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );
      console.log(` successfully deleted ${spendingNameId} ${response.data}`);
      navigate(`/spending_names/${businessId}`, {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (error) {
      console.log(`Error when deleting spending name ${error}`);
    }
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
