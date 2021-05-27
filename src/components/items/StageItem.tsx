import { IonItem, IonLabel, IonNote, IonText } from "@ionic/react";
import React from "react";
import { Stage } from "../../models/stage";

export const color = (status?: string) => {
  if (!status) return "primary";
  if (status.endsWith("fulfilled")) return "success";
  if (status.endsWith("pending")) return "warning";
  if (status.endsWith("rejected")) return "danger";
};

const StageItem: React.FC<{ stage: Stage }> = ({ stage }) => {
  return (
    <IonItem
      onClick={() => {}}
      className="fadin"
      routerLink={"/tabs/diary/" + stage.id}
      detail={false}
    >
      <IonLabel className={color(stage.processStatus)}>
        <h2>{stage.workshopName}</h2>
        <p>
          {stage.productName} / {stage.productSize}{stage.productSizes?.join(", ")}
        </p>
      </IonLabel>
      <IonNote
        className="ion-text-right"
        slot="end"
        color={color(stage.processStatus)}
      >
        <IonText>{stage.processLabel}</IonText>
        <br />
        <IonText style={{ fontSize: 18, fontWeight: 700 }}>
          {stage.quantity}
        </IonText>
      </IonNote>
    </IonItem>
  );
};

export default React.memo(StageItem);
