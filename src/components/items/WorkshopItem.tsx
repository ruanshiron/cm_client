import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";
import * as Workshop from "../../models/workshop";

export const WorkshopItem: React.FC<{ data: Workshop.Skeleton }> = ({
  data,
}) => {
  return (
    <>
      <IonCard className="list-card">
        <IonCardHeader>
          <IonItem
            button
            detail={false}
            lines="none"
            className="list-item"
            routerLink={`/workshops/${data.id}`}
          >
            <IonAvatar slot="start">
              <img src="/assets/icon/icon.png" alt="Speaker profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{data.name}</h2>
              {/* <p>Tổng hợp từ {data.from}</p> */}
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          {/* <IonList lines="none">
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
          </IonList> */}
        </IonCardContent>
      </IonCard>
    </>
  );
};
