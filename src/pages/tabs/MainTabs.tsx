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
  shirtSharp,
  checkmarkDoneCircleSharp,
  calendarSharp,
} from "ionicons/icons";
import DiaryPage from "./diary/DiaryPage";
import ProductPage from "./product/ProductPage";
import { ProductDetail } from "./product/ProductDetail";
import ProductCreate from "./product/ProductCreate";
import ProductUpdate from "./product/ProductUpdate";
import StageDetail from "./diary/StageDetail"
import StageUpdate from "./diary/StageUpdate";
import { ProductStatistic } from "./product/ProductStatistic";

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/diary" />

        <Route path="/tabs/diary" component={DiaryPage} exact />
        <Route path="/tabs/product" component={ProductPage} exact />

        <Route path="/tabs/product/:id" component={ProductDetail} exact />
        <Route path="/tabs/diary/:id" component={StageDetail} exact />

        <Route path="/tabs/product/:id/update" component={ProductUpdate} exact />
        <Route path="/tabs/diary/:id/update" component={StageUpdate} exact />

        <Route path="/tabs/product/:id/statistic" component={ProductStatistic} exact />

        <Route path="/tabs/product/create" component={ProductCreate} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="tab-bar">
        {/* <IonTabButton tab="dashboard" href="/tabs/dashboard" layout="label-hide" >
          <IonIcon size="large" icon={gridSharp} />
          <IonLabel>Tổng hợp</IonLabel>
        </IonTabButton> */}
        <IonTabButton tab="diary" href="/tabs/diary" layout="icon-top">
          <IonIcon size="large" icon={calendarSharp} />
          <IonLabel>Nhật ký</IonLabel>
        </IonTabButton>
        <IonTabButton tab="product" href="/tabs/product" layout="icon-top">
          <IonIcon size="large" icon={shirtSharp} />
          <IonLabel>Sản phẩm</IonLabel>
        </IonTabButton>
        <IonTabButton tab="order" href="/tabs/order" layout="icon-top">
          <IonIcon size="large" icon={checkmarkDoneCircleSharp} />
          <IonLabel>Đơn hàng</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
