import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItemDivider,
  IonLabel,
  IonList,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useSelector } from "../store";
import EventItem from "./items/EventItem";
import * as Event from "../models/event";

interface Props {}

export const EventsViewAll: React.FC<Props> = () => {
  const groups: Event.Group[] = useSelector(
    (state) => state.data.filteredEvents
  );

  return (
    <>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nhật ký</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search"></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonGrid style={{ padding: 0 }}>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2" style={{ padding: 0 }}>
              <IonList lines="none">
                {groups.map((group, i) => (
                  <React.Fragment key={i}>
                    <div className="bulkhead"></div>

                    <div className="border-full" key={i}>
                      <IonItemDivider className="top-divider" color="white">
                        <IonLabel>{group.name}</IonLabel>
                      </IonItemDivider>
                      {group.events.map((item, j) => (
                        <EventItem data={item} key={j} />
                      ))}
                    </div>
                  </React.Fragment>
                ))}
                <div className="last-item"></div>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};
