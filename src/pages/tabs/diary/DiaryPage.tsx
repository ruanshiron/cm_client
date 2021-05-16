import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { filterOutline, searchSharp } from "ionicons/icons";
import React, { useState } from "react";
import { EventsViewAll } from "../../../components/EventsViewAll";
import EventFab from "../../../components/fabs/EventFab";
import StageFilterModal from "../../../components/modals/StageFilterModal";
import { useSelector } from "../../../store";

interface DiaryPageProps {}

const DiaryPage: React.FC<DiaryPageProps> = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const isLoading = useSelector((state) => state.loading.isLoading);
  return (
    <IonPage id="diary-page">
      <EventFab />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nhật ký</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={searchSharp} />
            </IonButton>
            <IonButton onClick={() => setShowFilterModal(true)}>
              <IonIcon slot="icon-only" icon={filterOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonLoading isOpen={isLoading} />
      <EventsViewAll />

      <StageFilterModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      />
    </IonPage>
  );
};

export default DiaryPage;
