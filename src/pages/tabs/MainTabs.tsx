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
import ProductPage from "./ProductPage";
import OrderPage from "./OrderPage";
import { OrderDetail } from "./OrderDetail";
import { ProductDetail } from "./ProductDetail";
import ProductCreate from "./ProductCreate";
import OrderCreate from "./OrderCreate";
import DashboardPage from "./DashboardPage";
import { ProductUpdate } from "./ProductUpdate";

interface TabPage {
  name: string;
  title: string;
  icon: string;
  path: string;
  index?: ReactElement;
  create?: React.FC;
  update?: React.FC;
  detail?: React.FC;
}

const tabPages: TabPage[] = [
  {
    name: "dashboard",
    title: "Tổng hợp",
    icon: gridSharp,
    path: "/tabs/dashboard",
    index: <DashboardPage />,
  },
  {
    name: "diary",
    title: "Nhật ký",
    icon: calendarSharp,
    path: "/tabs/diary",
    index: <DiaryPage />,
  },
  {
    name: "product",
    title: "Sản phẩm",
    icon: shirtSharp,
    path: "/tabs/product",
    index: <ProductPage />,
    create: ProductCreate,
    detail: ProductDetail,
    update: ProductUpdate,
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
        <Redirect exact path="/tabs" to="/tabs/dashboard" />

        {tabPages
          .filter((tab) => !!tab.index)
          .map((tab, i) => (
            <Route
              key={i}
              path={tab.path}
              render={() => tab.index}
              exact={!!(tab.detail || tab.create || tab.update)}
            />
          ))}

        {tabPages
          .filter((tab) => !!tab.detail)
          .map((tab, i) => (
            <Route
              key={i}
              path={tab.path + "/:id"}
              component={tab.detail}
              exact
            />
          ))}

        {tabPages
          .filter((tab) => !!tab.detail)
          .map((tab, i) => (
            <Route
              key={i}
              path={tab.path + "/:id/update"}
              component={tab.update}
            />
          ))}

        {tabPages
          .filter((tab) => !!tab.create)
          .map((tab, i) => (
            <Route key={i} path={tab.path + "/create"} component={tab.create} />
          ))}
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="tab-bar">
        {tabPages.map((tab, i) => (
          <IonTabButton
            key={i}
            tab={tab.name}
            href={tab.path}
            layout="label-hide"
          >
            <IonIcon size="large" icon={tab.icon} />
            <IonLabel>{tab.title}</IonLabel>
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
