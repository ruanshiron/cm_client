import React, { ReactElement } from "react";
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
import DiaryPage from "./DiaryPage";
import EventDetail from "./EventDetail";
import ProductPage from "./ProductPage";
import OrderPage from "./OrderPage";
import { OrderDetail } from "./OrderDetail";
import { ProductDetail } from "./ProductDetail";
import ProductCreate from "./ProductCreate";
import OrderCreate from "./OrderCreate";
import DashboardPage from "./DashboardPage";

interface TabPage {
  name: string;
  title: string;
  icon: string;
  path: string;
  index?: ReactElement;
  create?: React.FC;
  detail?: React.FC;
}

const tabPages: TabPage[] = [
  {
    name: "diary",
    title: "Nhật ký",
    icon: calendarSharp,
    path: "/tabs/diary",
    index: <DiaryPage />,
    detail: EventDetail,
  },
  {
    name: "dashboard",
    title: "Tổng hợp",
    icon: gridSharp,
    path: "/tabs/dashboard",
    index: <DashboardPage />,
  },
  {
    name: "product",
    title: "Sản phẩm",
    icon: shirtSharp,
    path: "/tabs/product",
    index: <ProductPage />,
    create: ProductCreate,
    detail: ProductDetail,
  },
  {
    name: "order",
    title: "Đơn hàng",
    icon: checkmarkDoneCircleSharp,
    path: "/tabs/order",
    index: <OrderPage />,
    create: OrderCreate,
    detail: OrderDetail,
  },
];

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/diary" />

        {tabPages
          .filter((tab) => !!tab.index)
          .map((tab, i) => (
            <Route key={i} path={tab.path} render={() => tab.index} exact />
          ))}

        {tabPages
          .filter((tab) => !!tab.detail)
          .map((tab, i) => (
            <Route key={i} path={tab.path + "/:id"} component={tab.detail} />
          ))}

        {tabPages
          .filter((tab) => !!tab.create)
          .map((tab, i) => (
            <Route key={i} path={tab.path + "/new"} component={tab.create} />
          ))}
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        {tabPages.map((tab, i) => (
          <IonTabButton key={i}  tab={tab.name} href={tab.path} layout="label-hide">
            <IonIcon size="large" icon={tab.icon} />
            <IonLabel>{tab.title}</IonLabel>
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
