import React from "react";
import { IonList, IonItem, IonLabel, useIonRouter } from "@ionic/react";

interface AboutPopoverProps {
  dismiss: () => void;
}

const ReportPopover: React.FC<AboutPopoverProps> = ({ dismiss }) => {
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
      <IonItem button onClick={(e) => open("/tabs/report/new")}>
        <IonLabel>Thêm sản phẩm</IonLabel>
      </IonItem>
    </IonList>
  );
};

export default ReportPopover;
