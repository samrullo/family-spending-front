import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchBusiness, fetchAssetAccountNames } from "../APIUtils/fetch_data";
import { createResource, updateAssetAccountDefaultAmount } from "../APIUtils/create_data";
import {
  API_BASE_URL,
  ASSET_ACCOUNTS_NEW_ENDPOINT,
  ASSET_ACCOUNT_NAMES_ENDPOINT,
} from "../APIUtils/ApiEndpoints";
import GenericNewData from "../GenericDataComponents/GenericNewData";

const AssetAccountNew = () => {
  const navigate = useNavigate();
  const { businessId, adate } = useParams();
  const [business, setBusiness] = useState();
  const [assetAccountNames, setAssetAccountNames] = useState([]);
  const [newAssetAccountName, setNewAssetAccountName] = useState("");
  const [originalBalance, setOriginalBalance] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setBusiness(await fetchBusiness(businessId));
      setAssetAccountNames(await fetchAssetAccountNames(businessId));
    };
    fetchData();
  }, []);

  
  const createAsyncAssetAccount = async () => {
    const new_payload = {
      business: businessId,
      asset_account_name: newAssetAccountName.value,
      adate: adate,
      original_balance: originalBalance,
      account_income: 0,
      account_liability: 0,
      account_balance: originalBalance,
    };
    await createResource(
      `${API_BASE_URL}${ASSET_ACCOUNTS_NEW_ENDPOINT}`,
      new_payload,
      "asset account"
    );

    await updateAssetAccountDefaultAmount(
      newAssetAccountName.value,
      originalBalance
    );
  };

  const createAssetAccount = () => {
    createAsyncAssetAccount();
    navigate(`/business_balances/${businessId}/${adate}`);
  };

  const handleNewAssetAccount = (e) => {
    e.preventDefault();
    createAssetAccount();
  };

  const assetAccountNameOptions = assetAccountNames.map((assetAccountName) => {
    return { value: assetAccountName.id, label: assetAccountName.name };
  });

  const formFields = [
    {
      fieldType: "select",
      fieldLabel: "Asset Account Name",
      fieldValue: newAssetAccountName,
      setFieldValue: setNewAssetAccountName,
      selectOptions: assetAccountNameOptions,
    },
    {
      fieldType: "number",
      fieldLabel: "Original Balance",
      fieldValue: originalBalance,
      setFieldValue: setOriginalBalance,
    },
  ];

  return (
    <>
      <h1>Asset Account New as of {adate}</h1>
      <Link
        className="btn btn-primary"
        to={`/business_balances/${businessId}/${adate}`}
      >
        Back to business balance
      </Link>
      <GenericNewData
        title="New Asset Account"
        formFields={formFields}
        handleNewData={handleNewAssetAccount}
      />
    </>
  );
};

export default AssetAccountNew;
