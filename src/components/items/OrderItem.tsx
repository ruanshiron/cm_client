import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import React from "react";
import { Order } from "../../models";
import { useSelector } from "../../store";
import { formatDate } from "../../utils/date";

export const OrderItem: React.FC<{ data: Order }> = ({ data }) => {
  const customer = useSelector((state) =>
    state.data.customers.find((i) => i.id === data.customer)
  );

  const products = useSelector((state) => state.data.products);

  return (
    <>
      <IonCard
        button
        className="list-card"
        routerLink={`/tabs/order/${data.id}`}
      >
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="list-item">
            <IonAvatar slot="start">
              <img
                src="/assets/icon/icon.png"
                alt="Speaker profile pic"
              />
            </IonAvatar>
            <IonLabel>
              <h2>{customer?.name}</h2>
              <p>{formatDate(data.createdAt)}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="inset">
            {data.lines.map((line, index) => (
              <IonItem detail={false} key={index}>
                <IonLabel>
                  {products.find((i) => i.id === line.product)?.code}
                </IonLabel>
                <IonLabel slot="end">{line.size}</IonLabel>
                <IonText slot="end">
                  <p>{line.quantity}</p>
                </IonText>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};
