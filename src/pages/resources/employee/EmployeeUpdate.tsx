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
import React, { useEffect } from "react";
import { useParams } from "react-router";
import EmployeeForm from "../../../components/forms/EmployeeForm";
import { useEmployeeForm } from "../../../hooks/useEmployeeForm";
import { useSelector } from "../../../store";

interface EmployeeUpdateProps {}

const EmployeeUpdate: React.FC<EmployeeUpdateProps> = () => {
  const { id } = useParams<{ id: string }>();
  const employee = useSelector((state) =>
    state.employees.find((i) => i.id === id)
  );
  const form = useEmployeeForm();

  useEffect(() => {
    if (employee) form.setFieldsValue(employee);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/employees"></IonBackButton>
          </IonButtons>
          <IonTitle>Sửa công nhân</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={form.submit}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
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

export default EmployeeUpdate;
