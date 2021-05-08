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
import EmployeeForm from "../../../components/forms/EmployeeForm";
import { useEmployeeForm } from "../../../hooks/useEmployeeForm";

interface EmployeeCreateProps {}

const EmployeeCreate: React.FC<EmployeeCreateProps> = () => {
  const form = useEmployeeForm();
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/employees"></IonBackButton>
          </IonButtons>
          <IonTitle>Thêm công nhân</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={() => form.submit()}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              <EmployeeForm form={form} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeCreate;
