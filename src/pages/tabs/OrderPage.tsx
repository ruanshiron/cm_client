import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVerticalSharp } from "ionicons/icons";
import React from "react";
import { OrderItem } from "../../components/OrderItem";
import "./OrderPage.scss"

const orders = [
  {
    id: 0,
    name: "Khách hàng 1",
    date: "2020-12-12",
    fields: [
      {
        product: {
          name: "Sản phẩm 1",
          size: "XL"
        },
        value: 200,
      },
      {
        product: {
          name: "Sản phẩm 2",
          size: "L"
        },
        value: 120,
      },
    ],
  },
  {
    id: 1,
    name: "Khách hàng 2",
    date: "2020-12-12",
    fields: [
      {
        product: {
          name: "Sản phẩm 1",
          size: "XL"
        },
        value: 200,
      },
      {
        product: {
          name: "Sản phẩm 2",
          size: "L"
        },
        value: 120,
      },
    ],
  },
];

interface OrderPageProps {}

const OrderPage: React.FC<OrderPageProps> = () => {
  return (
    <IonPage id="order-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Đơn Hàng</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisVerticalSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Speakers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow>
            {orders.map((product) => (
              <IonCol size="12" size-md="6" key={product.id}>
                <OrderItem data={product} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OrderPage;
