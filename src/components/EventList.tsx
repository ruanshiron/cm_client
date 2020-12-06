import React from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonItemDivider,
  IonAvatar,
  IonItemGroup,
  IonNote,
} from "@ionic/react";

export const EventList: React.FC<{
  state: { events: { [key: string]: Array<any> } };
}> = ({ state }) => {
  const { events } = state;
  return (
    <IonList lines="none">
      {Object.keys(events).map((group, i) => (
        <IonItemGroup key={i}>
          <IonItemDivider sticky>
            <IonLabel>{group}</IonLabel>
          </IonItemDivider>
          {events[group].map((item, j) => (
            <IonItem key={j}>
              <IonAvatar slot="start">
                <img
                  alt=""
                  src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                />
              </IonAvatar>
              <IonLabel>
                <h2>
                  Xưởng {item.workshop} <b>đã nhận</b>
                </h2>
                <p>{item.note}</p>
              </IonLabel>
              <IonNote slot="end" color="light">
                <h1>{item.quantity}</h1>
                <p>
                  <b>{item.productCode}</b>-{item.sizeCode}
                </p>
              </IonNote>
            </IonItem>
          ))}
        </IonItemGroup>
      ))}
    </IonList>
  );
};
