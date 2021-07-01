import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import CustomerCreate from "../../pages/resources/customer/CustomerCreate";
import { CustomerDetail } from "../../pages/resources/customer/CustomerDetail";
import CustomerPage from "../../pages/resources/customer/CustomerPage";
import CustomerUpdate from "../../pages/resources/customer/CustomerUpdate";
import OrderPage from "../../pages/resources/customer/orders/OrderPage";
import EmployeeCreate from "../../pages/resources/employee/EmployeeCreate";
import { EmployeeDetail } from "../../pages/resources/employee/EmployeeDetail";
import EmployeePage from "../../pages/resources/employee/EmployeePage";
import EmployeeUpdate from "../../pages/resources/employee/EmployeeUpdate";
import WorkshopCreate from "../../pages/resources/workshop/WorkshopCreate";
import { WorkshopDetail } from "../../pages/resources/workshop/WorkshopDetail";
import WorkshopPage from "../../pages/resources/workshop/WorkshopPage";
import WorkshopStatistic from "../../pages/resources/workshop/WorkshopStatistic";
import WorkshopUpdate from "../../pages/resources/workshop/WorkshopUpdate";
import ProcessesPage from "../../pages/settings/ProcessesPage";
import SettingsPage from "../../pages/settings/SettingsPage";
import MainTabs from "../../pages/tabs/MainTabs";
import OrderCreate from "../../pages/resources/customer/orders/OrderCreate";
import HomeOrTutorial from "../HomeOrTutorial";
import DashboardPage from "../../pages/tabs/dashboard/DashboardPage";



const MainRoutes = () => {
  return (
    <IonRouterOutlet id="main">
      <Redirect from="*" to="/tabs/diary" />

      <Route path="/tabs" render={() => <MainTabs />} />

      <Route path="/workshops" component={WorkshopPage} exact />
      <Route path="/workshops/:id" component={WorkshopDetail} exact />
      <Route path="/workshops/:id/update" component={WorkshopUpdate} exact />
      <Route path="/workshops/:id/statistic" component={WorkshopStatistic} exact />
      <Route path="/workshops/create" component={WorkshopCreate} exact />

      <Route path="/customers" component={CustomerPage} exact />
      <Route path="/customers/:id" component={CustomerDetail} exact />
      <Route path="/customers/:id/update" component={CustomerUpdate} exact />
      <Route path="/customers/:id/orders" component={OrderPage} exact />
      <Route path="/customers/:customerId/orders/create" component={OrderCreate} exact />
      <Route path="/customers/:customerId/orders/:orderId/update" component={OrderCreate} exact />
      <Route path="/customers/create" component={CustomerCreate} exact />

      <Route path="/employees" component={EmployeePage} exact />
      <Route path="/employees/:id" component={EmployeeDetail} exact />
      <Route path="/employees/:id/update" component={EmployeeUpdate}  exact/>
      <Route path="/employees/create" component={EmployeeCreate} exact />

      <Route path="/settings" component={SettingsPage} exact />

      <Route path="/processes" component={ProcessesPage} exact />

      <Route path="/dashboard" component={DashboardPage} exact />

      <Route path="/" component={HomeOrTutorial} exact />
    </IonRouterOutlet>
  );
};

export default MainRoutes;
