import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVerticalSharp } from "ionicons/icons";
import React from "react";
import EventFormModal from "../../components/EventFormModal";
import { EventList } from "../../components/EventList";

interface DiaryPageProps {}

const DiaryPage: React.FC<DiaryPageProps> = (props) => {
  return (
    <IonPage>
      <EventFormModal />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nhật ký</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisVerticalSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nhật ký</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search"></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <EventList />
      </IonContent>
    </IonPage>
  );
};

export default DiaryPage;
