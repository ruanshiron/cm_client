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
  gridSharp,
} from "ionicons/icons";
import DiaryPage from "./diary/DiaryPage";
import ProductPage from "./product/ProductPage";
import OrderPage from "./order/OrderPage";
import { OrderDetail } from "./order/OrderDetail";
import { ProductDetail } from "./product/ProductDetail";
import ProductCreate from "./product/ProductCreate";
import OrderCreate from "./order/OrderCreate";
import DashboardPage from "./dashboard/DashboardPage";
import { ProductUpdate } from "./product/ProductUpdate";

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/diary" />

        <Route path="/tabs/dashboard" render={() => <DashboardPage />} exact />
        <Route path="/tabs/diary" render={() => <DiaryPage />} />
        <Route path="/tabs/product" render={() => <ProductPage />} />
        <Route path="/tabs/order" render={() => <OrderPage />} />

        <Route path="/tabs/product/:id" component={ProductDetail} exact />
        <Route path="/tabs/product/:id/update" component={ProductUpdate} exact />
        <Route path="/tabs/product/:id/create" component={ProductCreate} exact />

        <Route path="/tabs/order/:id" component={OrderDetail} exact />
        <Route path="/tabs/order/:id/create" component={OrderCreate} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="tab-bar">
        <IonTabButton tab="dashboard" href="/tabs/dashboard" layout="label-hide" >
          <IonIcon size="large" icon={gridSharp} />
          <IonLabel>Tổng hợp</IonLabel>
        </IonTabButton>
        <IonTabButton tab="diary" href="/tabs/diary" layout="label-hide">
          <IonIcon size="large" icon={calendarSharp} />
          <IonLabel>Nhật ký</IonLabel>
        </IonTabButton>
        <IonTabButton tab="product" href="/tabs/product" layout="label-hide">
          <IonIcon size="large" icon={shirtSharp} />
          <IonLabel>Sản phẩm</IonLabel>
        </IonTabButton>
        <IonTabButton tab="order" href="/tabs/order" layout="label-hide">
          <IonIcon size="large" icon={checkmarkDoneCircleSharp} />
          <IonLabel>Đơn hàng</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
