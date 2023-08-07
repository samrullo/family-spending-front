import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchBusiness, fetchSpendingNames } from "../APIUtils/fetch_data"; // Assuming you also have a method for fetching Spending Names
import { createResource } from "../APIUtils/create_data";
import {
  API_BASE_URL,
  SPENDINGS_NEW_ENDPOINT, // You'll need to define this in your APIUtils if it doesn't exist.
} from "../APIUtils/ApiEndpoints";
import GenericNewData from "../GenericDataComponents/GenericNewData";

const SpendingNew = () => {
  const navigate = useNavigate();
  const { businessId, adate } = useParams();
  const [business, setBusiness] = useState();
  const [spendingNames, setSpendingNames] = useState([]);
  const [newSpendingName, setNewSpendingName] = useState("");
  const [amount, setAmount] = useState("");
  const [newDueDate, setNewDueDate] = useState(adate);

  useEffect(() => {
    const fetchData = async () => {
      setBusiness(await fetchBusiness(businessId));
      setSpendingNames(await fetchSpendingNames(businessId));
    };
    fetchData();
  }, []);

  const createSpending = () => {
    const new_payload = {
      business: businessId,
      spending_name: newSpendingName.value,
      adate: adate,
      due_date: newDueDate,
      amount: amount,
    };
    const new_spending = createResource(
      `${API_BASE_URL}${SPENDINGS_NEW_ENDPOINT}`,
      new_payload,
      "spending"
    );
    navigate(`/business_balances/${businessId}/${adate}`);
  };

  const handleNewSpending = (e) => {
    e.preventDefault();
    createSpending();
  };

  const spendingNameOptions = spendingNames.map((spendingName) => {
    return { value: spendingName.id, label: spendingName.name };
  });

  const formFields = [
    {
      fieldType: "select",
      fieldLabel: "Spending Name",
      fieldValue: newSpendingName,
      setFieldValue: setNewSpendingName,
      selectOptions: spendingNameOptions,
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
      <h1>New Spending as of {adate}</h1>
      <Link
        className="btn btn-primary"
        to={`/business_balances/${businessId}/${adate}`}
      >
        Back to business balance
      </Link>
      <GenericNewData
        title="New Spending"
        formFields={formFields}
        handleNewData={handleNewSpending}
      />
    </>
  );
};

export default SpendingNew;
