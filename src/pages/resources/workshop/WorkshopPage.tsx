import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";
import React, { useState } from "react";
import { Item } from "../../../components/items/Item";
import { WorkshopPagePopover } from "../../../components/popovers/WorkshopPagePopover";
import { useSelector } from "../../../store";

interface WorkshopPageProps {}

const WorkshopPage: React.FC<WorkshopPageProps> = () => {
  const workshops = useSelector((state) => state.workshops);

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<any>();

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Xưởng</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={presentPopover}>
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Xưởng</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow>
            {workshops.map((workshop) => (
              <IonCol size="12" size-md="6" key={workshop.id}>
                <Item
                  title={workshop.name!}
                  subtitle={workshop.phonenumber!}
                  id={workshop.id}
                  baseUrl="/workshops"
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <WorkshopPagePopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default WorkshopPage;
