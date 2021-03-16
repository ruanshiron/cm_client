import {
  IonActionSheet,
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
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import {
  caretForwardCircle,
  checkmarkDoneSharp,
  close,
  heart,
  listSharp,
  pencil,
  share,
  trash,
} from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../store";
import { formatDate } from "../../utils/date";

import "./OrderDetail.scss";

interface OrderDetailProps {}

export const OrderDetail: React.FC<OrderDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [showActionSheet, setShowActionSheet] = useState(false);

  const order = useSelector((state) =>
    state.data.orders.find((i) => i.id === id)
  );

  const customer = useSelector((state) =>
    state.data.customers.find((i) => i.id === order?.customer)
  );

  const products = useSelector((state) => state.data.products);

  return (
    <>
      <IonPage className="list-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/order" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowActionSheet(true)}>
                <IonIcon slot="icon-only" icon={listSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2">
              <IonButton expand="block" fill="clear" color="danger" style={{ margin: 10}}>
                <IonIcon slot="start" icon={checkmarkDoneSharp}></IonIcon>
                <IonLabel> Bạn đã hoàn thành đơn hàng này</IonLabel>
              </IonButton>
              <IonCard className="list-card">
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
                    <IonItemDivider>
                      Danh sách sản phẩm và só lượng
                    </IonItemDivider>
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
                      <IonItem lines="full">
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
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass="my-custom-class"
          buttons={[
            {
              text: "Xóa",
              role: "destructive",
              icon: trash,
              handler: () => {
                console.log("Delete clicked");
              },
            },
            {
              text: "Sửa",
              icon: pencil,
              handler: () => {
                console.log("Share clicked");
              },
            },
            {
              text: "Chốt",
              icon: checkmarkDoneSharp,
              handler: () => {
                console.log("Share clicked");
              },
            },
            {
              text: "Hủy",
              icon: close,
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              },
            },
          ]}
        ></IonActionSheet>
      </IonPage>
    </>
  );
};
