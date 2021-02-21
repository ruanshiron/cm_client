import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonThumbnail,
} from "@ionic/react";
import React from "react";

export const OrderItem: React.FC<{ data: any }> = ({ data }) => {
  return (
    <>
      <IonCard className="order-card">
        <IonCardHeader>
          <IonItem
            button
            detail={false}
            lines="none"
            className="order-item"
            routerLink={`/tabs/order/${data.id}`}
          >
            <IonAvatar slot="start">
              <img
                src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                alt="Speaker profile pic"
              />
            </IonAvatar>
            <IonLabel>
              <h2>{data.name}</h2>
              <p>{data.date}</p>
            </IonLabel>
            <IonThumbnail slot="end">
              <img
                src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                alt="Speaker profile pic"
              />
            </IonThumbnail>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {data.fields.map((field: any, index: number) => (
              <IonItem
                detail={false}
                routerLink={`/tabs/order/fields/${field.id}`}
                key={index}
              >
                <IonLabel>
                  <h3>{field.product.name}・{field.product.size}</h3>
                </IonLabel>
                <IonNote slot="end">
                  <h3>{field.value}</h3>
                </IonNote>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};
