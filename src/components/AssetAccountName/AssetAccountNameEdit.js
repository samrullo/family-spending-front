import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, ASSET_ACCOUNT_NAMES_ENDPOINT } from "../APIUtils/ApiEndpoints";
import { fetchAssetAccountName } from "../APIUtils/fetch_data";
import GenericEditData from "../GenericDataComponents/GenericEditData";

const AssetAccountNameEdit = () => {
  const navigate = useNavigate();
  const { businessId, assetAccountNameId } = useParams();
  const [newAssetAccountName, setNewAssetAccountName] = useState("");
  const [newAssetAccountDescription, setNewAssetAccountDescription] =
    useState("");

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
    }
  }, [assetAccountName]);

  const editAssetAccountName = async (name, description) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}${ASSET_ACCOUNT_NAMES_ENDPOINT}${assetAccountNameId}/`,
        {
          id: assetAccountNameId,
          business: businessId,
          name: name,
          description: description,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );

      console.log(`successfully edited ${JSON.stringify(response.data)}`);
      navigate(`/asset_account_names/${businessId}`, {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (error) {
      console.log(`error while editing a new asset account name : ${error}`);
    }
  };

  const handleEditAssetAccountName = async (e) => {
    e.preventDefault();
    await editAssetAccountName(newAssetAccountName, newAssetAccountDescription);
  };

  const deleteAssetAccountName = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}${ASSET_ACCOUNT_NAMES_ENDPOINT}${assetAccountNameId}`,
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );
      console.log(
        ` successfully deleted ${assetAccountNameId} ${response.data}`
      );
      navigate(`/asset_account_names/${businessId}`, {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (error) {
      console.log(`Error when deleting asset account name ${error}`);
    }
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
