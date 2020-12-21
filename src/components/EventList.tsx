import React from "react";
import { IonList, IonLabel, IonListHeader, IonItem } from "@ionic/react";
import EventListItem from "./EventListItem";
import "./EventList.scss";
import { useSelector } from "../store";
import * as _ from "lodash";
import { Event } from "../models/Diary";

export const EventList: React.FC = () => {
  const events: { [key: string]: any } = _.groupBy(
    useSelector((state) => state.diary.events),
    "selectedDate"
  );
  return (
    <IonList lines="none">
      {Object.keys(events)
        .sort(function (a, b) {
          return +new Date(b) - +new Date(a);
        })
        .map((group, i) => (
          <React.Fragment key={i}>
            <IonItem color="light" />

            <IonListHeader>
              <IonLabel>{group}</IonLabel>
            </IonListHeader>
            {events[group].map((item: Event, j: number) => (
              <EventListItem data={item} key={j} />
            ))}
          </React.Fragment>
        ))}

      <IonItem color="light" />
    </IonList>
  );
};
