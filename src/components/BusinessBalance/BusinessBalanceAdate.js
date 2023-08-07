import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  fetchBusinessAdateAssetAccounts,
  fetchBusinessAdateIncomes,
  fetchBusinessAdateSpendings,
  fetchBusinessAdateBalances,
} from "../APIUtils/fetch_data";
import DataTable from "../DataTable";
import AssetAccount from "../AssetAccount/AssetAccount";
import Income from "../Income/Income";
import Spending from "../Spending/Spending";

const BusinessBalanceAdate = () => {
  const timestamp = new Date().getTime();
  const { businessId, adate } = useParams();

  const [assetAccounts, setAssetAccounts] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [spendings, setSpendings] = useState([]);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setAssetAccounts(
        await fetchBusinessAdateAssetAccounts(businessId, adate)
      );
      setIncomes(await fetchBusinessAdateIncomes(businessId, adate));
      setSpendings(await fetchBusinessAdateSpendings(businessId, adate));
      setBalances(await fetchBusinessAdateBalances(businessId, adate));
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Business balance as of {adate}</h1>
      <Link className="btn btn-primary" to={`/business_balances/${businessId}`}>
        Back to balances
      </Link>
      <AssetAccount
        businessId={businessId}
        adate={adate}
        timestamp={timestamp}
      />
      <Income businessId={businessId} adate={adate} timestamp={timestamp} />
      <Spending businessId={businessId} adate={adate} timestamp={timestamp} />
      <h2>Balances</h2>
      {balances.length !== 0 ? (
        <DataTable
          data={balances}
          width_pct={100}
          hiddenColumns={[
            "id",
            "business_name",
            "created_at",
            "modified_at",
            "business",
            "modified_by",
          ]}
        />
      ) : (
        <p>no balances</p>
      )}
    </>
  );
};

export default BusinessBalanceAdate;
