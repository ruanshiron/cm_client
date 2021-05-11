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
  checkmarkDoneSharp,
  close,
  listSharp,
  pencil,
  trash,
} from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../../../store";
import { formatDate } from "../../../../utils/date";

interface OrderDetailProps {}

export const OrderDetail: React.FC<OrderDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [showActionSheet, setShowActionSheet] = useState(false);

  const order = useSelector((state) =>
    state.orders.find((i) => i.id === id)
  );

  const customer: any = {}

  const products = useSelector((state) => state.products);

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
              <IonCard className="list-card">
                <IonCardHeader>
                  <IonItem detail={false} lines="none" className="list-item">
                    <IonAvatar slot="start">
                      <img
                        src="/assets/icon/icon.png"
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
                          {products.find((i) => i.id === line.productId)?.code}
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
