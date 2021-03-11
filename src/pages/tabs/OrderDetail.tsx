import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRow,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import { shareOutline, shareSharp } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";
import { useSelector } from "../../store";
import { formatDate } from "../../utils/date";

import "./OrderDetail.scss";

interface OrderDetailProps {}

export const OrderDetail: React.FC<OrderDetailProps> = () => {
  const { id } = useParams<{ id: string }>();

  const order = useSelector((state) =>
    state.data.orders.find((i) => i.id === id)
  );

  const customer = useSelector((state) =>
    state.data.customers.find((i) => i.id === order?.customer)
  );

  const products = useSelector((state) => state.data.products);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/order" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton>
                <IonIcon
                  slot="icon-only"
                  ios={shareOutline}
                  md={shareSharp}
                ></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2">
              <IonCard>
                <IonCardHeader>
                  <IonItem detail={false} lines="none" className="list-item">
                    <IonAvatar slot="start">
                      <img
                        src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                        alt="Speaker profile pic"
                      />
                    </IonAvatar>
                    <IonLabel>
                      <h2>{customer?.name}</h2>
                      <p>{formatDate(order?.createdAt)}</p>
                    </IonLabel>
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonListHeader lines="full">Danh sách sản phẩm và só lượng</IonListHeader>
                    {order?.lines.map((line, index) => (
                      <IonItem key={index}>
                        <IonLabel>
                          {products.find((i) => i.id === line.product)?.code}
                        </IonLabel>
                        <IonLabel slot="end">
                          <p>{line.size}</p>
                        </IonLabel>
                        <IonNote slot="end">
                          <p>{line.quantity}</p>
                        </IonNote>
                      </IonItem>
                    ))}

                    {order?.note && (
                      <IonItem lines="inset">
                        <IonLabel position="stacked">Ghi chú</IonLabel>
                        <IonTextarea readonly>{order?.note}</IonTextarea>
                      </IonItem>
                    )}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};
