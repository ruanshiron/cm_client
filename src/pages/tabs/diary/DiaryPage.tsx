import {
  IonBadge,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { filterOutline } from "ionicons/icons";
import React, { useState } from "react";
import { EventsViewAll } from "../../../components/EventsViewAll";
import EventFab from "../../../components/fabs/EventFab";
import StageFilterModal from "../../../components/modals/StageFilterModal";
import { useSelector } from "../../../store";

interface DiaryPageProps {}

const DiaryPage: React.FC<DiaryPageProps> = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const hasFilter = useSelector((state) =>
    Object.values(state.diaryPage.stageFilter).reduce(
      (a, b) => !!a || !!b,
      false
    )
  );
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
            <IonButton
              className="notification-button"
              onClick={() => setShowFilterModal(true)}
            >
              <IonIcon slot="icon-only" icon={filterOutline} />
              {hasFilter && (
                <IonBadge className="notifications-badge" color="danger">
                  {" "}
                </IonBadge>
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonProgressBar
        className={isLoading ? "" : "ion-hide"}
        type="indeterminate"
        slot="fixed"
      />
      <EventsViewAll />

      <StageFilterModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      />
    </IonPage>
  );
};

export default DiaryPage;
