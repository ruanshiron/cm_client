import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import CustomerCreate from "../pages/resources/customer/CustomerCreate";
import { CustomerDetail } from "../pages/resources/customer/CustomerDetail";
import CustomerPage from "../pages/resources/customer/CustomerPage";
import CustomerUpdate from "../pages/resources/customer/CustomerUpdate";
import EmployeeCreate from "../pages/resources/employee/EmployeeCreate";
import { EmployeeDetail } from "../pages/resources/employee/EmployeeDetail";
import EmployeePage from "../pages/resources/employee/EmployeePage";
import EmployeeUpdate from "../pages/resources/employee/EmployeeUpdate";
import SupplierCreate from "../pages/resources/supplier/SupplierCreate";
import { SupplierDetail } from "../pages/resources/supplier/SupplierDetail";
import SupplierPage from "../pages/resources/supplier/SupplierPage";
import WorkshopCreate from "../pages/resources/workshop/WorkshopCreate";
import { WorkshopDetail } from "../pages/resources/workshop/WorkshopDetail";
import WorkshopPage from "../pages/resources/workshop/WorkshopPage";
import WorkshopUpdate from "../pages/resources/workshop/WorkshopUpdate";
import ProcessesPage from "../pages/settings/ProcessesPage";
import SettingsPage from "../pages/settings/SettingsPage";
import MainTabs from "../pages/tabs/MainTabs";
import HomeOrTutorial from "./HomeOrTutorial";

const MainRoutes = () => {
  return (
    <IonRouterOutlet id="main">
      <Redirect from="*" to="/tabs" />

      <Route path="/tabs" render={() => <MainTabs />} />

      <Route path="/workshops" component={WorkshopPage} exact />
      <Route path="/customers" component={CustomerPage} exact />
      <Route path="/employees" component={EmployeePage} exact />
      <Route path="/suppliers" component={SupplierPage} exact />
      <Route path="/settings" component={SettingsPage} exact />

      <Route path="/workshops/:id" component={WorkshopDetail} exact />
      <Route path="/customers/:id" component={CustomerDetail} exact />
      <Route path="/employees/:id" component={EmployeeDetail} exact />
      <Route path="/suppliers/:id" component={SupplierDetail} exact />

      <Route path={"/workshops/:id/update"} component={WorkshopUpdate} />
      <Route path={"/customers/:id/update"} component={CustomerUpdate} />
      <Route path={"/employees/:id/update"} component={EmployeeUpdate} />

      <Route path="/workshops/create" component={WorkshopCreate} exact />
      <Route path="/customers/create" component={CustomerCreate} exact />
      <Route path="/employees/create" component={EmployeeCreate} exact />
      <Route path="/suppliers/create" component={SupplierCreate} exact />
      <Route path="/settings/processes" component={ProcessesPage} exact />

      <Route path="/" component={HomeOrTutorial} exact />
    </IonRouterOutlet>
  );
};

export default MainRoutes;
