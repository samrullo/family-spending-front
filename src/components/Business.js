import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import axios from "axios";
import { API_BASE_URL, BUSINESSES_ENDPOINT } from "./apiConfig";
import { useContext } from "react";
import AppContext from "../AppContext";
import DataTable from "./DataTable";
import { Link } from "react-router-dom";

const Business = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState();

  useEffect(() => {
    if (businesses.length === 0) {
      fetchBusinesses();
    }
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${BUSINESSES_ENDPOINT}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setBusinesses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <>
      {businesses.length === 0 ? (
        <>
          <p>businesses length is zero</p>
        </>
      ) : (
        <ul>
          {businesses.map((business)=>{
            return <li key={business.id}><Link className="btn btn-primary" to={`/businesses/detail/${business.id}`}>Business detail</Link></li>
          })}
        </ul>

      )}
    </>
  );

  //<p>business data length is {businesses.length}</p>;
};

export default Business;
