import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createResource } from "./APIUtils/create_data";
import { API_BASE_URL, BUSINESSES_ENDPOINT } from "./APIUtils/ApiEndpoints";
import GenericNewData from "./GenericDataComponents/GenericNewData";
import AppContext from "../AppContext";

const BusinessNew = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AppContext);
  const [name, setName] = useState("");

  const formFields = [
    {
      fieldType: "text",
      fieldLabel: "Business Name",
      fieldValue: name,
      setFieldValue: setName,
    },
  ];

  const handleNewData = (e) => {
    e.preventDefault();
    console.log(`userINfo that I got is this ${JSON.stringify(userInfo)}`)
    const payload = { "name": name, "owner": userInfo.pk };
    console.log(`about to create new business with payload ${JSON.stringify(payload)}`)
    createResource(
      `${API_BASE_URL}${BUSINESSES_ENDPOINT}`,
      payload,
      "business"
    );
    navigate("/businesses");
  };

  return (
    <>
      <GenericNewData
        title="New business"
        formFields={formFields}
        handleNewData={handleNewData}
      />
    </>
  );
};

export default BusinessNew;
