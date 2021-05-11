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
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import OrderForm from "../../../../components/forms/OrderForm";
import { useOrderForm } from "../../../../hooks/useOrderForm";
import { useSelector } from "../../../../store";
import { findCustomerById } from "../../../../store/data/customerSlice";

interface OrderCreateProps {}

const OrderCreate: React.FC<OrderCreateProps> = () => {
  const { customerId, orderId } = useParams<{
    customerId: string;
    orderId?: string;
  }>();
  const form = useOrderForm(customerId);
  const dispatch = useDispatch();
  const customer = useSelector((state) =>
    state.customers.find((item) => item.id === customerId)
  );
  const order = useSelector((state) =>
    state.orders.find((item) => item.id === orderId)
  );
  useEffect(() => {
    if (!customer) dispatch(findCustomerById(customerId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (order) form.setFieldsValue(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/product"></IonBackButton>
          </IonButtons>
          <IonTitle>Thêm đơn hàng của {customer?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={() => form.submit()}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2">
              <OrderForm form={form} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OrderCreate;
