import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL,SPENDING_NAMES_ENDPOINT } from "../APIUtils/ApiEndpoints";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { fetchAssetAccountNames } from "../APIUtils/fetch_data";

const SpendingNameNew = () => {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [newSpendingName, setNewSpendingName] = useState("");
  const [newSpendingDescription, setNewSpendingDescription] = useState("");
  const [assetAccountNames, setAssetAccountNames] = useState([]);
  const [newAssetAccountName, setNewAssetAccountName]= useState("")

  useEffect(() => {
    const fetchData = async () => {
      const assetAccountNames = await fetchAssetAccountNames(businessId);
      setAssetAccountNames(assetAccountNames);
    };

    fetchData();
  },[]);
 
  
  const assetAccountNameOptions = assetAccountNames.map((assetAccountName) => {
    return { value: assetAccountName.id, label: assetAccountName.name };
  });

  const createSpendingName = async (name, description, assetAccountNameId) => {
    try {
      console.log(`about to create new spending name : ${name}, description : ${description}, asset account name id : ${assetAccountNameId}`)
      const response = await axios.post(
        `${API_BASE_URL}${SPENDING_NAMES_ENDPOINT}`,
        {
          business: businessId,
          name: name,
          description: description,
          associated_asset_account_name: assetAccountNameId,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );

      console.log(`successfully created ${JSON.stringify(response.data)}`);
      navigate(`/spending_names/${businessId}`, {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (error) {
      console.log(`error while creating a new spending name : ${error}`);
    }
  };

  const handleNewSpendingName = async (e) => {
    e.preventDefault();
    await createSpendingName(newSpendingName, newSpendingDescription,newAssetAccountName.value);
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
      fieldValue:newAssetAccountName,
      setFieldValue:setNewAssetAccountName,
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
