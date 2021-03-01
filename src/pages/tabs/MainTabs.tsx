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
  shirtOutline,
  checkmarkDoneCircleOutline,
  todayOutline,
} from "ionicons/icons";
import DiaryPage from "./DiaryPage";
import EventDetail from "./EventDetail";
import ProductPage from "./ProductPage";
import OrderPage from "./OrderPage";
import { OrderDetail } from "./OrderDetail";
import { ProductDetail } from "./ProductDetail";
import ProductCreate from "./ProductCreate";

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/diary" />

        <Route path="/tabs/diary" render={() => <DiaryPage />} exact />
        <Route path="/tabs/product" render={() => <ProductPage />} exact />
        <Route path="/tabs/order" render={() => <OrderPage />} exact />
        {/* <Route path="/tabs/workshop" render={() => <AccountPage />} exact /> */}

        <Route path="/tabs/diary/:id" component={EventDetail} />
        <Route path="/tabs/order/:id" component={OrderDetail} />
        <Route path="/tabs/product/:id" component={ProductDetail} />

        <Route path="/tabs/product/new" component={ProductCreate} exact />
        {/* <Route path="/tabs/workshop/new" component={CreateWorkshopPage} exact /> */}
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="diary" href="/tabs/diary" layout="label-hide">
          <IonIcon size="large" icon={todayOutline} />
          <IonLabel>Nhật ký</IonLabel>
        </IonTabButton>
        <IonTabButton tab="product" href="/tabs/product" layout="label-hide">
          <IonIcon size="large" icon={shirtOutline} />
          <IonLabel>Sản phẩm</IonLabel>
        </IonTabButton>
        <IonTabButton tab="order" href="/tabs/order" layout="label-hide">
          <IonIcon size="large" icon={checkmarkDoneCircleOutline} />
          <IonLabel>Đơn hàng</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="workshop" href="/tabs/workshop" layout="label-hide">
          <IonIcon size="large" icon={personCircleOutline} />
          <IonLabel>Xưởng may</IonLabel>
        </IonTabButton> */}
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
