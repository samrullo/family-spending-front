import {
  API_BASE_URL,
  ASSET_ACCOUNT_NAMES_ENDPOINT,
  BUSINESS_ASSET_ACCOUNT_NAMES_FUNC,
  BUSINESSES_ENDPOINT,
} from "../apiConfig";
import axios from "axios";

export const fetchAssetAccountNames = async (businessId) => {
  try {
    const business_asset_account_names_endpoint =
      BUSINESS_ASSET_ACCOUNT_NAMES_FUNC(businessId);
    const response = await axios.get(
      `${API_BASE_URL}/${business_asset_account_names_endpoint}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    const assetAccountNames = await response.data;
    console.log(`fetched ${assetAccountNames.length} asset account names`);

    return assetAccountNames;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBusiness = async (businessId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${BUSINESSES_ENDPOINT}${businessId}`,
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
    console.log(`fetched asset account name based on id ${assetAccountNameId} ${JSON.stringify(assetAccountName)}`);
    return assetAccountName;
  } catch (error) {
    console.log(
      `error while editing asset account name ${assetAccountNameId} ${error}`
    );
  }
};
