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
  calendarSharp,
  storefrontOutline,
  peopleCircleOutline,
} from "ionicons/icons";
import DiaryPage from "./diary/DiaryPage";
import ProductPage from "./product/ProductPage";
import { ProductDetail } from "./product/ProductDetail";
import ProductCreate from "./product/ProductCreate";
import ProductUpdate from "./product/ProductUpdate";
import StageDetail from "./diary/StageDetail"
import StageUpdate from "./diary/StageUpdate";
import { ProductStatistic } from "./product/ProductStatistic";
import WorkshopPage from "../resources/workshop/WorkshopPage";
import CustomerPage from "../resources/customer/CustomerPage";
import { WorkshopDetail } from "../resources/workshop/WorkshopDetail";
import { CustomerDetail } from "../resources/customer/CustomerDetail";
import WorkshopUpdate from "../resources/workshop/WorkshopUpdate";
import CustomerUpdate from "../resources/customer/CustomerUpdate";
import WorkshopStatistic from "../resources/workshop/WorkshopStatistic";
import OrderPage from "../resources/customer/orders/OrderPage";
import OrderCreate from "../resources/customer/orders/OrderCreate";
import WorkshopCreate from "../resources/workshop/WorkshopCreate";
import CustomerCreate from "../resources/customer/CustomerCreate";

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/diary" />

        <Route path="/tabs/diary" component={DiaryPage} exact />
        <Route path="/tabs/product" component={ProductPage} exact />
        <Route path="/tabs/workshops" component={WorkshopPage} exact />
        <Route path="/tabs/customers" component={CustomerPage} exact />

        <Route path="/tabs/product/:id" component={ProductDetail} exact />
        <Route path="/tabs/diary/:id" component={StageDetail} exact />
        <Route path="/tabs/workshops/:id" component={WorkshopDetail} exact />
        <Route path="/tabs/customers/:id" component={CustomerDetail} exact />

        <Route path="/tabs/product/:id/update" component={ProductUpdate} exact />
        <Route path="/tabs/diary/:id/update" component={StageUpdate} exact />
        <Route path="/tabs/workshops/:id/update" component={WorkshopUpdate} exact />
        <Route path="/tabs/customers/:id/update" component={CustomerUpdate} exact />

        <Route path="/tabs/workshops/:id/statistic" component={WorkshopStatistic} exact />

        <Route path="/tabs/customers/:id/orders" component={OrderPage} exact />
        <Route path="/tabs/customers/:customerId/orders/create" component={OrderCreate} exact />
        <Route path="/tabs/customers/:customerId/orders/:orderId/update" component={OrderCreate} exact />

        <Route path="/tabs/product/:id/statistic" component={ProductStatistic} exact />

        <Route path="/tabs/product/create" component={ProductCreate} exact />
        <Route path="/tabs/workshops/create" component={WorkshopCreate} exact />
        <Route path="/tabs/customers/create" component={CustomerCreate} exact />
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
        <IonTabButton tab="workshops" href="/tabs/workshops" layout="icon-top">
          <IonIcon size="large" icon={storefrontOutline} />
          <IonLabel>Xưởng</IonLabel>
        </IonTabButton>
        <IonTabButton tab="customers" href="/tabs/customers" layout="icon-top">
          <IonIcon size="large" icon={peopleCircleOutline} />
          <IonLabel>Khách hàng</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
