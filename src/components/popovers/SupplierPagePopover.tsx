import React from "react";
import { IonList, IonItem, IonLabel, useIonRouter } from "@ionic/react";

export const SupplierPagePopover: React.FC<{
  dismiss: () => void;
}> = ({ dismiss }) => {
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
      <IonItem button onClick={(e) => open("/suppliers/create")}>
        <IonLabel>Thêm nguồn nguyên liệu</IonLabel>
      </IonItem>
    </IonList>
  );
};
