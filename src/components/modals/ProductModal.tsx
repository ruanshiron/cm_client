import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";
import { useSelector } from "../../store";
import { reportForProduct } from "../../store/data/productSlice";

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

  const { product, fields, data } = useSelector((state) =>
    reportForProduct(state, id)
  );

  const processes = useSelector((state) => state.processes);

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
        <IonGrid fixed>
          <div className="options__container">
            <IonItem>
              <IonLabel>Từ ngày</IonLabel>
              <IonDatetime
                displayFormat="YYYY-MM-DD"
                doneText="OK!"
                cancelText="Hủy"
                value={product?.report_cache?.from}
              ></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel>Đến ngày</IonLabel>
              <IonDatetime
                displayFormat="YYYY-MM-DD"
                doneText="OK!"
                cancelText="Hủy"
                value={product?.report_cache?.to}
              ></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel>Theo quy trình</IonLabel>
              <IonSelect
                okText="Chọn"
                cancelText="Hủy"
                interface="action-sheet"
                placeholder="Quy trình"
                value={product?.report_cache?.for}
              >
                {processes.map((item, index) => (
                  <IonSelectOption key={index}>{item.name}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </div>
          <div className="stats__container">
            {fields &&
              fields?.length > 0 &&
              fields?.map(({ name, value }, i) => {
                return <StatisticItem key={i} label={name} value={value} />;
              })}
          </div>
          <div className="table__container">
            <table>
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
