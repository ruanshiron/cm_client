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
import { WorkshopItem } from "../components/WorkshopItem";
import "./WorkshopPage.scss"

const workshops = [
  {
    id: 0,
    name: "Tất cả",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã thanh toán",
        value: 20000,
      },
      {
        name: "Còn lại",
        value: 192,
      }
    ],
  },
  {
    id: 1,
    name: "Xưởng 1",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã thanh toán",
        value: 1200,
      },
      {
        name: "Còn lại",
        value: 192,
      },
    ],
  },
  {
    id: 2,
    name: "Xưởng 2",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã thanh toán",
        value: 1200,
      },
      {
        name: "Còn lại",
        value: 192,
      },
    ],
  },
  {
    id: 3,
    name: "Xưởng 3",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã thanh toán",
        value: 1200,
      },
      {
        name: "Còn lại",
        value: 192,
      },
    ],
  },
  {
    id: 4,
    name: "Xưởng 4",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã thanh toán",
        value: 1200,
      },
      {
        name: "Còn lại",
        value: 192,
      },
    ],
  },
  {
    id: 5,
    name: "Xưởng 5",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã thanh toán",
        value: 1200,
      },
      {
        name: "Còn lại",
        value: 192,
      },
    ],
  },
];


interface AccountPageProps {}

const WorkshopPage: React.FC<AccountPageProps> = () => {
  return (
    <IonPage id="workshop-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Xưởng</IonTitle>
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
            {workshops.map((product) => (
              <IonCol size="12" size-md="6" key={product.id}>
                <WorkshopItem data={product} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WorkshopPage;
