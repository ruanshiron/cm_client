import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  useIonRouter,
} from "@ionic/react";
import { barChartOutline, calendarOutline, shirtOutline } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";
import { useSelector } from "../../store";
import { stringFromToDate } from "../../utils/date";

interface Props {
  hide?: boolean;
}

const WorkshopInstantSummary: React.FC<Props> = ({ hide }) => {
  const { id } = useParams<{ id: string }>();
  const router = useIonRouter();
  const workshop = useSelector((state) =>
    state.workshops.find((v) => v.id === id)
  );
  const processes = useSelector((state) => state.processes);
  if (hide) return null;
  return (
    <>
      <IonCard>
        <IonItem lines="full">
          <IonIcon slot="start" icon={calendarOutline} />
          <IonLabel className="ion-text-wrap">
            Thống kê nhanh của xưởng <b>{workshop?.name}</b> theo khoảng thời
            gian:
            <br />
            <b>
              {stringFromToDate(
                workshop?.statistic?.from,
                workshop?.statistic?.to
              )}
            </b>
          </IonLabel>
        </IonItem>
        <IonButton
          routerLink={
            router.routeInfo.pathname +
            (router.routeInfo.pathname.endsWith("/")
              ? "statistic"
              : "/statistic")
          }
          fill="clear"
          expand="block"
        >
          <IonIcon slot="start" icon={barChartOutline} />
          Nhấn để xem chi tiết
        </IonButton>
      </IonCard>
      {workshop?.statistic?.products &&
        Object.values(workshop?.statistic?.products).map((item, index) => (
          <IonCard className="list-card">
            <IonCardContent>
              <IonItemGroup>
                <IonItem lines="full">
                  <IonIcon slot="start" icon={shirtOutline} />
                  <IonLabel>
                    <b>{item.name}</b>
                    <p>{item?.code}</p>
                  </IonLabel>
                </IonItem>
                {Object.keys(item.processes).map((i, j) => (
                  <IonItem lines="full" key={j}>
                    <IonLabel className="ion-text-center" color="warning">
                      <b>{item.processes[i].pending || 0}</b>
                      <p>
                        <i>{processes.find((v) => v.id === i)?.pending}</i>
                      </p>
                    </IonLabel>
                    <IonLabel className="ion-text-center" color="success">
                      <b>{item.processes[i].fulfilled || 0}</b>
                      <p>
                        <i>{processes.find((v) => v.id === i)?.fulfilled}</i>
                      </p>
                    </IonLabel>
                    <IonLabel className="ion-text-center" color="danger">
                      <b>{item.processes[i].rejected || 0}</b>
                      <p>
                        <i>{processes.find((v) => v.id === i)?.rejected}</i>
                      </p>
                    </IonLabel>
                    <IonLabel className="ion-text-center">
                      <b>
                        {(item.processes[i].pending || 0) +
                          (item.processes[i].rejected || 0) -
                          (item.processes[i].fulfilled || 0)}
                      </b>
                      <p>
                        Chưa&nbsp;
                        {processes.find((v) => v.id === i)?.fulfilled}
                      </p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonItemGroup>
            </IonCardContent>
          </IonCard>
        ))}
    </>
  );
};

export default WorkshopInstantSummary;
