import {
  IonCol,
  IonContent,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItemDivider,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonRow,
} from "@ionic/react";
import React from "react";
import { useSelector } from "../store";
import * as Event from "../models/stage";
import { filteredStages } from "../store/data/stageSlice";
import StageItem from "./items/StageItem";
import { RefresherEventDetail } from "@ionic/core";

interface Props {}

export const EventsViewAll: React.FC<Props> = () => {
  const groups: Event.Group[] = useSelector(filteredStages);
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }
  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <IonGrid style={{ padding: 0 }}>
        <IonRow>
          <IonCol size="12" size-md="8" offsetMd="2" style={{ padding: 0 }}>
            {groups.map((group, i) => (
              <IonList className="border-full-2 ion-margin-top" key={i}>
                <IonItemDivider className="top-divider" color="white">
                  <IonLabel>{group.name}</IonLabel>
                </IonItemDivider>
                {group.events.map((item, j) => (
                  <StageItem stage={item} key={j} />
                ))}
              </IonList>
            ))}
            <div className="last-item"></div>
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonInfiniteScroll threshold="100px" onIonInfinite={() => {}}>
        <IonInfiniteScrollContent loadingText="Đang tải..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  );
};
