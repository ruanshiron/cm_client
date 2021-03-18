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
import { FulfilledsItem } from "../../components/items/FulfilledsItem";
import { ProcessAggregateItem } from "../../components/items/ProcessAggregateItem";
import { ProcessingsItem } from "../../components/items/ProcessingsItem";
import { RejectedsItem } from "../../components/items/RejectedsItem";
import { useSelector } from "../../store";
import "./DashboardPage.scss";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = () => {
  const processes = useSelector((state) => state.data.processes);
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tổng hợp</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisVerticalSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {processes.map((process) => (
              <IonCol
                key={process.id}
                sizeXl="3"
                sizeMd="4"
                size="4"
                style={{ padding: 0 }}
              >
                <ProcessAggregateItem process={process} />
              </IonCol>
            ))}

            <IonCol size="12" sizeMd="6" style={{ padding: 0 }}>
              <FulfilledsItem />
            </IonCol>
            <IonCol size="12" sizeMd="6" style={{ padding: 0 }}>
              <ProcessingsItem />
            </IonCol>
            <IonCol size="12" sizeMd="6" style={{ padding: 0 }}>
              <RejectedsItem />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
