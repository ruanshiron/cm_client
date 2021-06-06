import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
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
    <IonCard style={{ boxShadow: "none" }} className="list-card border-full">
      <IonCardContent>
        <IonList lines="none" style={{ border: "none" }}>
          <IonItem button routerLink={`${baseUrl}/${id}`}>
            <IonAvatar slot="start">
              <img src="/assets/icon/icon.png" alt="Speaker profile pic" />
            </IonAvatar>
            <IonLabel>
              <b>{title}</b>
              <p>{subtitle}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
