import React from "react";
import { IonList, IonLabel, IonListHeader, IonItem } from "@ionic/react";
import EventListItem from "./items/EventListItem";
import "./EventList.scss";
import { useSelector } from "../store";
import { Event, EventGroup } from "../models";

export const EventList: React.FC = () => {
  const groups: EventGroup[] = useSelector((state) => state.data.filteredEvents);
  return (
    <IonList lines="none">
      {groups.map((group, i) => (
        <React.Fragment key={i}>
          <IonItem color="light" />

          <IonListHeader>
            <IonLabel>{group.name}</IonLabel>
          </IonListHeader>
          {group.events.map((item: Event, j: number) => (
            <EventListItem data={item} key={j} />
          ))}
        </React.Fragment>
      ))}

      <IonItem color="light" />
    </IonList>
  );
};
