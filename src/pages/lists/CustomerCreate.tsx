import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useCustomerForm } from "../../hooks/useCustomerForm";

interface CustomerCreateProps {}

const CustomerCreate: React.FC<CustomerCreateProps> = () => {
  const form = useCustomerForm();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/workshop"></IonBackButton>
          </IonButtons>
          <IonTitle>Thêm khách hàng</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={form.submit}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <div className="ion-padding-top ion-padding-start"></div>
        <IonItem>
          <IonLabel position="floating">Tên</IonLabel>
          <IonInput
            onIonChange={(e) => form.setFieldsValue({ name: e.detail.value! })}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Số điện thoại</IonLabel>
          <IonInput
            onIonChange={(e) =>
              form.setFieldsValue({ phonenumber: e.detail.value! })
            }
          ></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default CustomerCreate;
