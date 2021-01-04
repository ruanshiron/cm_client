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
  IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";
import React, { useState } from "react";
import { ReportItem } from "../components/ReportItem";
import ReportPopover from "../components/ReportPopover";
import "./ReportPage.scss";

const reports = [
  {
    id: 0,
    name: "Tất cả",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã sản suất",
        value: 20000,
      },
      {
        name: "Hỏng",
        value: 192,
      },
      {
        name: "Tồn Kho",
        value: 8000,
      },
      {
        name: "Đã bán",
        value: 12000,
      },
    ],
  },
  {
    id: 1,
    name: "Sản phẩm 1",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã sản suất",
        value: 1200,
      },
      {
        name: "Hỏng",
        value: 192,
      },
      {
        name: "Tồn Kho",
        value: 231,
      },
      {
        name: "Đã bán",
        value: 1431,
      },
    ],
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã sản suất",
        value: 1200,
      },
      {
        name: "Hỏng",
        value: 192,
      },
      {
        name: "Tồn Kho",
        value: 231,
      },
      {
        name: "Đã bán",
        value: 1431,
      },
    ],
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã sản suất",
        value: 1200,
      },
      {
        name: "Hỏng",
        value: 192,
      },
      {
        name: "Tồn Kho",
        value: 231,
      },
      {
        name: "Đã bán",
        value: 1431,
      },
    ],
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã sản suất",
        value: 1200,
      },
      {
        name: "Hỏng",
        value: 192,
      },
      {
        name: "Tồn Kho",
        value: 231,
      },
      {
        name: "Đã bán",
        value: 1431,
      },
    ],
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    from: "2019-12-12",
    fields: [
      {
        name: "Đã sản suất",
        value: 1200,
      },
      {
        name: "Hỏng",
        value: 192,
      },
      {
        name: "Tồn Kho",
        value: 231,
      },
      {
        name: "Đã bán",
        value: 1431,
      },
    ],
  },
];

interface ReportPageProps {}

const ReportPage: React.FC<ReportPageProps> = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<any>();

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };
  return (
    <IonPage id="report-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Báo cáo</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={presentPopover}>
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              ></IonIcon>
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
            {reports.map((product) => (
              <IonCol size="12" size-md="6" key={product.id}>
                <ReportItem data={product} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <ReportPopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default ReportPage;
