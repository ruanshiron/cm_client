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
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  analyticsOutline,
  callOutline,
  callSharp,
  personOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import { chain, sum } from "lodash";
import React, { useState } from "react";
import { useParams } from "react-router";
import { WorkshopModal } from "../../components/modals/WorkshopModal";
import { useSelector } from "../../store";

interface WorkshopDetailProps {}

export const WorkshopDetail: React.FC<WorkshopDetailProps> = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  const workshop = useSelector((state) =>
    state.data.workshops.find((v) => v.id === id)
  );
  const events = useSelector((state) => {
    const e = state.data.events.filter((v) => v.workshop === id);
    return chain(e)
      .groupBy("product")
      .map((value, key) => ({
        name: state.data.products.find((v) => v.id === key)?.name,
        aggregate: sum(value.map((v) => v.quantity)),
      }))
      .value();
  });
  return (
    <>
      <IonPage id="workshop-detail">
        <WorkshopModal
          showModal={showReportModal}
          onDismiss={() => setShowReportModal(false)}
        />
        <IonContent>
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/workshops" />
              </IonButtons>
              <IonTitle>Xưởng</IonTitle>
              <IonButtons slot="end">
                <IonButton>
                  <IonIcon
                    slot="icon-only"
                    ios={callOutline}
                    md={callSharp}
                  ></IonIcon>
                </IonButton>
                <IonButton onClick={() => setShowReportModal(true)}>
                  <IonIcon slot="icon-only" icon={analyticsOutline}></IonIcon>
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

                <IonCard>
                  <IonCardContent>
                    <IonList lines="full">
                      {events.map((e, i) => (
                        <IonItem key={i}>
                          <IonLabel slot="start">{e.name}</IonLabel>
                          <IonNote slot="end">
                            <p>{e.aggregate}</p>
                          </IonNote>
                        </IonItem>
                      ))}
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
