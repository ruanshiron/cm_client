import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";

export const CustomerItem: React.FC<{ data: any }> = ({ data }) => {
  return (
    <>
      <IonCard className="product-card">
        <IonCardHeader>
          <IonItem
            button
            detail={false}
            lines="none"
            className="product-item"
            routerLink={`/customers/${data.id}`}
          >
            <IonAvatar slot="start">
              <img
                src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                alt="Speaker profile pic"
              />
            </IonAvatar>
            <IonLabel>
              <h2>{data.name}</h2>
              {data?.from && <p>Tổng hợp từ {data.from}</p>}
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          {/* <IonList lines="none">
            {data.fields.map((field: any) => (
              <IonItem
                detail={false}
                routerLink={`/tabs/product/fields/${field.id}`}
                key={field.name}
              >
                <IonLabel>
                  <h3>{field.name}</h3>
                </IonLabel>
                <IonNote slot="end">
                  <h3>{field.value}</h3>
                </IonNote>
              </IonItem>
            ))}
          </IonList> */}
        </IonCardContent>
      </IonCard>
    </>
  );
};
