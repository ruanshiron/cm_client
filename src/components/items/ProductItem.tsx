import {
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";

export const ProductItem: React.FC<{ data: any }> = ({ data }) => {
  return (
    <>
      <IonCard className="list-card">
        <IonCardHeader>
          <IonItem
            button
            detail={false}
            lines="none"
            className="list-item"
            routerLink={`/tabs/product/${data.id}`}
          >
            <IonAvatar slot="start">
              <img
                src="/assets/icon/icon.png"
                alt="Speaker profile pic"
              />
            </IonAvatar>
            <IonLabel>
              <h2>{data.name}</h2>
              {data?.from && <p>Tổng hợp từ {data.from}</p>}
            </IonLabel>
          </IonItem>
        </IonCardHeader>
      </IonCard>
    </>
  );
};
