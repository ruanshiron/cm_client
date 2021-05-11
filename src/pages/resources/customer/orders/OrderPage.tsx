import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { OrderItem } from "../../../../components/items/OrderItem";
import { useSelector } from "../../../../store";
import { fetchAllOrdersByCustomer } from "../../../../store/data/orderSlice";

interface OrderPageProps {}

const OrderPage: React.FC<OrderPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const router = useIonRouter();
  const orders = useSelector((state) => state.orders);
  const customer = useSelector((state) =>
    state.customers.find((item) => item.id === id)
  );

  useEffect(() => {
    if (orders.length <= 0) dispatch(fetchAllOrdersByCustomer(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={"/customers/" + id} />
          </IonButtons>
          <IonTitle>Đơn hàng của {customer?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={router.routeInfo.pathname + "/create"}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeLg="8">
              {orders.map((order) => (
                <OrderItem order={order} />
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OrderPage;
