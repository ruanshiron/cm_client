import Menu from "./components/Menu";
import React, { useEffect } from "react";
import {
  IonApp,
  IonProgressBar,
  IonRouterOutlet,
  IonSplitPane,
  setupConfig,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* SCSS */
import "./theme/style.scss";

import MainTabs from "./pages/tabs/MainTabs";

import { useDispatch } from "react-redux";
import {
  fetchCustomers,
  fetchEvents,
  fetchOrders,
  fetchProcesses,
  fetchProducts,
  fetchWorkshops,
} from "./store/dataSlice";
import WorkshopPage from "./pages/resources/workshop/WorkshopPage";
import CustomerPage from "./pages/resources/customer/CustomerPage";
import EmployeePage from "./pages/resources/employee/EmployeePage";
import { WorkshopDetail } from "./pages/resources/workshop/WorkshopDetail";
import WorkshopCreate from "./pages/resources/workshop/WorkshopCreate";
import CustomerCreate from "./pages/resources/customer/CustomerCreate";
import { CustomerDetail } from "./pages/resources/customer/CustomerDetail";
import SupplierPage from "./pages/resources/supplier/SupplierPage";
import SupplierCreate from "./pages/resources/supplier/SupplierCreate";
import EmployeeCreate from "./pages/resources/employee/EmployeeCreate";
import HomeOrTutorial from "./components/HomeOrTutorial";
import { useSelector } from "./store";
import SettingsPage from "./pages/settings/SettingsPage";
import ProcessesPage from "./pages/settings/ProcessesPage";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/login/SignUpPage";
import { SupplierDetail } from "./pages/resources/supplier/SupplierDetail";
import { EmployeeDetail } from "./pages/resources/employee/EmployeeDetail";

interface AppRoute {
  url: string;
  component: any;
}

const listPages: AppRoute[] = [
  {
    url: "/workshops",
    component: <WorkshopPage />,
  },
  {
    url: "/customers",
    component: <CustomerPage />,
  },
  {
    url: "/employees",
    component: <EmployeePage />,
  },
  {
    url: "/suppliers",
    component: <SupplierPage />,
  },
  {
    url: "/settings",
    component: <SettingsPage />,
  },
];

const detailPages: AppRoute[] = [
  {
    url: "/workshops/:id",
    component: WorkshopDetail,
  },
  {
    url: "/customers/:id",
    component: CustomerDetail,
  },
  {
    url: "/suppliers/:id",
    component: SupplierDetail,
  },
  {
    url: "/employees/:id",
    component: EmployeeDetail,
  },
];

const createPages: AppRoute[] = [
  {
    url: "/workshops/create",
    component: WorkshopCreate,
  },
  {
    url: "/customers/create",
    component: CustomerCreate,
  },
  {
    url: "/employees/create",
    component: EmployeeCreate,
  },
  {
    url: "/suppliers/create",
    component: SupplierCreate,
  },
];

const settingPages: AppRoute[] = [
  {
    url: "/settings/processes",
    component: ProcessesPage,
  },
];

setupConfig({
  rippleEffect: true,
  mode: "md",
});

const App: React.FC = () => {
  const dispatch = useDispatch();

  useAuth();

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
    dispatch(fetchOrders());
    dispatch(fetchProcesses());
    dispatch(fetchWorkshops());
  }, [dispatch]);

  const loading = useSelector((state) => state.data.loading);
  const { isLoggedIn, loading: userLoading } = useSelector(
    (state) => state.user
  );
  return (
    <IonApp>
      {loading ||
        (userLoading && (
          <IonProgressBar
            style={{ zIndex: 999 }}
            type="indeterminate"
          ></IonProgressBar>
        ))}
      <IonReactRouter>
        {!userLoading &&
          (isLoggedIn ? (
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Redirect from="*" to="/tabs" />
                <Route path="/tabs" render={() => <MainTabs />} />
                {listPages.map((page, index) => (
                  <Route
                    key={index}
                    path={page.url}
                    render={() => page.component}
                    exact
                  />
                ))}
                {detailPages.map((page, index) => (
                  <Route
                    key={index}
                    path={page.url}
                    component={page.component}
                  />
                ))}
                {createPages.map((page, index) => (
                  <Route
                    key={index}
                    path={page.url}
                    component={page.component}
                    exact
                  />
                ))}
                {settingPages.map((page, index) => (
                  <Route
                    key={index}
                    path={page.url}
                    component={page.component}
                    exact
                  />
                ))}

                <Route path="/" component={HomeOrTutorial} exact />
              </IonRouterOutlet>
            </IonSplitPane>
          ) : (
            <IonRouterOutlet>
              <Switch>
                <Route path="/" render={() => <Redirect to="/login" />} exact />
                <Route path="/login" component={LoginPage} exact />
                <Route path="/signup" component={SignUpPage} exact />
                <Redirect from="*" to="/" />
              </Switch>
            </IonRouterOutlet>
          ))}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
