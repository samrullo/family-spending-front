import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchSpending } from "../APIUtils/fetch_data";
import { updateResource, deleteResource } from "../APIUtils/create_data";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import {
  API_BASE_URL,
  SPENDINGS_UPDATE_ENDPOINT,
  SPENDINGS_DELETE_ENDPOINT,
} from "../APIUtils/ApiEndpoints";

const SpendingEdit = () => {
  const navigate = useNavigate();
  const { businessId, adate, spendingId } = useParams();

  const [spending, setSpending] = useState(null);
  const [amount, setAmount] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSpending = await fetchSpending(spendingId);
      setSpending(fetchedSpending);
      setNewDueDate(fetchedSpending.due_date);
    };
    fetchData();
  }, [spendingId]);

  useEffect(() => {
    if (spending) {
      console.log(`setting amount to ${spending.amount}`);
      setAmount(spending.amount);
    }
  }, [spending]);

  const handleEditData = (e) => {
    e.preventDefault();
    const new_payload = {
      id: spending.id,
      business: businessId,
      spending_name: spending.spending_name,  // assuming the name of the spending is "spending_name"
      adate: adate,
      amount: amount,
      due_date: newDueDate,
    };
    updateResource(
      `${API_BASE_URL}${SPENDINGS_UPDATE_ENDPOINT}${spendingId}`,
      new_payload,
      "spending"
    );
    navigate(`/business_balances/${businessId}/${adate}`);
  };

  const handleDeleteData = (e) => {
    e.preventDefault();
    deleteResource(`${API_BASE_URL}${SPENDINGS_DELETE_ENDPOINT}${spendingId}`);
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
      <h1>Spending Edit</h1>
      <Link
        className="btn btn-primary"
        to={`/business_balances/${businessId}/${adate}`}
      >
        Back to business balance
      </Link>
      <GenericEditData
        formFields={formFields}
        title={`Edit spending ${spendingId}`}
        handleEdit={handleEditData}
        handleDelete={handleDeleteData}
      />
    </>
  );
};

export default SpendingEdit;
