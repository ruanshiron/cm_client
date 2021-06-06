import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
} from "@ionic/react";
import { shirtOutline } from "ionicons/icons";
import React from "react";
import { Customer } from "../../models/customer";
import { formatStringDate } from "../../utils/date";

export const CustomerItem: React.FC<{ data: Customer }> = ({ data }) => {
  return (
    <IonCard
      button
      style={{ boxShadow: "none" }}
      className="list-card border-full"
      routerLink={"/tabs/customers/" + data.id}
    >
      <IonCardContent>
        <IonList style={{ border: "none" }}>
          <IonItem detail={false}>
            <IonAvatar slot="start">
              <img src="/assets/icon/icon.png" alt="Speaker profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{data.name}</h2>
              <p>{data.phonenumber}</p>
            </IonLabel>
          </IonItem>
          {data.mostRecentOrder && (
            <>
              <IonListHeader>
                <b>
                  <small>
                    Đơn hàng gần đây nhất&nbsp;
                    {formatStringDate(data.mostRecentOrder?.date)}
                  </small>
                </b>
              </IonListHeader>
              {data.mostRecentOrder?.lines.map((line, index) => (
                <IonItem detail={false} key={index}>
                  <IonIcon icon={shirtOutline} slot="start" />
                  <IonLabel slot="start">
                    {line.productName}・{line.size}
                  </IonLabel>
                  <IonNote slot="end">
                    <p>{line.quantity}&nbsp;sp</p>
                  </IonNote>
                </IonItem>
              ))}
            </>
          )}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
