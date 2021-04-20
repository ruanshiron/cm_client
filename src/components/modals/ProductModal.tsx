import {
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";
import { useSelector } from "../../store";
import { reportForProduct } from "../../store/dataSlice";

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

  const { title, fields, data } = useSelector((state) =>
    reportForProduct(state, id)
  );

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
        <IonGrid fixed>
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
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};
