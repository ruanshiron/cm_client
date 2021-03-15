import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVerticalSharp } from "ionicons/icons";
import React from "react";
import "./DashboardPage.scss";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tổng hợp</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisVerticalSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeXl="3" sizeMd="6" size="6" style={{ padding: 0 }}>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Hoàn thiện</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText color="dark">
                    <h1>12345</h1>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol sizeXl="3" sizeMd="6" size="6" style={{ padding: 0 }}>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Bán</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText color="dark">
                    <h1>12345</h1>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol sizeXl="3" sizeMd="6" size="6" style={{ padding: 0 }}>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Thêu</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText color="dark">
                    <h1>12345</h1>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol sizeXl="3" sizeMd="6" size="6" style={{ padding: 0 }}>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Lỗi</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText color="dark">
                    <h1>12345</h1>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" style={{ padding: 0 }}>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                  <IonCardTitle>Card Title</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Keep close to Nature's heart... and break clear away, once in
                  awhile, and climb a mountain or spend a week in the woods.
                  Wash your spirit clean.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
