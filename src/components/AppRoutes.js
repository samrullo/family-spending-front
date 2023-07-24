// Routes.js
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Business from "./Business";
import BusinessBalance from "./BusinessBalance";
import AssetAccountName from "./AssetAccount/AssetAccountName";
import AssetAccountNew from "./AssetAccount/AssetAccountNew";
import BusinessDetail from "./BusinessDetail";

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" elemnet={<Outlet />}>
        <Route index element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/businesses" element={<Business />}/>
        <Route path="/businesses/detail/:businessId" element={<BusinessDetail/>}/>          
        <Route path="/asset_account_names/:businessId" element={<AssetAccountName/>}>
          <Route path="new" element={<AssetAccountNew/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
