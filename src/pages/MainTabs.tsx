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
import { WorkshopDetail } from "./WorkshopDetail";
import { OrderDetail } from "./OrderDetail";
import { ReportDetail } from "./ReportDetail";
import CreateProductPage from "./CreateProductPage";

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect from="/tabs" to="/tabs/diary" exact />

        <Route path="/tabs/diary" render={() => <DiaryPage />} exact />
        <Route path="/tabs/report" render={() => <ReportPage />} exact />
        <Route path="/tabs/order" render={() => <OrderPage />} exact />
        <Route path="/tabs/account" render={() => <AccountPage />} exact />

        <Route path="/tabs/diary/:id" component={EventDetail} />
        <Route path="/tabs/workshops/:id" component={WorkshopDetail} />
        <Route path="/tabs/order/:id" component={OrderDetail} />
        <Route path="/tabs/report/:id" component={ReportDetail} />

        <Route path="/tabs/report/new" component={CreateProductPage} exact />
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
