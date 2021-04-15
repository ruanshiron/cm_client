import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { filter, forEach, groupBy, map } from "lodash";
import React from "react";
import { useParams } from "react-router";
import { useSelector } from "../../store";
import * as Process from "../../models/process";

const StatisticItem: React.FC<{ value: string | number; label: string }> = ({
  value,
  label,
}) => {
  return (
    <div className="stat">
      <div className="stat__value">{value}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
};

interface Props {
  onDismiss: ReturnType<any>;
  showModal: boolean;
}

export const WorkshopModal: React.FC<Props> = ({
  onDismiss,
  showModal = false,
}) => {
  const { id } = useParams<{ id: string }>();

  const { title, fields, data } = useSelector((state) => {
    const events = state.data.events.filter((v) => v.workshop === id);

    let _events = filter(state.data.events, (v) => v.workshop === id);
    let _groups: any = groupBy(_events, (v) => v.product);
    let _r = forEach(_groups, (_, key) => {
      _groups[key] = groupBy(_groups[key], function (item) {
        return item.process;
      });
    });

    return {
      title: state.data.workshops.find((v) => v.id === id)?.name,
      data: events.map((e) => {
        const [id, type] = e.process?.split("/") || ["", ""];
        return {
          ...e,
          product: state.data.products.find((v) => v.id === e.product)?.name,
          process:
            Process.ProcessEnum[type] +
            state.data.processes.find((i) => i.id === id)?.name,
          note: e.note || "_",
        };
      }),
      fields: _r,
    };
  });

  return (
    <IonModal
      isOpen={showModal}
      swipeToClose={true}
      onDidDismiss={() => onDismiss()}
      cssClass="report-modal"
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss()}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{title} | thống kê</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="stats__container">
          {map(fields, (field) => map(field, (value) => value)).map(
            (item, index) => {
              console.log(item);
              
              return <StatisticItem key={index} value={"..."} label={item[0][0].product} />;
            }
          )}
        </div>
        <div className="table__container">
          <table>
            <caption>Thống kê chi tiết</caption>
            <thead>
              <tr>
                <th scope="col">Ngày</th>
                <th scope="col">Giao dịch</th>
                <th scope="col">Sản phẩm</th>
                <th scope="col">Kích cỡ</th>
                <th scope="col">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => (
                <tr key={i}>
                  <td data-label="Ngày">{e.date}</td>
                  <td data-label="Giao dịch">{e.process}</td>
                  <td data-label="Sản phẩm">{e.product}</td>
                  <td data-label="Kích cỡ">{e.size}</td>
                  <td data-label="Ghi chú">{e.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </IonContent>{" "}
    </IonModal>
  );
};
