import {
  API_BASE_URL,
  INCOME_NAMES_ENDPOINT,
  BUSINESS_INCOME_NAMES_FUNC,
  ASSET_ACCOUNT_NAMES_ENDPOINT,
  BUSINESS_ASSET_ACCOUNT_NAMES_FUNC,
  BUSINESS_SPENDING_NAMES_FUNC,
  SPENDING_NAMES_ENDPOINT,
  BUSINESSES_ENDPOINT,
  BUSINESS_BALANCES_FUNC,
  BUSINESS_ADATE_ASSET_ACCOUNTS_FUNC,
  BUSINESS_ADATE_INCOMES_FUNC,
  BUSINESS_ADATE_SPENDINGS_FUNC,
  BUSINESS_ADATE_BALANCES_FUNC,
  ASSET_ACCOUNTS_ENDPOINT,
  INCOMES_ENDPOINT,
  SPENDINGS_ENDPOINT,
} from "./ApiEndpoints";
import axios from "axios";

const fetchResource = async (apiEndPoint, resourceName) => {
  try {
    const response = await axios.get(apiEndPoint, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const resourceData = await response.data;
    console.log(`successfully fetched ${resourceName} ${JSON.stringify(resourceData)}`)
    return resourceData;
  } catch (error) {
    console.log(
      `error while fetching ${resourceName} resources for api EndPoint ${apiEndPoint} : ${error}`
    );
  }
};

export const fetchAssetAccountNames = async (businessId) => {
  const business_asset_account_names_endpoint = `${API_BASE_URL}${BUSINESS_ASSET_ACCOUNT_NAMES_FUNC(
    businessId
  )}`;
  const assetAccountNames = await fetchResource(
    business_asset_account_names_endpoint,
    "asset account names"
  );
  return assetAccountNames;
};

export const fetchBusinesses = async () => {
  const api_endpoint = `${API_BASE_URL}${BUSINESSES_ENDPOINT}`;
  const businesses = await fetchResource(api_endpoint, "businesses");
  return businesses;
};

export const fetchBusiness = async (businessId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${BUSINESSES_ENDPOINT}${businessId}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    const business = await response.data;
    console.log(`fetched ${JSON.stringify(business)} business`);
    return business;
  } catch (error) {
    console.log(
      `error while fetching business by business id ${businessId} : ${error}`
    );
  }
};

export const fetchAssetAccountName = async (assetAccountNameId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${ASSET_ACCOUNT_NAMES_ENDPOINT}${assetAccountNameId}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );

    const assetAccountName = await response.data;
    console.log(
      `fetched asset account name based on id ${assetAccountNameId} ${JSON.stringify(
        assetAccountName
      )}`
    );
    return assetAccountName;
  } catch (error) {
    console.log(
      `error while editing asset account name ${assetAccountNameId} ${error}`
    );
  }
};

export const fetchIncomeNames = async (businessId) => {
  const business_income_names_endpoint = BUSINESS_INCOME_NAMES_FUNC(businessId);
  const business_income_names_full_endpoint = `${API_BASE_URL}${business_income_names_endpoint}`;

  const incomeNames = await fetchResource(
    business_income_names_full_endpoint,
    "income names"
  );

  return incomeNames;
};

export const fetchIncomeName = async (incomeNameId) => {
  const incomeName = await fetchResource(
    `${API_BASE_URL}${INCOME_NAMES_ENDPOINT}${incomeNameId}`,
    "income name"
  );
  return incomeName;
};

export const fetchSpendingNames = async (businessId) => {
  const business_spending_names_endpoint =
    BUSINESS_SPENDING_NAMES_FUNC(businessId);
  const business_spending_names_full_endpoint = `${API_BASE_URL}${business_spending_names_endpoint}`;
  const spendingNames = await fetchResource(
    business_spending_names_full_endpoint,
    "spending names"
  );
  return spendingNames;
};

export const fetchSpendingName = async (spendingNameId) => {
  const spendingName = await fetchResource(
    `${API_BASE_URL}${SPENDING_NAMES_ENDPOINT}${spendingNameId}`,
    "spending name"
  );
  return spendingName;
};

export const fetchBusinessBalances = async (businessId) => {
  const business_balances_endpoint = BUSINESS_BALANCES_FUNC(businessId);
  const business_balances_full_endpoint = `${API_BASE_URL}${business_balances_endpoint}`;
  const business_balances = await fetchResource(
    business_balances_full_endpoint,
    "business balances"
  );
  return business_balances;
};

export const fetchBusinessAdateAssetAccounts = async (businessId, adate) => {
  const temp_endpoint = BUSINESS_ADATE_ASSET_ACCOUNTS_FUNC(businessId, adate);
  const endpoint = `${API_BASE_URL}${temp_endpoint}`;
  const asset_accounts = await fetchResource(
    endpoint,
    `asset accounts as of ${adate} for business id ${businessId}`
  );
  return asset_accounts;
};

export const fetchAssetAccount = async (assetAccountId) => {
  const assetAccount = await fetchResource(
    `${API_BASE_URL}${ASSET_ACCOUNTS_ENDPOINT}${assetAccountId}`,
    "asset account"
  );
  return assetAccount;
};

export const fetchBusinessAdateIncomes = async (businessId, adate) => {
  const temp_endpoint = BUSINESS_ADATE_INCOMES_FUNC(businessId, adate);
  const endpoint = `${API_BASE_URL}${temp_endpoint}`;
  const incomes = await fetchResource(
    endpoint,
    `incomes as of ${adate} for business id ${businessId}`
  );
  return incomes;
};

export const fetchIncome = async (incomeId) => {
  const income = fetchResource(
    `${API_BASE_URL}${INCOMES_ENDPOINT}${incomeId}`,
    "income"
  );
  return income;
};

export const fetchBusinessAdateSpendings = async (businessId, adate) => {
  const temp_endpoint = BUSINESS_ADATE_SPENDINGS_FUNC(businessId, adate);
  const endpoint = `${API_BASE_URL}${temp_endpoint}`;
  const spendings = await fetchResource(
    endpoint,
    `spendings as of ${adate} for business id ${businessId}`
  );
  return spendings;
};

export const fetchSpending = async (spendingId) => {
  const spending = fetchResource(
    `${API_BASE_URL}${SPENDINGS_ENDPOINT}${spendingId}`,
    "spending"
  );
  return spending;
};

export const fetchBusinessAdateBalances = async (businessId, adate) => {
  const temp_endpoint = BUSINESS_ADATE_BALANCES_FUNC(businessId, adate);
  const endpoint = `${API_BASE_URL}${temp_endpoint}`;
  const balances = await fetchResource(
    endpoint,
    `balances as of ${adate} for business id ${businessId}`
  );
  return balances;
};
