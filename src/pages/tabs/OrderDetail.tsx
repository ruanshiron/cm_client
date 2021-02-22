import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from "@ionic/react";
import { shareOutline, shareSharp } from "ionicons/icons";
import React from "react";

import "./OrderDetail.scss";

interface OrderDetailProps {}

export const OrderDetail: React.FC<OrderDetailProps> = () => {
  return (
    <>
      <IonPage>
        <IonContent>
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
        </IonContent>
      </IonPage>
    </>
  );
};
