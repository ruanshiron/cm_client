import React from "react";
import { IonList, IonItem, IonLabel, useIonRouter } from "@ionic/react";

interface OrderPagePopoverProps {
  dismiss: () => void;
}

export const OrderPagePopover: React.FC<OrderPagePopoverProps> = ({ dismiss }) => {
  const router = useIonRouter();

  // eslint-disable-next-line
  const close = (url: string) => {
    window.open(url, "_blank");
    dismiss();
  };

  const open = (url: string) => {
    router.push(url);
    dismiss();
  };

  return (
    <IonList>
      <IonItem button onClick={(e) => open("/tabs/order/create")}>
        <IonLabel>Thêm đơn hàng</IonLabel>
      </IonItem>
    </IonList>
  );
};
