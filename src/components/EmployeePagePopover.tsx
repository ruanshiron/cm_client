import React from "react";
import { IonList, IonItem, IonLabel, useIonRouter } from "@ionic/react";

interface EmployeePagePopoverProps {
  dismiss: () => void;
}

export const EmployeePagePopover: React.FC<EmployeePagePopoverProps> = ({ dismiss }) => {
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
      <IonItem button onClick={(e) => open("/employees/new")}>
        <IonLabel>Thêm sản phẩm</IonLabel>
      </IonItem>
    </IonList>
  );
};
