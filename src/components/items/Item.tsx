import {
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";

interface Props {
  title: string;
  subtitle: string;
  baseUrl?: string;
  id?: string;
}

export const Item: React.FC<Props> = ({ title, subtitle, baseUrl, id }) => {
  return (
    <>
      <IonCard className="list-card">
        <IonCardHeader>
          <IonItem
            button
            detail={false}
            lines="none"
            className="list-item"
            routerLink={`${baseUrl}/${id}`}
          >
            <IonAvatar slot="start">
              <img src="/assets/icon/icon.png" alt="Speaker profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>
      </IonCard>
    </>
  );
};
