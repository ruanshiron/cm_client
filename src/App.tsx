import Menu from "./components/menus/Menu";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  IonSplitPane,
  setupConfig,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* SCSS */
import "./theme/style.scss";

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


import { useSelector } from "./store";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/login/SignUpPage";
import QrPage from "./pages/login/QrPage";
import MainRoutes from "./components/routes/MainRoutes";
import { useFancyToast } from "./hooks/useFancyToast";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { vi } from "date-fns/locale";
import AnonymousWorkshopPage from "./pages/anonymous/AnonymousWorkshopPage";
import AnonymousCustomerPage from "./pages/anonymous/AnonymousCustomerPage";
import AnonymousPage from "./pages/anonymous/AnonymousPage";
import DiaryPage from "./pages/tabs/diary/DiaryPage";
import StageDetail from "./pages/tabs/diary/StageDetail";
import StageUpdate from "./pages/tabs/diary/StageUpdate";
import AnonymousMenu from "./components/menus/AnonymousMenu";
import SettingsPage from "./pages/settings/SettingsPage";
import { ThemeProvider } from "@material-ui/styles";
import { defaultMaterialTheme } from "./hooks/useStyles";
import PasswordResetPage from "./pages/login/PasswordResetPage";

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
    case "employees":
      return (
        <>
          <AnonymousMenu />
          <IonRouterOutlet id="main">
            <Route
              path="/"
              render={() => <Redirect to="/tabs/diary" />}
              exact
            />
            <Route path="/tabs/diary" component={DiaryPage} exact />
            <Route path="/tabs/diary/:id" component={StageDetail} exact />
            <Route
              path="/tabs/diary/:id/update"
              component={StageUpdate}
              exact
            />
            <Route path="/settings" component={SettingsPage} exact />
          </IonRouterOutlet>
        </>
      );
    case "workshops":
      return <AnonymousWorkshopPage />;
    case "customers":
      return <AnonymousCustomerPage />;

    default:
      return <AnonymousPage />;
  }
};

const App: React.FC = () => {
  useAuth();
  useFancyToast();
  const {
    isLoggedIn,
    loading: userLoading,
    role,
  } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={vi}>
        <IonApp>
          <IonLoading isOpen={userLoading} />
          <IonReactRouter>
            {!userLoading &&
              (isLoggedIn ? (
                <RoleBaseView role={role} />
              ) : (
                <IonRouterOutlet>
                  <Route
                    path="/"
                    render={() => <Redirect to="/login" />}
                    exact
                  />
                  <Route path="/login" component={LoginPage} exact />
                  <Route path="/signup" component={SignUpPage} exact />
                  <Route path="/qr" component={QrPage} exact />
                  <Route path="/forgot" component={PasswordResetPage} exact />
                  <AnonymousPage />
                </IonRouterOutlet>
              ))}
          </IonReactRouter>
        </IonApp>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
