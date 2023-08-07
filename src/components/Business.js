import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { fetchBusinesses } from "./APIUtils/fetch_data";

const Business = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const businesses = await fetchBusinesses();
      setBusinesses(businesses);
    };
    fetchData();
  }, []);

  return (
    <>
      {businesses.length === 0 ? (
        <>
          <p>There are no businesses</p>
          <Link className="btn btn-primary" to={`/businesses/new`}>New business</Link>
        </>
      ) : (
        <ul className="list-group">
          {businesses.map((business) => {
            return (
              <li key={business.id} className="list-group-item">
                <Link
                  className="btn btn-primary"
                  to={`/businesses/detail/${business.id}`}
                >
                  {business.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );

  //<p>business data length is {businesses.length}</p>;
};

export default Business;
