import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { filterOutline, searchSharp } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EventsViewAll } from "../../../components/EventsViewAll";
import EventFab from "../../../components/fabs/EventFab";
import StageFilterModal from "../../../components/modals/StageFilterModal";
import { fetchAllStages } from "../../../store/data/stageSlice";

interface DiaryPageProps {}

const DiaryPage: React.FC<DiaryPageProps> = () => {
  const dispatch = useDispatch();
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllStages());
  }, [dispatch]);

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

      <EventsViewAll />

      <StageFilterModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      />
    </IonPage>
  );
};

export default DiaryPage;
