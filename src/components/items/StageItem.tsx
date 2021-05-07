import { IonItem, IonLabel, IonNote } from "@ionic/react";
import React from "react";
import { Stage } from "../../models/stage";

const color = (status?: string) => {
  if (!status) return "primary";
  if (status.endsWith("fulfilled")) return "success";
  if (status.endsWith("pending")) return "warning";
  if (status.endsWith("rejected")) return "danger";
};

const StageItem: React.FC<{ stage: Stage }> = ({ stage }) => {
  return (
    <IonItem
      onClick={() => {}}
      routerLink={"/tabs/diary/" + stage.id}
      detail={false}
    >
      <IonLabel className={color(stage.processStatus)}>
        <h2>
          {stage.workshopName}・<b>{stage.processLabel}</b>
        </h2>
        <p>
          {stage.productName} / {stage.productSize}
        </p>
      </IonLabel>
      <IonNote slot="end" color={color(stage.processStatus)}>
        <h4>{stage.quantity}</h4>
      </IonNote>
    </IonItem>
  );
};

export default React.memo(StageItem);
