// Routes.js
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Business from "./Business";
import AssetAccountName from "./AssetAccountName/AssetAccountName";
import AssetAccountNameNew from "./AssetAccountName/AssetAccountNameNew";
import BusinessDetail from "./BusinessDetail";
import AssetAccountNameEdit from "./AssetAccountName/AssetAccountNameEdit";
import IncomeName from "./IncomeName/IncomeName";
import IncomeNameNew from "./IncomeName/IncomeNameNew";
import IncomeNameEdit from "./IncomeName/IncomeNameEdit";
import Profile from "./Profile";
import SpendingName from "./SpendingName/SpendingName";
import SpendingNameNew from "./SpendingName/SpendingNameNew";
import SpendingNameEdit from "./SpendingName/SpendingNameEdit";
import BusinessBalance from "./BusinessBalance/BusinessBalance";
import BusinessBalanceNew from "./BusinessBalance/BusinessBalanceNew";
import BusinessBalanceAdate from "./BusinessBalance/BusinessBalanceAdate";
import Income from "./Income/Income";
import IncomeNew from "./Income/IncomeNew";
import IncomeEdit from "./Income/IncomeEdit";
import AssetAccount from "./AssetAccount/AssetAccount";
import AssetAccountNew from "./AssetAccount/AssetAccountNew";
import AssetAccountEdit from "./AssetAccount/AssetAccountEdit";
import Spending from "./Spending/Spending";
import SpendingNew from "./Spending/SpendingNew";
import SpendingEdit from "./Spending/SpendingEdit";
import BusinessNew from "./BusinessNew";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" elemnet={<Outlet />}>
        <Route index element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/businesses" element={<Business />}/>
        <Route path="/businesses/new" element={<BusinessNew/>}/>
        <Route
          path="/businesses/detail/:businessId"
          element={<BusinessDetail />}
        />
        <Route
          path="/asset_account_names/:businessId"
          element={<AssetAccountName />}
        >
          <Route path="new" element={<AssetAccountNameNew />} />
          <Route
            path="edit/:assetAccountNameId"
            element={<AssetAccountNameEdit />}
          />
        </Route>
        <Route path="/income_names/:businessId" element={<IncomeName />}>
          <Route path="new" element={<IncomeNameNew />} />
          <Route path="edit/:incomeNameId" element={<IncomeNameEdit />} />
        </Route>

        <Route path="/spending_names/:businessId" element={<SpendingName />}>
          <Route path="new" element={<SpendingNameNew />} />
          <Route path="edit/:spendingNameId" element={<SpendingNameEdit />} />
        </Route>
      </Route>
      <Route
        path="/business_balances/:businessId"
        element={<BusinessBalance />}
      >
        <Route path="new" element={<BusinessBalanceNew />} />
      </Route>
      <Route
        path="/business_balances/:businessId/:adate/"
        element={<BusinessBalanceAdate />}
      />

      <Route
        path="/asset_account/:businessId/:adate/new"
        element={<AssetAccountNew />}
      />
      <Route
        path="/asset_account/:businessId/:adate/edit/:assetAccountId"
        element={<AssetAccountEdit />}
      />

      <Route
        path="/spending/:businessId/:adate/new"
        element={<SpendingNew />}
      />
      <Route
        path="/spending/:businessId/:adate/edit/:spendingId"
        element={<SpendingEdit />}
      />

      <Route path="/income/:businessId/:adate/new" element={<IncomeNew />} />
      <Route
        path="/income/:businessId/:adate/edit/:incomeId"
        element={<IncomeEdit />}
      />
    </Routes>
  );
}

export default AppRoutes;
