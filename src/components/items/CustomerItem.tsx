import {
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonItem,
  IonLabel,
  useIonActionSheet,
  useIonRouter,
} from "@ionic/react";
import { createOutline, documentsOutline, information } from "ionicons/icons";
import React from "react";
import { Customer } from "../../models/customer";

export const CustomerItem: React.FC<{ data: Customer }> = ({ data }) => {
  const [present] = useIonActionSheet();
  const router = useIonRouter();
  const handleClick = () => {
    present({
      buttons: [
        {
          icon: information,
          text: "Thông tin chi tiết",
          handler: () => router.push("/customers/" + data.id),
        },
        {
          icon: createOutline,
          text: "Thêm đơn hàng",
          handler: () => router.push("/customers/" + data.id + "/orders/create"),
        },
        {
          icon: documentsOutline,
          text: "Danh sách đơn hàng",
          handler: () => router.push("/customers/" + data.id + "/orders"),
        },
      ],
    });
  };
  return (
    <IonCard className="list-card">
      <IonCardHeader>
        <IonItem
          button
          detail={false}
          lines="none"
          className="list-item"
          onClick={() => handleClick()}
        >
          <IonAvatar slot="start">
            <img src="/assets/icon/icon.png" alt="Speaker profile pic" />
          </IonAvatar>
          <IonLabel>
            <h2>{data.name}</h2>
            <p>{data.phonenumber}</p>
          </IonLabel>
        </IonItem>
      </IonCardHeader>
    </IonCard>
  );
};
