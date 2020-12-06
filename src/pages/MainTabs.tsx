import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import {
  calendar,
  newspaperOutline,
  checkmarkDoneCircleOutline,
  personCircleOutline,
} from "ionicons/icons";
import DiaryPage from "./DiaryPage";
import EventDetail from "./EventDetail";
import ReportPage from "./ReportPage";
import OrderPage from "./OrderPage";
import AccountPage from "./AccountPage";

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect from="/tabs" to="/tabs/diary" exact />
        <Route path="/tabs/diary" render={() => <DiaryPage />} exact={true} />
        <Route path="/tabs/diary/:id" component={EventDetail} />
        <Route path="/tabs/report" render={() => <ReportPage />} exact={true} />
        <Route path="/tabs/order" render={() => <OrderPage />} exact={true} />
        <Route
          path="/tabs/account"
          render={() => <AccountPage />}
          exact={true}
        />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="diary" href="/tabs/diary" layout="label-hide">
          <IonIcon size="large" icon={calendar} />
          <IonLabel>Nhật ký</IonLabel>
        </IonTabButton>
        <IonTabButton tab="report" href="/tabs/report" layout="label-hide">
          <IonIcon size="large" icon={newspaperOutline} />
          <IonLabel>Báo cáo</IonLabel>
        </IonTabButton>
        <IonTabButton tab="order" href="/tabs/order" layout="label-hide">
          <IonIcon size="large" icon={checkmarkDoneCircleOutline} />
          <IonLabel>Đơn hàng</IonLabel>
        </IonTabButton>
        <IonTabButton tab="account" href="/tabs/account" layout="label-hide">
          <IonIcon size="large" icon={personCircleOutline} />
          <IonLabel>Tài khoản</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
