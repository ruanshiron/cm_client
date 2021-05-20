import React from "react";
import { useLocation } from "react-router-dom";
import {
  shirtOutline,
  personOutline,
  peopleOutline,
  storefrontOutline,
  settingsOutline,
  cutOutline,
  todayOutline,
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
import { useSelector } from "../../store";

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
    iosIcon: todayOutline,
    mdIcon: todayOutline,
  },
];

const listPages: AppPage[] = [
  {
    title: "Sản phẩm",
    url: "/tabs/product",
    iosIcon: shirtOutline,
    mdIcon: shirtOutline,
  },
  {
    title: "Xưởng may",
    url: "/tabs/workshops",
    iosIcon: storefrontOutline,
    mdIcon: storefrontOutline,
  },
  {
    title: "Khách hàng",
    url: "/tabs/customers",
    iosIcon: personOutline,
    mdIcon: personOutline,
  },
];

const extraPages: AppPage[] = [
  {
    title: "Công nhân",
    url: "/employees",
    iosIcon: peopleOutline,
    mdIcon: peopleOutline,
  },
  {
    title: "Quy trình sản xuất",
    url: "/processes",
    iosIcon: cutOutline,
    mdIcon: cutOutline,
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
  const { displayName, email } = useSelector((state) => state.user);

  return (
    <IonMenu id="side-menu" contentId="main" type="overlay" swipeGesture>
      <IonContent>
        <IonList id="tab-list">
          <IonListHeader>{"Xin chào " + displayName}</IonListHeader>
          <IonNote>{email}</IonNote>

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname.includes(appPage.url) ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  lines="none"
                  detail={false}
                  // routerDirection="none"
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
                    location.pathname.includes(appPage.url) ? "selected" : ""
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

        <IonList id="labels-list">
          <IonListHeader>
            <IonLabel>Mở rộng</IonLabel>
          </IonListHeader>
          {extraPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname.includes(appPage.url) ? "selected" : ""
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
