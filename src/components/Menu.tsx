import React from "react";
import { useLocation } from "react-router-dom";
import {
  calendar,
  shirtOutline,
  checkmarkDoneCircleOutline,
  personCircleOutline,
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
    title: "Nhật ký",
    url: "/tabs/diary",
    iosIcon: calendar,
    mdIcon: calendar,
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
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline,
  },
  {
    title: "Khách hàng",
    url: "/customers",
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline,
  },
  {
    title: "Công nhân",
    url: "/employees",
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline,
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
