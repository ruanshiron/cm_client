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
import "react-calendar/dist/Calendar.css";
import "./theme/style.scss";

import { useDispatch } from "react-redux";
import { useSelector } from "./store";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/login/SignUpPage";
import { fetchAllProducts } from "./store/data/productSlice";
import { fetchAllStages } from "./store/data/stageSlice";
import { fetchAllWorkshops } from "./store/data/workshopSlice";
import { fetchAllOrders } from "./store/data/orderSlice";
import { fetchAllCustomers } from "./store/data/customerSlice";
import { fetchAllProcesses } from "./store/data/processSlice";
import QrPage from "./pages/login/QrPage";
import MainRoutes from "./components/MainRoutes";
import { useFancyToast } from "./hooks/useFancyToast";

setupConfig({
  rippleEffect: true,
  mode: "md",
});

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
  const { isLoggedIn, loading: userLoading } = useSelector(
    (state) => state.user
  );
  return (
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
            <IonSplitPane contentId="main">
              <Menu />
              <MainRoutes />
            </IonSplitPane>
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
  );
};

export default App;
