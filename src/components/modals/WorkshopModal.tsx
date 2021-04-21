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
import { closeOutline, downloadOutline } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";
import { useSelector } from "../../store";
import {
  stagesByWorkshop,
  statisticsForWorkshop,
} from "../../store/data/workshopSlice";
interface Props {
  onDismiss: ReturnType<any>;
  showModal: boolean;
}

export const WorkshopModal: React.FC<Props> = ({
  onDismiss,
  showModal = false,
}) => {
  const { id } = useParams<{ id: string }>();

  const statistics = useSelector((state) => statisticsForWorkshop(state, id));

  const workshop = useSelector((state) =>
    state.workshops.find((item) => item.id === id)
  );

  const stages = useSelector((state) => stagesByWorkshop(state, id));

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
          <IonTitle>{workshop?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={downloadOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <div className="table__container">
            <table>
              <caption>Thống kê</caption>
              <thead>
                <tr>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Công đoạn</th>
                  <th scope="col">Tổng</th>
                </tr>
              </thead>
              <tbody>
                {statistics.map((item, index) => (
                  <tr key={index}>
                    <td data-label="Sản phẩm">{item.product}</td>
                    <td data-label="Công đoạn">{item.process}</td>
                    <td data-label="Tổng">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table__container">
            <table>
              <caption>Chi tiết</caption>
              <thead>
                <tr>
                  <th scope="col">Ngày</th>
                  <th scope="col">Công đoạn</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Kích cỡ</th>
                  <th scope="col">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((stage, i) => (
                  <tr key={i}>
                    <td data-label="Ngày">{stage.date}</td>
                    <td data-label="Công đoạn">{stage.process}</td>
                    <td data-label="Số lượng">{stage.quantity}</td>
                    <td data-label="Sản phẩm">{stage.product}</td>
                    <td data-label="Kích cỡ">{stage.size}</td>
                    <td data-label="Ghi chú">{stage.note}</td>
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
