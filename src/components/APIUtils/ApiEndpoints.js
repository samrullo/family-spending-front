const API_HOSTNAME = window.REACT_APP_API_HOSTNAME || "http://localhost:8000";

export const API_BASE_URL = `${API_HOSTNAME}/api/v1/`;
export const LOGIN_ENDPOINT = "dj-rest-auth/login/";
export const LOGOUT_ENDPOINT = "dj-rest-auth/logout/";
export const REGISTRATION_ENDPOINT = "dj-rest-auth/registration";
export const USER_DETAIL_ENDPOINT = "dj-rest-auth/user";
export const BUSINESSES_ENDPOINT = "businesses/";
export const ASSET_ACCOUNT_NAMES_ENDPOINT = "asset_account_names/";
export const BUSINESS_ASSET_ACCOUNT_NAMES_FUNC = (businessId) => {
  return `business/${businessId}/asset_account_names/`;
};
export const INCOME_NAMES_ENDPOINT = "income_names/";
export const SPENDING_NAMES_ENDPOINT = "spending_names/";
export const BUSINESS_INCOME_NAMES_FUNC = (businessId) => {
  return `business/${businessId}/income_names/`;
};
export const BUSINESS_SPENDING_NAMES_FUNC = (businessId) => {
  return `business/${businessId}/spending_names/`;
};
export const BUSINESS_BALANCES_FUNC = (businessId) => {
  return `business/${businessId}/balances/`;
};
export const BUSINESS_ADATE_ASSET_ACCOUNTS_FUNC = (businessId, adate) => {
  return `business/${businessId}/${adate}/asset_accounts/`;
};
export const BUSINESS_ADATE_INCOMES_FUNC = (businessId, adate) => {
  return `business/${businessId}/${adate}/incomes/`;
};
export const BUSINESS_ADATE_SPENDINGS_FUNC = (businessId, adate) => {
  return `business/${businessId}/${adate}/spendings/`;
};
export const BUSINESS_ADATE_BALANCES_FUNC = (businessId, adate) => {
  return `business/${businessId}/${adate}/balances`;
};
export const ASSET_ACCOUNTS_ENDPOINT = "asset_accounts/";
export const ASSET_ACCOUNTS_NEW_ENDPOINT = "asset_accounts_new/";
export const ASSET_ACCOUNTS_UPDATE_ENDPOINT = "asset_accounts_update/";
export const ASSET_ACCOUNTS_DELETE_ENDPOINT = "asset_accounts_delete/";
export const INCOMES_ENDPOINT = "incomes/";
export const INCOMES_NEW_ENDPOINT = "incomes_new/";
export const INCOMES_UPDATE_ENDPOINT = "incomes_update/";
export const INCOMES_DELETE_ENDPOINT = "incomes_delete/";
export const SPENDINGS_ENDPOINT = "spendings/";
export const SPENDINGS_NEW_ENDPOINT = "spendings_new/";
export const SPENDINGS_UPDATE_ENDPOINT = "spendings_update/";
export const SPENDINGS_DELETE_ENDPOINT = "spendings_delete/";
