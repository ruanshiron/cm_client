import React from "react";
import { useLocation } from "react-router-dom";
import {
  shirtOutline,
  checkmarkDoneCircleOutline,
  personOutline,
  peopleOutline,
  storefrontOutline,
  settingsOutline,
  cutOutline,
  todayOutline,
  gridOutline,
} from "ionicons/icons";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import "./Menu.scss";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Tổng hợp",
    url: "/tabs/dashboard",
    iosIcon: gridOutline,
    mdIcon: gridOutline,
  },
  {
    title: "Nhật ký",
    url: "/tabs/diary",
    iosIcon: todayOutline,
    mdIcon: todayOutline,
  },
  {
    title: "Sản phẩm",
    url: "/tabs/product",
    iosIcon: shirtOutline,
    mdIcon: shirtOutline,
  },
  {
    title: "Đơn hàng",
    url: "/tabs/order",
    iosIcon: checkmarkDoneCircleOutline,
    mdIcon: checkmarkDoneCircleOutline,
  },
];

const listPages: AppPage[] = [
  {
    title: "Xưởng may",
    url: "/workshops",
    iosIcon: storefrontOutline,
    mdIcon: storefrontOutline,
  },
  {
    title: "Khách hàng",
    url: "/customers",
    iosIcon: personOutline,
    mdIcon: personOutline,
  },
  {
    title: "Nguồn nguyên liệu",
    url: "/materials",
    iosIcon: cutOutline,
    mdIcon: cutOutline,
  },
  {
    title: "Công nhân",
    url: "/employees",
    iosIcon: peopleOutline,
    mdIcon: peopleOutline,
  },
];

const configPages: AppPage[] = [
  {
    title: "Cài đặt",
    url: "/settings",
    iosIcon: settingsOutline,
    mdIcon: settingsOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu id="side-menu" contentId="main" type="overlay" swipeGesture>
      <IonContent>
        <IonList id="tab-list">
          <IonListHeader>Trang Quản Lý</IonListHeader>
          <IonNote>chào quản trị viên</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  lines="none"
                  detail={false}
                  routerDirection="none"
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>
            <IonLabel>Danh sách</IonLabel>
          </IonListHeader>
          {listPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="config-list">
          {configPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
