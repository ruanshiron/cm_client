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
import { groupBy } from "lodash";
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

export const ProductModal: React.FC<Props> = ({
  onDismiss,
  showModal = false,
}) => {
  const { id } = useParams<{ id: string }>();

  const { product, fields, data } = useSelector((state) => {
    const _product = state.data.products.find((x) => x.id === id);

    const events = state.data.events.filter((v) => v.product === id);
    const result = groupBy(events, "process");

    return {
      product: _product,
      data: events.map((e) => {
        const [id, type] = e.process?.split("/") || ["", ""];
        return {
          ...e,
          workshop: state.data.workshops.find((v) => v.id === e.workshop)?.name,
          process:
            Process.ProcessEnum[type] +
            state.data.processes.find((i) => i.id === id)?.name,
          note: e.note || "_",
        };
      }),
      fields: Object.keys(result).map((key) => {
        const [id, type] = key.split("/");
        return {
          name:
            Process.ProcessEnum[type] +
            state.data.processes.find((i) => i.id === id)?.name,
          value: result[key].reduce((a, b) => a + (b ? b?.quantity! : 0), 0),
        };
      }),
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
          <IonTitle>{product?.name} | thống kê</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="stats__container">
          {fields &&
            fields?.length > 0 &&
            fields?.map(({ name, value }, i) => {
              return <StatisticItem key={i} label={name} value={value} />;
            })}
        </div>
        <div className="table__container">
          <table>
            <caption>Thống kê chi tiết</caption>
            <thead>
              <tr>
                <th scope="col">Ngày</th>
                <th scope="col">Xưởng</th>
                <th scope="col">Giao dịch</th>
                <th scope="col">Kích cỡ</th>
                <th scope="col">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => (
                <tr key={i}>
                  <td data-label="Ngày">{e.date}</td>
                  <td data-label="Xưởng">{e.workshop}</td>
                  <td data-label="Giao dịch">{e.process}</td>
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
