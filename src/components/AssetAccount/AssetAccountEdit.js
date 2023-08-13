import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { fetchAssetAccount } from "../APIUtils/fetch_data";
import {
  updateResource,
  deleteResource,
  updateAssetAccountDefaultAmount,
} from "../APIUtils/create_data";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import {
  API_BASE_URL,
  ASSET_ACCOUNTS_UPDATE_ENDPOINT,
} from "../APIUtils/ApiEndpoints";

const AssetAccountEdit = () => {
  const navigate = useNavigate();
  const { businessId, adate, assetAccountId } = useParams();

  const [assetAccount, setAssetAccount] = useState(null);
  const [originalBalance, setOriginalBalance] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const assetAccount = await fetchAssetAccount(assetAccountId);
      setAssetAccount(assetAccount);
    };
    fetchData();
  }, [assetAccountId]);

  useEffect(() => {
    if (assetAccount) {
      console.log(
        `setting original balance to ${assetAccount.original_balance}`
      );
      setOriginalBalance(assetAccount.original_balance);
    }
  }, [assetAccount]);

  const updateAsyncAssetAccount = async () => {
    const new_payload = {
      id: assetAccount.id,
      business: businessId,
      asset_account_name: assetAccount.asset_account_name,
      adate: adate,
      original_balance: originalBalance,
      account_income: assetAccount.account_income,
      account_liability: assetAccount.account_liability,
      account_balance: assetAccount.account_balance,
    };
    await updateResource(
      `${API_BASE_URL}${ASSET_ACCOUNTS_UPDATE_ENDPOINT}${assetAccountId}`,
      new_payload,
      "asset account"
    );
    await updateAssetAccountDefaultAmount(
      assetAccount.asset_account_name,
      originalBalance
    );
  };

  const handleEditData = (e) => {
    e.preventDefault();
    updateAsyncAssetAccount();
    navigate(`/business_balances/${businessId}/${adate}`);
  };

  const formFields = [
    {
      fieldType: "number",
      fieldLabel: "Original Balance",
      fieldValue: originalBalance,
      setFieldValue: setOriginalBalance,
    },
  ];

  return (
    <>
      <h1>Asset Account Edit</h1>
      <Link
        className="btn btn-primary"
        to={`/business_balances/${businessId}/${adate}`}
      >
        Back to business balance
      </Link>
      <GenericEditData
        formFields={formFields}
        title={`Edit asset account ${assetAccountId}`}
        handleEdit={handleEditData}
      />
    </>
  );
};

export default AssetAccountEdit;
