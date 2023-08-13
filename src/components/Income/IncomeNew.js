import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchBusiness, fetchIncomeNames } from "../APIUtils/fetch_data";
import {
  createResource,
  updateIncomeDefaultAmount,
} from "../APIUtils/create_data";
import {
  API_BASE_URL,
  INCOMES_NEW_ENDPOINT, // This should be defined in your APIUtils, it's hypothetical here.
} from "../APIUtils/ApiEndpoints";
import GenericNewData from "../GenericDataComponents/GenericNewData";

const IncomeNew = () => {
  const navigate = useNavigate();
  const { businessId, adate } = useParams();
  const [business, setBusiness] = useState();
  const [incomeNames, setIncomeNames] = useState([]);
  const [newIncomeName, setNewIncomeName] = useState("");
  const [amount, setAmount] = useState("");
  const [newDueDate, setNewDueDate] = useState(adate);

  useEffect(() => {
    const fetchData = async () => {
      setBusiness(await fetchBusiness(businessId));
      setIncomeNames(await fetchIncomeNames(businessId));
    };
    fetchData();
  }, []);

  const createAsyncIncome = async () => {
    const new_payload = {
      business: businessId,
      income_name: newIncomeName.value,
      adate: adate,
      due_date: newDueDate,
      amount: amount,
    };
    await createResource(
      `${API_BASE_URL}${INCOMES_NEW_ENDPOINT}`,
      new_payload,
      "income"
    );
    await updateIncomeDefaultAmount(newIncomeName.value, amount);
  };

  const createIncome = () => {
    createAsyncIncome();
    navigate(`/business_balances/${businessId}/${adate}`);
  };

  const handleNewIncome = (e) => {
    e.preventDefault();
    createIncome();
  };

  const incomeNameOptions = incomeNames.map((incomeName) => {
    return { value: incomeName.id, label: incomeName.name };
  });

  const formFields = [
    {
      fieldType: "select",
      fieldLabel: "Income Name",
      fieldValue: newIncomeName,
      setFieldValue: setNewIncomeName,
      selectOptions: incomeNameOptions,
    },
    {
      fieldType: "number",
      fieldLabel: "Amount",
      fieldValue: amount,
      setFieldValue: setAmount,
    },
    {
      fieldType: "date",
      fieldLabel: "Due Date",
      fieldValue: newDueDate,
      setFieldValue: setNewDueDate,
    },
  ];

  return (
    <>
      <h1>New Income as of {adate}</h1>
      <Link
        className="btn btn-primary"
        to={`/business_balances/${businessId}/${adate}`}
      >
        Back to business balance
      </Link>
      <GenericNewData
        title="New Income"
        formFields={formFields}
        handleNewData={handleNewIncome}
      />
    </>
  );
};

export default IncomeNew;
