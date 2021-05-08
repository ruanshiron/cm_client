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
import CustomerForm from "../../../components/forms/CustomerForm";
import { useCustomerForm } from "../../../hooks/useCustomerForm";

interface CustomerCreateProps {}

const CustomerCreate: React.FC<CustomerCreateProps> = () => {
  const form = useCustomerForm();
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/workshops"></IonBackButton>
          </IonButtons>
          <IonTitle>Thêm khách hàng</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={() => form.submit()}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2">
              <CustomerForm form={form} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CustomerCreate;
