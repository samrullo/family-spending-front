import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import { fetchBusinessBalances, fetchBusiness } from "../APIUtils/fetch_data";
import DataTable from "../DataTable";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";

const BusinessBalance = () => {
  const navigate = useNavigate();
  const {flashMessages,setFlashMessages}=useContext(AppContext)
  const { businessId } = useParams();
  const [businessBalances, setBusinessBalances] = useState([]);
  const [business, setBusiness] = useState({});

  let { state = {} } = useLocation();
  let { timestamp } = state ?? {};
  console.log(`timestamp in BusinessBalances is ${timestamp}`)

  useEffect(() => {
    const fetchData = async () => {
      const businessBalances = await fetchBusinessBalances(businessId);
      console.log(`I got ${businessBalances.length} business balances`);
      setBusinessBalances(businessBalances);

      const business = await fetchBusiness(businessId);
      setBusiness(business);
    };
    fetchData();
    if(flashMessages.length!==0){
      setTimeout(() => {
        setFlashMessages([])
      }, 3000);
    }
  }, [timestamp]);


  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  useEffect(() => {
    if (selectedRowData) {
      navigate(`/business_balances/${businessId}/${selectedRowData.adate}`);
    }
  }, [selectedRowData]);

  //const {business_name} = props.location.state;

  //console.log(`business balances : ${businessBalances.length}`);
  return (
    <div>
      <h1>Business balances for {business.name} </h1>
      <Link className="btn btn-primary" to={`/businesses/detail/${businessId}`}>
        Back to business detail
      </Link>

      <Link
        className="btn btn-primary"
        to={`/business_balances/${businessId}/new`}
      >
        New Business Balance
      </Link>
      <div className="row">
        <div className="col-md-12">
          {businessBalances.length === 0 ? (
            <p>No business balances</p>
          ) : (
            <DataTable
              onRowClick={handleRowClick}
              hiddenColumns={["id"]}
              data={businessBalances.map((businessBalance) => {
                return {
                  id: businessBalance.id,
                  business_name: businessBalance.business_name,
                  adate: businessBalance.adate,
                  total_asset: businessBalance.total_asset,
                  total_income: businessBalance.total_income,
                  total_spending: businessBalance.total_spending,
                  total_net: businessBalance.total_net,
                };
              })}
              width_pct="100"
            />
          )}
        </div>
        <div className="col-md-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BusinessBalance;
