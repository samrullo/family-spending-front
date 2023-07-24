import React from "react";
import { useParams } from "react-router-dom";

const BusinessBalance = () => {
  const { businessId } = useParams();
  //const {business_name} = props.location.state;
  return (
    <div>
      <h1>The business id is {businessId} </h1>
    </div>
  );
};

export default BusinessBalance;
