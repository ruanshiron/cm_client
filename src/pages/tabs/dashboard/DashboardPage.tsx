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
import { FulfilledsItem } from "../../../components/items/FulfilledsItem";
import { ProcessAggregateItem } from "../../../components/items/ProcessAggregateItem";
import { ProcessingsItem } from "../../../components/items/ProcessingsItem";
import { RejectedsItem } from "../../../components/items/RejectedsItem";
import { useSelector } from "../../../store";

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
        <IonGrid fixed>
          <div className="stats__container">
            {processes.map((process, index) => (
              <ProcessAggregateItem key={index} process={process} />
            ))}
          </div>
          <IonRow>
            <IonCol size="12" sizeMd="6" style={{ padding: 0 }}>
              <FulfilledsItem />
            </IonCol>
            <IonCol size="12" sizeMd="6" style={{ padding: 0 }}>
              <RejectedsItem />
            </IonCol>
            <IonCol size="12" sizeMd="6" style={{ padding: 0 }}>
              <ProcessingsItem />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
