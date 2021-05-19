import {
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonCard,
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
}

const WorkshopSummary: React.FC<Props> = ({
  statistic,
  processes,
  workshop,
}) => {
  return (
    <>
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
                  <p>
                    <i>{processes.find((v) => v.id === i)?.pending}</i>
                  </p>
                  <b>
                    🤝
                    {statistic[key].processes[i].pending || 0}
                  </b>
                  <p>
                    <i>{processes.find((v) => v.id === i)?.fulfilled}</i>
                  </p>
                  <b>✅{statistic[key].processes[i].fulfilled || 0}</b>
                  <p>
                    <i>{processes.find((v) => v.id === i)?.rejected}</i>
                  </p>
                  <b>👨‍🔧{statistic[key].processes[i].rejected || 0}</b>
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
