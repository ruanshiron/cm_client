import Menu from "./components/Menu";
import DateFnsUtils from "@date-io/date-fns";
import React, { useEffect } from "react";
import {
  IonApp,
  IonProgressBar,
  IonRouterOutlet,
  IonSplitPane,
  setupConfig,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

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

import { useDispatch } from "react-redux";
import { useSelector } from "./store";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/login/SignUpPage";
import QrPage from "./pages/login/QrPage";
import MainRoutes from "./components/MainRoutes";
import { useFancyToast } from "./hooks/useFancyToast";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { vi } from "date-fns/locale";
import AnonymousWorkshopPage from "./pages/anonymous/AnonymousWorkshopPage";
import AnonymousCustomerPage from "./pages/anonymous/AnonymousCustomerPage";
import AnonymousEmployeePage from "./pages/anonymous/AnonymousEmployeePage";

setupConfig({
  rippleEffect: true,
  mode: "md",
});

const RoleBaseView: React.FC<{ role: string }> = ({ role }) => {
  switch (role) {
    case "owner":
      return (
        <IonSplitPane contentId="main">
          <Menu />
          <MainRoutes />
        </IonSplitPane>
      );

    case "workshop":
      return <AnonymousWorkshopPage />;
    case "customer":
      return <AnonymousCustomerPage />;
    case "employee":
      return <AnonymousEmployeePage />;

    default:
      return <h1> bạn không có phận sự</h1>;
  }
};

const App: React.FC = () => {
  const dispatch = useDispatch();

  useAuth();

  useFancyToast();

  useEffect(() => {
    // dispatch(fetchAllStages());
    // dispatch(fetchAllProducts());
    // dispatch(fetchAllWorkshops());
    // dispatch(fetchAllOrders());
    // dispatch(fetchAllCustomers());
    // dispatch(fetchAllProcesses());
  }, [dispatch]);

  const loading = useSelector((state) => state.loading.isLoading);
  const { isLoggedIn, loading: userLoading, role } = useSelector(
    (state) => state.user
  );
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={vi}>
      <IonApp>
        {loading && (
          <IonProgressBar
            style={{ zIndex: 999 }}
            type="indeterminate"
          ></IonProgressBar>
        )}
        <IonReactRouter>
          {!userLoading &&
            (isLoggedIn ? (
              <RoleBaseView role={role} />
            ) : (
              <IonRouterOutlet>
                <Route path="/" render={() => <Redirect to="/login" />} exact />
                <Route path="/login" component={LoginPage} exact />
                <Route path="/signup" component={SignUpPage} exact />
                <Route path="/qr" component={QrPage} exact />
              </IonRouterOutlet>
            ))}
        </IonReactRouter>
      </IonApp>
    </MuiPickersUtilsProvider>
  );
};

export default App;
