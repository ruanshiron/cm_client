import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import WorkshopForm from "../../../components/forms/WorkshopForm";
import { useWorkshopForm } from "../../../hooks/useWorkshopForm";

interface WorkshopCreateProps {}

const WorkshopCreate: React.FC<WorkshopCreateProps> = () => {
  const form = useWorkshopForm();
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/workshop"></IonBackButton>
          </IonButtons>
          <IonTitle>Thêm xưởng may</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={form.submit}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2">
              <WorkshopForm form={form} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WorkshopCreate;
