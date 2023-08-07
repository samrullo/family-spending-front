import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, INCOME_NAMES_ENDPOINT } from "../APIUtils/ApiEndpoints";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { fetchAssetAccountNames } from "../APIUtils/fetch_data";

const IncomeNameNew = () => {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [newIncomeName, setNewIncomeName] = useState("");
  const [newIncomeDescription, setNewIncomeDescription] = useState("");
  const [assetAccountNames, setAssetAccountNames] = useState([]);
  const [newAssetAccountName, setNewAssetAccountName]= useState("")

  useEffect(() => {
    const fetchData = async () => {
      const assetAccountNames = await fetchAssetAccountNames(businessId);
      setAssetAccountNames(assetAccountNames);
    };

    fetchData();
  },[]);

 
  console.log(`we have ${assetAccountNames.length} asset account names`)
  const assetAccountNameOptions = assetAccountNames.map((assetAccountName) => {
    return { value: assetAccountName.id, label: assetAccountName.name };
  });

  const createIncomeName = async (name, description, assetAccountNameId) => {
    try {
      console.log(`about to create new income name, icome name : ${name}, description : ${description}, asset account name id : ${assetAccountNameId}`)
      const response = await axios.post(
        `${API_BASE_URL}${INCOME_NAMES_ENDPOINT}`,
        {
          business: businessId,
          name: name,
          description: description,
          associated_asset_account_name: assetAccountNameId,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );

      console.log(`successfully created ${JSON.stringify(response.data)}`);
      navigate(`/income_names/${businessId}`, {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (error) {
      console.log(`error while creating a new income name : ${error}`);
    }
  };

  const handleNewIncomeName = async (e) => {
    e.preventDefault();
    await createIncomeName(newIncomeName, newIncomeDescription,newAssetAccountName.value);
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
      fieldValue:newAssetAccountName,
      setFieldValue:setNewAssetAccountName,
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
