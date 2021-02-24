import React from "react";
import { IonAvatar, IonItem, IonLabel, IonNote } from "@ionic/react";
import { Event } from "../../models";

const EventListItem: React.FC<{ data: Event }> = ({ data }) => {
  return (
    <IonItem routerLink={`/tabs/diary/${data.id}`} detail={false}>
      <IonAvatar slot="start">
        <img
          alt=""
          src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
        />
      </IonAvatar>
      <IonLabel>
        <h2>
          {data.workshop}・<b>{data.typeCode}</b>
        </h2>
        <p>
          {data.productCode} / {data.sizeCode}
        </p>
      </IonLabel>
      <IonNote slot="end" color="success">
        <h4>{data.quantity}</h4>
      </IonNote>
    </IonItem>
  );
};

export default React.memo(EventListItem);
