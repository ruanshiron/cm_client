import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItemDivider,
  IonLabel,
  IonList,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useSelector } from "../store";
import * as Event from "../models/stage";
import { filteredStages } from "../store/data/stageSlice";
import StageItem from "./items/StageItem";

interface Props {}

export const EventsViewAll: React.FC<Props> = () => {
  const groups: Event.Group[] = useSelector(filteredStages);

  return (
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
    </IonContent>
  );
};
