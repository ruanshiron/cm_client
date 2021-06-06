import { IonItem, IonLabel, IonNote, IonText } from "@ionic/react";
import React from "react";
import { Stage } from "../../models/stage";
import { color } from "./StageItem";

const EmployeeStageItem: React.FC<{ stage: Stage; onClick: () => void }> = ({
  stage,
  onClick,
}) => {
  return (
    <IonItem button onClick={() => onClick()} className="fadin" detail={false}>
      <IonLabel className={color(stage.processStatus)}>
        <h2>{stage.workshopName}</h2>
        <p>
          {stage.productName} / {stage.productSize}
          {stage.productSizes?.join(", ")}
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

export default React.memo(EmployeeStageItem);
