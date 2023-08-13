import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { fetchIncome } from "../APIUtils/fetch_data";
import {
  updateResource,
  deleteResource,
  updateIncomeDefaultAmount,
} from "../APIUtils/create_data";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import {
  API_BASE_URL,
  INCOMES_UPDATE_ENDPOINT,
  INCOMES_DELETE_ENDPOINT,
} from "../APIUtils/ApiEndpoints";

const IncomeEdit = () => {
  const navigate = useNavigate();
  const { businessId, adate, incomeId } = useParams();

  const [income, setIncome] = useState(null);
  const [amount, setAmount] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedIncome = await fetchIncome(incomeId);
      setIncome(fetchedIncome);
      setNewDueDate(fetchedIncome.due_date);
    };
    fetchData();
  }, [incomeId]);

  useEffect(() => {
    if (income) {
      console.log(`setting amount to ${income.amount}`);
      setAmount(income.amount);
    }
  }, [income]);

  const updateAsyncIncome = async () => {
    const new_payload = {
      id: income.id,
      business: businessId,
      income_name: income.income_name,
      adate: adate,
      amount: amount,
      due_date: newDueDate,
    };
    await updateResource(
      `${API_BASE_URL}${INCOMES_UPDATE_ENDPOINT}${incomeId}`,
      new_payload,
      "income"
    );
    await updateIncomeDefaultAmount(income.income_name, amount);
  };

  const handleEditData = (e) => {
    e.preventDefault();
    updateAsyncIncome();
    navigate(`/business_balances/${businessId}/${adate}`);
  };

  const handleDeleteData = (e) => {
    e.preventDefault();
    deleteResource(`${API_BASE_URL}${INCOMES_DELETE_ENDPOINT}${incomeId}`);
    navigate(`/business_balances/${businessId}/${adate}`, { replace: true });
  };

  const formFields = [
    {
      fieldType: "number",
      fieldLabel: "Amount",
      fieldValue: amount,
      setFieldValue: setAmount,
    },
    {
      fieldType: "date", // Assuming it's a date input field
      fieldLabel: "Due Date",
      fieldValue: newDueDate,
      setFieldValue: setNewDueDate,
    },
  ];

  return (
    <>
      <h1>Income Edit</h1>
      <Link
        className="btn btn-primary"
        to={`/business_balances/${businessId}/${adate}`}
      >
        Back to business balance
      </Link>
      <GenericEditData
        formFields={formFields}
        title={`Edit income ${incomeId}`}
        handleEdit={handleEditData}
        handleDelete={handleDeleteData}
      />
    </>
  );
};

export default IncomeEdit;
