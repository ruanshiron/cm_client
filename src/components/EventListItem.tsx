import React from "react";
import {
  IonItem,
  IonNote,
} from "@ionic/react";
import Event from "../models/Event";

export const EventListItem: React.FC<{ data: Event }> = ({ data }) => {
  return (
    <IonItem routerLink={`/tabs/diary/${data.id}`} detail={false}>
      <IonNote slot="start">
        <h2>
          <b>{data.productCode}</b>
          <br />
          <small>{data.sizeCode}</small>
        </h2>
      </IonNote>
      <IonNote slot="start" color="dark">
        <h2>
          <b>{data.workshop}</b>
          <br />
          <small></small>
        </h2>
      </IonNote>
      <IonNote slot="end" color="success">
        <h4>{data.quantity}</h4>
      </IonNote>
    </IonItem>
  );
};
