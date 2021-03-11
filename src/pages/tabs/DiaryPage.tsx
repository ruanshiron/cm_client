import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVerticalSharp } from "ionicons/icons";
import React from "react";
import EventFab from "../../components/EventFab";
import EventItem from "../../components/items/EventItem";
import { EventGroup } from "../../models";
import { useSelector } from "../../store";
import "./DiaryPage.scss";

interface DiaryPageProps {}

const DiaryPage: React.FC<DiaryPageProps> = (props) => {
  const groups: EventGroup[] = useSelector(
    (state) => state.data.filteredEvents
  );

  return (
    <IonPage id="diary-page">
      <EventFab />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nhật ký</IonTitle>
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
            <IonTitle size="large">Nhật ký</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search"></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonGrid style={{ padding: 0 }}>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2" style={{ padding: 0 }}>
              <IonList lines="none">
                {groups.map((group, i) => (
                  <React.Fragment key={i}>
                    <div className="bulkhead"></div>

                    <div className="border-full" key={i}>
                      <IonItemDivider className="top-divider" color="white">
                        <IonLabel>{group.name}</IonLabel>
                      </IonItemDivider>
                      {group.events.map((item, j) => (
                        <EventItem data={item} key={j} />
                      ))}
                    </div>
                  </React.Fragment>
                ))}
                <div className="last-item"></div>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DiaryPage;
