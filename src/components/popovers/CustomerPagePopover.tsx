import React from "react";
import { IonList, IonItem, IonLabel, useIonRouter } from "@ionic/react";

interface CustomerPagePopoverProps {
  dismiss: () => void;
}

export const CustomerPagePopover: React.FC<CustomerPagePopoverProps> = ({ dismiss }) => {
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
      <IonItem button onClick={(e) => open("/customers/create")}>
        <IonLabel>Thêm khách hàng</IonLabel>
      </IonItem>
    </IonList>
  );
};
