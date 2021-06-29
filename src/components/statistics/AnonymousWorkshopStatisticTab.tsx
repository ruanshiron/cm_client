import {
  IonCard,
  IonCardContent,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
} from "@ionic/react";
import { calendarClearOutline, calendarNumberOutline } from "ionicons/icons";
import React from "react";
import { formatStringDate } from "../../utils/date";
import { useSelector } from "../../store";
import { statisticHarderSelector } from "../../store/data/workshopSlice";
import WorkshopSummary from "../../components/statistics/WorkshopSummary";
import StageTable from "../../components/statistics/StageTable";
import { Workshop } from "../../models/workshop";
import { Process } from "../../models/process";

interface Props {
  hide?: boolean;
  workshop?: Workshop;
  processes: Process[];
}

const AnonymousWorkshopStatisticTab: React.FC<Props> = ({
  hide,
  workshop,
  processes,
}) => {
  const { id } = useSelector((state) => state.user);
  const { statistic, stages, total, payment } = useSelector((state) =>
    statisticHarderSelector(state, id)
  );
  if (!workshop || hide) return null;

  return (
    <IonRow>
      <IonCol>
        <IonCard className="list-card">
          <IonCardContent>
            <IonList style={{ border: "none " }} lines="full">
              <IonItem>
                <IonIcon slot="start" icon={calendarClearOutline} />
                <IonLabel>
                  <b>{formatStringDate(workshop.statistic.from)}</b>
                </IonLabel>
                <IonNote slot="end">Từ ngày</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={calendarNumberOutline} />
                <IonLabel>
                  <b>{formatStringDate(workshop.statistic.to)}</b>
                </IonLabel>
                <IonNote slot="end">Đến ngày</IonNote>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
        {statistic && (
          <WorkshopSummary
            statistic={statistic}
            workshop={workshop}
            processes={processes}
            total={total}
            payment={payment}
          />
        )}

        <StageTable stages={stages} />
      </IonCol>
    </IonRow>
  );
};

export default AnonymousWorkshopStatisticTab;