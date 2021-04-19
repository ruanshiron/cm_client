import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  callOutline,
  callSharp,
  personOutline,
  phonePortraitOutline,
  shareOutline,
  shareSharp,
} from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";
import { useSelector } from "../../../store";

interface SupplierDetailProps {}

export const SupplierDetail: React.FC<SupplierDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const workshop = useSelector((state) =>
    state.data.materialStores.find((v) => v.id === id)
  );
  return (
    <>
      <IonPage id="workshop-detail">
        <IonContent>
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/workshops" />
              </IonButtons>
              <IonTitle>Nguồn nguyên liệu</IonTitle>
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
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="8" offsetMd="2">
                <IonCard>
                  <IonCardContent>
                    <IonList lines="full">
                      <IonItem>
                        <IonIcon icon={personOutline} slot="start"></IonIcon>
                        <IonLabel slot="start">{workshop?.name}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon
                          icon={phonePortraitOutline}
                          slot="start"
                        ></IonIcon>
                        <IonLabel slot="start">
                          {workshop?.phonenumber}
                        </IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};
