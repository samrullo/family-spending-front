export const API_BASE_URL = "http://localhost:8000/api/v1";
export const LOGIN_ENDPOINT = "/dj-rest-auth/login/";
export const LOGOUT_ENDPOINT = "/dj-rest-auth/logout/";
export const REGISTRATION_ENDPOINT = "/dj-rest-auth/registration";
export const USER_DETAIL_ENDPOINT = "/dj-rest-auth/user";
export const BUSINESSES_ENDPOINT = "businesses/";
export const ASSET_ACCOUNT_NAMES_ENDPOINT = "/asset_account_names/";
export const BUSINESS_ASSET_ACCOUNT_NAMES_FUNC = (businessId)=>{return `business/${businessId}/asset_account_names/`}
export const INCOME_NAMES_ENDPOINT = "/income_names";
export const SPENDING_NAMES_ENDPOINT = "/spending_names";
