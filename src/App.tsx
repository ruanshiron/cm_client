import Menu from "./components/Menu";
import React, { useEffect } from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
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

import MainTabs from "./pages/MainTabs";

import { useDispatch } from "react-redux";
import { fetchEvents } from "./store/dataSlice";
import WorkshopPage from "./pages/WorkshopPage";
import { WorkshopDetail } from "./pages/WorkshopDetail";
import CreateWorkshopPage from "./pages/CreateWorkshopPage";

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
    component: <WorkshopPage />,
  },
  {
    url: "/employees",
    component: <WorkshopPage />,
  },
];

const detailPages: AppRoute[] = [
  {
    url: "/workshops/:id",
    component: WorkshopDetail,
  },
];

const createPages: AppRoute[] = [
  {
    url: "/workshops/new",
    component: CreateWorkshopPage,
  },
];

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  return (
    <IonApp>
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
            <Redirect from="/" to="/tabs/diary" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
