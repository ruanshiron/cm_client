import { IonInput, IonItem, IonLabel } from "@ionic/react";
import React from "react";

interface ProcessFormProps {}

const ProcessForm: React.FC<ProcessFormProps> = () => {
  return (
    <>
      <IonItem>
        <IonLabel slot="start">Tên quy trình</IonLabel>
        <IonInput></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Tên quy trình</IonLabel>
        <IonInput></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Tên quy trình</IonLabel>
        <IonInput></IonInput>
      </IonItem>
    </>
  );
};

export default ProcessForm;
