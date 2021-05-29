import {
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { shirtOutline } from "ionicons/icons";
import React from "react";
import { Process } from "../../models/process";
import { Workshop } from "../../models/workshop";
import { stringFromToDate } from "../../utils/date";

interface Props {
  statistic: any;
  total: any;
  processes: Process[];
  workshop: Workshop;
}

const WorkshopSummary: React.FC<Props> = ({
  statistic,
  workshop,
  total,
  processes,
}) => {
  const label = (id: string, status: "pending" | "fulfilled" | "rejected") => {
    const process = processes.find((item) => item.id === id);
    console.log(id);

    if (process) return process[status];
    else return "đang tải...";
  };
  return (
    <>
      <IonCard className="list-card">
        <IonCardContent>
          <IonList style={{ border: "none" }}>
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
              <div key={index} className="statistic-container">
                <div className="statistic-pending-card">
                  <h5>{label(key, "pending")}</h5>
                  <span>{total[key].pending || 0}</span>
                  <h5>
                    Tổng tiền <br />
                    theo {label(key, "pending")}
                  </h5>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(total[key].subtotal.estimate)}
                  </span>
                </div>
                <div className="statistic-fulfilled-rejected-card">
                  <div className="fulfilled-rejected-wrapper">
                    <div className="statistic-fulfilled">
                      <h5>{label(key, "fulfilled")}</h5>
                      <span>{total[key].fulfilled}</span>
                    </div>
                    <div className="statistic-rejected">
                      <h5>{label(key, "rejected")}</h5>
                      <span>{total[key].rejected}</span>
                    </div>
                  </div>
                  <div className="statistic-subtotal">
                    <h5>
                      Tổng tiền <br />
                      theo {label(key, "fulfilled")}
                    </h5>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total[key].subtotal.value)}
                    </span>
                  </div>
                </div>
                {(total[key].pending || 0) +
                  (total[key].rejected || 0) -
                  (total[key].fulfilled || 0) >=
                0 ? (
                  <div className="statistic-not-fulfilled-card">
                    <h5>Chưa {label(key, "fulfilled")}</h5>
                    <span>
                      {(total[key].pending || 0) +
                        (total[key].rejected || 0) -
                        (total[key].fulfilled || 0)}
                    </span>
                  </div>
                ) : (
                  <div className="statistic-ex-fulfilled-card">
                    <h5>{label(key, "fulfilled")} thừa</h5>
                    <span>
                      {
                        -(
                          (total[key].pending || 0) +
                          (total[key].rejected || 0) -
                          (total[key].fulfilled || 0)
                        )
                      }
                    </span>
                  </div>
                )}
                <div className="last-child"></div>
              </div>
            ))}
          </IonList>
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
            </IonItem>
            {/* {Object.keys(statistic[key].processes).map((i, j) => (
              <IonItem key={j}>
                <IonLabel>
                  <IonText color="warning">
                    <p>
                      <i>{statistic[key].processes[i].pending.label}</i>
                    </p>
                    <b>
                      🤝
                      {statistic[key].processes[i].pending || 0}
                    </b>
                  </IonText>
                  <IonText color="success">
                    <p>
                      <i>{statistic[key].processes[i].fulfilled.label}</i>
                    </p>
                    <b>✅{statistic[key].processes[i].fulfilled.value || 0}</b>
                  </IonText>
                  <IonText color="danger">
                    <p>
                      <i>{statistic[key].processes[i].rejected.label}</i>
                    </p>
                    <b>🛠{statistic[key].processes[i].rejected.value || 0}</b>
                  </IonText>
                </IonLabel>
                <IonLabel>
                  <p>
                    Chưa&nbsp;
                    <i>{statistic[key].processes[i].fulfilled.label}</i>
                  </p>
                  <b>
                    🖐
                    {(statistic[key].processes[i].pending.value || 0) +
                      (statistic[key].processes[i].rejected.value || 0) -
                      (statistic[key].processes[i].fulfilled.value || 0)}
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
                  <p>
                    Tổng tiền (theo {statistic[key].processes[i].pending.label})
                  </p>
                  <b>
                    💵
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(statistic[key].processes[i].subtotal.estimate)}
                  </b>
                  <p>Tổng tiền (thực tế)</p>
                  <b>
                    💵
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(statistic[key].processes[i].subtotal.value)}
                  </b>
                </IonLabel>
              </IonItem>
            ))} */}

            {Object.keys(statistic[key].processes).map((i, j) => (
              <div key={j} className="statistic-container">
                <div className="statistic-pending-card">
                  <h5>{label(i, "pending")}</h5>
                  <span>{statistic[key].processes[i].pending || 0}</span>
                  <h5>
                    Tổng tiền <br />
                    theo {label(i, "pending")}
                  </h5>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(statistic[key].processes[i].subtotal.estimate)}
                  </span>
                </div>
                <div className="statistic-fulfilled-rejected-card">
                  <div className="fulfilled-rejected-wrapper">
                    <div className="statistic-fulfilled">
                      <h5>{label(i, "fulfilled")}</h5>
                      <span>{statistic[key].processes[i].fulfilled}</span>
                    </div>
                    <div className="statistic-rejected">
                      <h5>{label(i, "rejected")}</h5>
                      <span>{statistic[key].processes[i].rejected}</span>
                    </div>
                  </div>
                  <div className="statistic-subtotal">
                    <h5>
                      Tổng tiền <br />
                      theo {label(i, "fulfilled")}
                    </h5>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(statistic[key].processes[i].subtotal.value)}
                    </span>
                  </div>
                </div>
                {(statistic[key].processes[i].pending || 0) +
                  (statistic[key].processes[i].rejected || 0) -
                  (statistic[key].processes[i].fulfilled || 0) >=
                0 ? (
                  <div className="statistic-not-fulfilled-card">
                    <h5>Chưa {label(i, "fulfilled")}</h5>
                    <span>
                      {(statistic[key].processes[i].pending || 0) +
                        (statistic[key].processes[i].rejected || 0) -
                        (statistic[key].processes[i].fulfilled || 0)}
                    </span>
                  </div>
                ) : (
                  <div className="statistic-ex-fulfilled-card">
                    <h5>{label(i, "fulfilled")} thừa</h5>
                    <span>
                      {
                        -(
                          (statistic[key].processes[i].pending || 0) +
                          (statistic[key].processes[i].rejected || 0) -
                          (statistic[key].processes[i].fulfilled || 0)
                        )
                      }
                    </span>
                  </div>
                )}

                {workshop?.amounts
                  .filter(
                    (amount) =>
                      amount.processId === i && amount.productId === key
                  )
                  .map((amount) => (
                    <div className="amount-card">
                      <h6>{amount.fromDate}</h6>
                      <h6>{amount.toDate}</h6>
                      <h5>Đơn giá</h5>
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(amount.amount)}
                      </span>
                    </div>
                  ))}
                <div className="last-child"></div>
              </div>
            ))}
          </IonList>
        </IonCard>
      ))}
    </>
  );
};

export default WorkshopSummary;
