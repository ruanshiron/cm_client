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
import CustomerForm from "../../../components/forms/CustomerForm";
import { useCustomerForm } from "../../../hooks/useCustomerForm";
import { useSelector } from "../../../store";

interface CustomerUpdateProps {}

const CustomerUpdate: React.FC<CustomerUpdateProps> = () => {
  const { id } = useParams<{ id: string }>();
  const customer = useSelector((state) =>
    state.customers.find((i) => i.id === id)
  );
  const form = useCustomerForm();

  useEffect(() => {
    if (customer) form.setFieldsValue(customer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/customers"></IonBackButton>
          </IonButtons>
          <IonTitle>Sửa khách hàng</IonTitle>
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
              <CustomerForm form={form} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CustomerUpdate;
