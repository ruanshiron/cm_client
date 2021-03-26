import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { playForward } from "ionicons/icons";
import React from "react";
import { useSelector } from "../store";
import EventItem from "./items/EventItem";

interface Props {}

export const EventsViewByDay: React.FC<Props> = () => {
  const events = useSelector((state) =>
    state.data.events.filter((_, i) => i < 4)
  );
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonSegment scrollable>
            {[1, 2, 3].map((i) => (
              <IonSegmentButton key={i}>
                <IonLabel>{i}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonFab style={{ top: 82 }} vertical="top" horizontal="end" slot="fixed">
        <IonFabButton size="small">
          <IonIcon icon={playForward} />
        </IonFabButton>
      </IonFab>

      <IonContent>
        <IonGrid style={{ padding: 0 }}>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2" style={{ padding: 0 }}>
              <IonList>
                {events.map((item, j) => (
                  <EventItem data={item} key={j} />
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};
