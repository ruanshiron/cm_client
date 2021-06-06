import {
  IonBadge,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { filterOutline } from "ionicons/icons";
import React, { useState } from "react";
import { EventsViewAll } from "../../../components/EventsViewAll";
import StageFab from "../../../components/fabs/StageFab";
import StageFilterModal from "../../../components/modals/StageFilterModal";
import PendingStageList from "../../../components/PendingStageList";
import { useSelector } from "../../../store";

interface DiaryPageProps {}

const DiaryPage: React.FC<DiaryPageProps> = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [segemnt, setSegment] = useState<string>("all");
  const hasFilter = useSelector((state) =>
    Object.values(state.diaryPage.stageFilter).reduce(
      (a, b) => !!a || !!b,
      false
    )
  );
  const isLoading = useSelector((state) => state.loading.isLoading);
  return (
    <IonPage id="diary-page">
      {/* <EventFab /> */}
      <StageFab />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nhật ký</IonTitle>
          {segemnt === "all" && (
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
          )}
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={segemnt}
            onIonChange={(e) => setSegment(e.detail.value!)}
          >
            <IonSegmentButton value="all">Tất cả</IonSegmentButton>
            <IonSegmentButton value="pending">Đang đợi</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonProgressBar
        className={isLoading ? "" : "ion-hide"}
        type="indeterminate"
        slot="fixed"
      />
      {segemnt === "all" && <EventsViewAll />}
      {segemnt === "pending" && <PendingStageList />}
      <StageFilterModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      />
    </IonPage>
  );
};

export default DiaryPage;
