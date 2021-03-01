import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
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

interface DiaryPageProps {}

const DiaryPage: React.FC<DiaryPageProps> = (props) => {
  const groups: EventGroup[] = useSelector(
    (state) => state.data.filteredEvents
  );

  return (
    <IonPage>
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
        <IonList>
          {groups.map((group, i) => (
            <React.Fragment key={i}>
              <IonItemDivider sticky>
                <IonLabel>{group.name}</IonLabel>
              </IonItemDivider>
              {group.events.map((item, j) => (
                <EventItem data={item} key={j} />
              ))}
            </React.Fragment>
          ))}

          <IonItem color="light" />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DiaryPage;
