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
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVerticalSharp, searchSharp } from "ionicons/icons";
import React, { useLayoutEffect, useRef } from "react";
import EventFab from "../../components/fabs/EventFab";
import EventItem from "../../components/items/EventItem";
import * as Event from "../../models/event";
import { useSelector } from "../../store";
import { formatDate, getDatesBetweenDates } from "../../utils/date";
import "./DiaryPage.scss";

interface DiaryPageProps {}

const DiaryPage: React.FC<DiaryPageProps> = (props) => {
  const groups: Event.Group[] = useSelector(
    (state) => state.data.filteredEvents
  );

  const segments = useRef<HTMLIonSegmentButtonElement[]>([]);
  const days = getDatesBetweenDates("2021/1/1", "2021/3/1");

  useLayoutEffect(() => {
    if (segments.current[12]) segments.current[12].scrollIntoView({
      block: "center",
      inline: "center",
      behavior: "smooth",
    });
  });

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
              <IonIcon slot="icon-only" icon={searchSharp} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisVerticalSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonHeader>
        <IonToolbar>
          <IonSegment
            scrollable
            value="2021/2/28"
            onIonChange={(e) => {
              console.log("Segment selected", e.detail.value);
              segments.current[
                days.findIndex((day) => formatDate(day) === e.detail.value)
              ].scrollIntoView({
                block: "center",
                inline: "center",
                behavior: "smooth",
              });
            }}
          >
            {days.map((day, i) => (
              <IonSegmentButton
                key={i}
                ref={(ref) => (segments.current[i] = ref!)}
                value={formatDate(day)}
              >
                <IonLabel>{formatDate(day)}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
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
