import React from "react";
import { useLocation } from "react-router-dom";
import { logOutOutline, todayOutline } from "ionicons/icons";
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
import { useDispatch } from "react-redux";
import { signOut } from "../../store/user/userSlice";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Nhật ký",
    url: "/diary",
    iosIcon: todayOutline,
    mdIcon: todayOutline,
  },
];

const AnonymousMenu: React.FC = () => {
  const location = useLocation();
  const { displayName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(signOut());
  };
  return (
    <IonMenu id="side-menu" contentId="main" type="overlay" swipeGesture>
      <IonContent>
        <IonList id="tab-list">
          <IonListHeader>{"Xin chào " + displayName}</IonListHeader>
          <IonNote>Bạn đang nhập với tư cách nhân viên</IonNote>
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
          <IonItem
            button
            routerDirection="none"
            lines="none"
            detail={false}
            onClick={handleLogOut}
          >
            <IonIcon color="danger" slot="start" icon={logOutOutline} />
            <IonLabel color="danger">Đăng xuất</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default AnonymousMenu;
