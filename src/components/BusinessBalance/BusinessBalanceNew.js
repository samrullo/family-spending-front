import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  fetchAssetAccountNames,
  fetchIncomeNames,
  fetchSpendingNames,
  fetchBusiness,
} from "../APIUtils/fetch_data";

import NumberFormField from "./NumberFormField";
import { createResource } from "../APIUtils/create_data";
import {
  API_BASE_URL,
  ASSET_ACCOUNTS_NEW_ENDPOINT,
  INCOMES_NEW_ENDPOINT,
  SPENDINGS_NEW_ENDPOINT,
} from "../APIUtils/ApiEndpoints";
import FormField from "../FormComponents/FormField";
import AppContext from "../../AppContext";

const BusinessBalanceNew = () => {
  const { isSpinning, setIsSpinning, setFlashMessages } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [business, setBusiness] = useState({});
  const [assetAccountNames, setAssetAccountNames] = useState([]);
  const [incomeNames, setIncomeNames] = useState([]);
  const [spendingNames, setSpendingNames] = useState([]);
  const [adate, setAdate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const assetAccountNames = await fetchAssetAccountNames(businessId);
      setAssetAccountNames(assetAccountNames);
      const incomeNames = await fetchIncomeNames(businessId);
      setIncomeNames(incomeNames);
      setSpendingNames(await fetchSpendingNames(businessId));
      setBusiness(await fetchBusiness(businessId));
    };
    fetchData();
  }, []);

  const generateFormStates = (items, itemDefaultVal) => {
    return items.reduce(
      (acc, item) => ({ ...acc, [item.id]: itemDefaultVal }),
      {}
    );
  };

  const [assetAccountNamesFormState, setAssetAccountNamesFormState] = useState(
    generateFormStates(assetAccountNames, "123")
  );

  const [incomeNamesFormState, setIncomeNamesFormState] = useState(
    generateFormStates(incomeNames, 0)
  );

  const [spendingNamesFormState, setSpendingNamesFormState] = useState(
    generateFormStates(spendingNames, 0)
  );

  const handleFormStateChange = (e, id, formState, setFormState) => {
    setFormState({ ...formState, [id]: e.target.value });
  };

  const handleAssetAccountInputChange = (e, id) => {
    handleFormStateChange(
      e,
      id,
      assetAccountNamesFormState,
      setAssetAccountNamesFormState
    );
  };

  const handleIncomeInputChange = (e, id) => {
    handleFormStateChange(e, id, incomeNamesFormState, setIncomeNamesFormState);
  };

  const handleSpendingInputChange = (e, id) => {
    handleFormStateChange(
      e,
      id,
      spendingNamesFormState,
      setSpendingNamesFormState
    );
  };

  const createAssetAccount = async (assetAccountNameId, originalBalance) => {
    await createResource(
      `${API_BASE_URL}${ASSET_ACCOUNTS_NEW_ENDPOINT}`,
      {
        business: businessId,
        asset_account_name: assetAccountNameId,
        adate: adate,
        original_balance: originalBalance,
        account_income: 0,
        account_liability: 0,
        account_balance: originalBalance,
      },
      "asset account"
    );

    await new Promise((r) => setTimeout(r, 2000));
  };

  const createAssetAccountsInLoop = async () => {
    for (let id in assetAccountNamesFormState) {
      console.log(
        `asset account id : ${id}, value : ${assetAccountNamesFormState[id]}`
      );
      await createAssetAccount(id, assetAccountNamesFormState[id]);
    }
  };

  const createIncome = async (incomeNameId, incomeAmount) => {
    await createResource(
      `${API_BASE_URL}${INCOMES_NEW_ENDPOINT}`,
      {
        business: businessId,
        income_name: incomeNameId,
        adate: adate,
        due_date: adate,
        amount: incomeAmount,
      },
      "income name"
    );
    await new Promise((r) => setTimeout(r, 2000));
  };

  const createIncomesInLoop = async () => {
    for (let id in incomeNamesFormState) {
      console.log(
        `income name id : ${id}, value : ${incomeNamesFormState[id]}`
      );
      await createIncome(id, incomeNamesFormState[id]);
    }
  };

  const createSpending = async (spendingNameId, spendingAmount) => {
    await createResource(
      `${API_BASE_URL}${SPENDINGS_NEW_ENDPOINT}`,
      {
        business: businessId,
        spending_name: spendingNameId,
        adate: adate,
        due_date: adate,
        amount: spendingAmount,
      },
      "spending"
    );
    await new Promise((r) => setTimeout(r, 2000));
  };

  const createSpendingsInLoop = async () => {
    for (let id in spendingNamesFormState) {
      console.log(
        `spending name id : ${id}, value : ${spendingNamesFormState[id]}`
      );
      await createSpending(id, spendingNamesFormState[id]);
    }
  };

  const createNewBusinessBalanceInLoop = async () => {
    setIsSpinning(true);
    await createAssetAccountsInLoop();
    await createIncomesInLoop();
    await createSpendingsInLoop();
    setIsSpinning(false);
    setFlashMessages([
      {
        category: "success",
        message: `Successfully generated new busines balance as of ${adate}`,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`adate is ${adate}`);

    createNewBusinessBalanceInLoop();
    setTimeout(() => {
      setFlashMessages([]);
    }, 5000);

    navigate(`/business_balances/${businessId}`, {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
  };

  return (
    <>
      <h1>New business balance </h1>
      <form className="form" onSubmit={handleSubmit}>
        <FormField
          fieldType="date"
          fieldLabel="Adate"
          fieldValue={adate}
          setFieldValue={setAdate}
        />
        <h3>Asset Accounts</h3>
        {assetAccountNames.map((assetAccountName) => {
          return (
            <NumberFormField
              key={assetAccountName.id}
              fieldItem={assetAccountName}
              fieldsFormState={assetAccountNamesFormState}
              handleFieldInputChange={handleAssetAccountInputChange}
            />
          );
        })}
        <h3>Income Names</h3>
        {incomeNames.map((incomeName) => {
          return (
            <NumberFormField
              key={incomeName.id}
              fieldItem={incomeName}
              fieldsFormState={incomeNamesFormState}
              handleFieldInputChange={handleIncomeInputChange}
            />
          );
        })}
        <h3>Spending Names</h3>
        {spendingNames.map((spendingName) => {
          return (
            <NumberFormField
              key={spendingName.id}
              fieldItem={spendingName}
              fieldsFormState={spendingNamesFormState}
              handleFieldInputChange={handleSpendingInputChange}
            />
          );
        })}
        <div className="form-group">
          <button className="btn btn-dark mt-3">Submit</button>
        </div>
      </form>
    </>
  );
};

export default BusinessBalanceNew;
