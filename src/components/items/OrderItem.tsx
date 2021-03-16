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
                src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
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
          <IonList lines="none">
            {data.lines.map((line, index) => (
              <IonItem detail={false} key={index}>
                <IonLabel>
                  {products.find((i) => i.id === line.product)?.code}
                </IonLabel>
                <IonLabel slot="end">
                  <p> {line.size}</p>
                </IonLabel>
                <IonNote slot="end">
                  <h3>{line.quantity}</h3>
                </IonNote>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};
