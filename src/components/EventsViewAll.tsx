import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useSelector } from "../store";
import * as Event from "../models/stage";
import { filteredStages } from "../store/data/stageSlice";

const noteColor = (status?: string) => {
  if (!status) return "primary";
  if (status.endsWith("fulfilled")) return "success";
  if (status.endsWith("pending")) return "warning";
  if (status.endsWith("rejected")) return "danger";
};

const StageItem: React.FC<{ stage: Event.Stage }> = ({ stage }) => {
  return (
    <IonItem
      onClick={() => {}}
      routerLink={"/tabs/diary/" + stage.id}
      detail={false}
    >
      <>
        <IonLabel className={noteColor(stage.processStatus)}>
          <h2>
            {stage.workshopName}・<b>{stage.processLabel}</b>
          </h2>
          <p>
            {stage.productName} / {stage.productSize}
          </p>
        </IonLabel>
        <IonNote slot="end" color={noteColor(stage.processStatus)}>
          <h4>{stage.quantity}</h4>
        </IonNote>
      </>
    </IonItem>
  );
};

interface Props {}

export const EventsViewAll: React.FC<Props> = () => {
  const groups: Event.Group[] = useSelector(filteredStages);

  return (
    <>
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
                        <StageItem stage={item} key={j} />
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
    </>
  );
};
