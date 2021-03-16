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
import { Route } from "react-router-dom";

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
} from "./store/dataSlice";
import WorkshopPage from "./pages/lists/WorkshopPage";
import CustomerPage from "./pages/lists/CustomerPage";
import EmployeePage from "./pages/lists/EmployeePage";
import { WorkshopDetail } from "./pages/lists/WorkshopDetail";
import WorkshopCreate from "./pages/lists/WorkshopCreate";
import CustomerCreate from "./pages/lists/CustomerCreate";
import { CustomerDetail } from "./pages/lists/CustomerDetail";
import MaterialStorePage from "./pages/lists/MaterialStorePage";
import MaterialStoreCreate from "./pages/lists/MaterialStoreCreate";
import EmployeeCreate from "./pages/lists/EmployeeCreate";
import HomeOrTutorial from "./components/HomeOrTutorial";
import { useSelector } from "./store";
import SettingsPage from "./pages/settings/SettingsPage";
import ProcessesPage from "./pages/settings/ProcessesPage";

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
    url: "/materials",
    component: <MaterialStorePage />,
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
    url: "/materials/create",
    component: MaterialStoreCreate,
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

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
    dispatch(fetchOrders());
    dispatch(fetchProcesses());
  }, [dispatch]);

  const loading = useSelector((state) => state.data.loading);
  return (
    <IonApp>
      {loading && (
        <IonProgressBar
          style={{ zIndex: 999 }}
          type="indeterminate"
        ></IonProgressBar>
      )}
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
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
              <Route key={index} path={page.url} component={page.component} />
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
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
