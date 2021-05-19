import {
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonCard,
  IonText,
  IonCardContent,
} from "@ionic/react";
import { shirtOutline } from "ionicons/icons";
import React from "react";
import { Process } from "../../models/process";
import { Workshop } from "../../models/workshop";
import { stringFromToDate } from "../../utils/date";

interface Props {
  statistic: any;
  processes: Process[];
  workshop: Workshop;
  total: any;
}

const WorkshopSummary: React.FC<Props> = ({
  statistic,
  processes,
  workshop,
  total,
}) => {
  return (
    <>
      <IonCard className="list-card">
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel>
              <u>
                <b>Tổng hợp</b>
              </u>
            </IonLabel>
            <IonNote slot="end">
              {stringFromToDate(
                workshop.statistic?.from,
                workshop.statistic?.to
              )}
            </IonNote>
          </IonItem>
          {Object.keys(total).map((key, index) => (
            <IonItem key={index}>
              <IonLabel>
                <IonText color="warning">
                  <p>
                    <i>{total[key].pending.label}</i>
                  </p>
                  <b>
                    🤝
                    {total[key].pending.value || 0}
                  </b>
                </IonText>
                <IonText color="success">
                  <p>
                    <i>{total[key].fulfilled.label}</i>
                  </p>
                  <b>✅{total[key].fulfilled.value || 0}</b>
                </IonText>
                <IonText color="danger">
                  <p>
                    <i>{total[key].rejected.label}</i>
                  </p>
                  <b>🛠{total[key].rejected.value || 0}</b>
                </IonText>
              </IonLabel>
              <IonLabel>
                <p>
                  <i>Chưa&nbsp;{total[key].fulfilled.label}</i>
                </p>
                <b>
                  🖐
                  {(total[key].pending.value || 0) +
                    (total[key].rejected.value || 0) -
                    (total[key].fulfilled.value || 0)}
                </b>
                <p>
                  <i>Tổng tiền</i>
                </p>
                <b>
                  💵
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(total[key].subtotal.value)}
                </b>
              </IonLabel>
            </IonItem>
          ))}
        </IonCardContent>
      </IonCard>

      {Object.keys(statistic).map((key, index) => (
        <IonCard>
          <IonList style={{ border: "none" }} key={index}>
            <IonItem lines="full">
              <IonIcon slot="start" icon={shirtOutline} />
              <IonLabel>
                <b>{statistic[key].name}</b>
                <p>{statistic[key]?.code}</p>
              </IonLabel>
              <IonNote slot="end">đơn vị sản phẩm</IonNote>
            </IonItem>
            {Object.keys(statistic[key].processes).map((i, j) => (
              <IonItem key={j}>
                <IonLabel>
                  <IonText color="warning">
                    <p>
                      <i>{processes.find((v) => v.id === i)?.pending}</i>
                    </p>
                    <b>
                      🤝
                      {statistic[key].processes[i].pending || 0}
                    </b>
                  </IonText>
                  <IonText color="success">
                    <p>
                      <i>{processes.find((v) => v.id === i)?.fulfilled}</i>
                    </p>
                    <b>✅{statistic[key].processes[i].fulfilled || 0}</b>
                  </IonText>
                  <IonText color="danger">
                    <p>
                      <i>{processes.find((v) => v.id === i)?.rejected}</i>
                    </p>
                    <b>🛠{statistic[key].processes[i].rejected || 0}</b>
                  </IonText>
                </IonLabel>
                <IonLabel>
                  <p>
                    Chưa&nbsp;
                    {processes.find((v) => v.id === i)?.fulfilled}
                  </p>
                  <b>
                    🖐
                    {(statistic[key].processes[i].pending || 0) +
                      (statistic[key].processes[i].rejected || 0) -
                      (statistic[key].processes[i].fulfilled || 0)}
                  </b>
                  <p>Đơn giá</p>
                  {workshop?.amounts
                    .filter(
                      (amount) =>
                        amount.processId === i && amount.productId === key
                    )
                    .map((amount) => (
                      <b>
                        🏷
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(amount.amount)}
                        <small>
                          &nbsp;(
                          {stringFromToDate(amount.fromDate, amount.toDate)})
                        </small>
                      </b>
                    ))}
                  <p>Tổng tiền</p>
                  <b>
                    💵
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(statistic[key].processes[i].subtotal)}
                  </b>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonCard>
      ))}
    </>
  );
};

export default WorkshopSummary;
