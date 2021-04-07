import {
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logOutOutline, optionsOutline } from "ionicons/icons";
import React from "react";
import { useDispatch } from "react-redux";

import { signOut } from "../../store/userSlice";

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  const dispatch = useDispatch();
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Cài đặt</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2">
              <IonCard className="list-card">
                <IonCardHeader>
                  <IonItem
                    button
                    detail={false}
                    lines="none"
                    className="list-item small"
                    routerLink="/settings/processes"
                  >
                    <IonIcon icon={optionsOutline} slot="start"></IonIcon>
                    <IonLabel slot="start">
                      <h2>Quy trình</h2>
                    </IonLabel>
                  </IonItem>
                </IonCardHeader>
              </IonCard>
              <IonCard className="list-card">
                <IonCardHeader>
                  <IonItem
                    button
                    detail={false}
                    lines="none"
                    className="list-item small"
                    onClick={() => dispatch(signOut())}
                  >
                    <IonIcon
                      icon={logOutOutline}
                      slot="start"
                      color="danger"
                    ></IonIcon>
                    <IonLabel slot="start" color="danger">
                      <h2>Đăng xuất</h2>
                    </IonLabel>
                  </IonItem>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
