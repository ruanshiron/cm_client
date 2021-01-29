import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import React from "react";

export const WorkshopItem: React.FC<{ data: any }> = ({ data }) => {
  return (
    <>
      <IonCard className="workshop-card">
        <IonCardHeader>
          <IonItem
            button
            detail={false}
            lines="none"
            className="workshop-item"
            routerLink={`/tabs/workshop/${data.id}`}
          >
            <IonAvatar slot="start">
              <img
                src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                alt="Speaker profile pic"
              />
            </IonAvatar>
            <IonLabel>
              <h2>{data.name}</h2>
              <p>Tổng hợp từ {data.from}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {data.fields.map((field: any) => (
              <IonItem
                detail={false}
                routerLink={`/tabs/workshop/fields/${field.id}`}
                key={field.name}
              >
                <IonLabel>
                  <h3>{field.name}</h3>
                </IonLabel>
                <IonNote slot="end">
                  <h3>{field.value} VND</h3>
                </IonNote>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};
