import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVerticalSharp, searchSharp } from "ionicons/icons";
import React, { useState } from "react";
import { EventsViewAll } from "../../../components/EventsViewAll";
import { EventsViewByDay } from "../../../components/EventsViewByDay";
import EventFab from "../../../components/fabs/EventFab";
import { DiaryPagePopover } from "../../../components/popovers/DiaryPagePopover";
import { useSelector } from "../../../store";

interface DiaryPageProps {}

const DiaryPage: React.FC<DiaryPageProps> = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<any>();

  const mode = useSelector((state) => state.diary.mode);

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

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
            <IonButton onClick={presentPopover}>
              <IonIcon slot="icon-only" icon={ellipsisVerticalSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {mode === "all" && <EventsViewAll />}
      {mode === "day" && <EventsViewByDay />} 

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <DiaryPagePopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default DiaryPage;
