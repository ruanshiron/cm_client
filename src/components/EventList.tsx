import React from "react";
import { IonList, IonLabel, IonListHeader, IonItem } from "@ionic/react";
import { EventListItem } from "./EventListItem";
import "./EventList.scss";

export const EventList: React.FC<{
  state: { events: { [key: string]: Array<any> } };
}> = ({ state }) => {
  const { events } = state;
  return (
    <IonList lines="none">
      {Object.keys(events).map((group, i) => (
        <React.Fragment key={i}>
          <IonItem color="light" />

          <IonListHeader>
            <IonLabel>{group}</IonLabel>
          </IonListHeader>
          {events[group].map((item, j) => (
            <EventListItem data={item} key={j} />
          ))}
        </React.Fragment>
      ))}

      <IonItem color="light" />
    </IonList>
  );
};
