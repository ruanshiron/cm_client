import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import {
  callOutline,
  callSharp,
  shareOutline,
  shareSharp,
} from "ionicons/icons";
import React from "react";

import "./CustomerDetail.scss";

interface CustomerDetailProps {}

export const CustomerDetail: React.FC<CustomerDetailProps> = () => {
  return (
    <>
      <IonPage id="customer-detail">
        <IonContent>
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/customers" />
              </IonButtons>
              <IonButtons slot="end">
                <IonButton>
                  <IonIcon
                    slot="icon-only"
                    ios={callOutline}
                    md={callSharp}
                  ></IonIcon>
                </IonButton>
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
