import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSelect,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  bodyOutline,
  calendarClearOutline,
  calendarNumberOutline,
  closeOutline,
  helpCircleOutline,
  peopleCircleOutline,
  shirtOutline,
} from "ionicons/icons";
import React from "react";

interface Props {
  isOpen: boolean;
  onDidDismiss: ReturnType<any>;
}
const StageFilterModal: React.FC<Props> = ({ isOpen, onDidDismiss }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDidDismiss}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Bộ lọc</IonTitle>
          <IonButtons slot="end">
            <IonButton>OK!</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonList>
          <IonListHeader>Thời gian</IonListHeader>
          <IonItem>
            <IonIcon icon={calendarClearOutline} slot="start" />
            <IonLabel>Từ ngày</IonLabel>
            <IonDatetime
              displayFormat="YYYY-MM-DD"
              doneText="OK!"
              cancelText="Hủy"
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonIcon icon={calendarNumberOutline} slot="start" />
            <IonLabel>Đến ngày</IonLabel>
            <IonDatetime
              displayFormat="YYYY-MM-DD"
              doneText="OK!"
              cancelText="Hủy"
            ></IonDatetime>
          </IonItem>

          <IonListHeader>Thông tin</IonListHeader>
          <IonItem>
            <IonIcon icon={peopleCircleOutline} slot="start" />
            <IonLabel>Xưởng</IonLabel>
            <IonSelect
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
            ></IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon icon={shirtOutline} slot="start" />
            <IonLabel>Sản phẩm</IonLabel>
            <IonSelect
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
            ></IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon icon={bodyOutline} slot="start" />
            <IonLabel>Kích cỡ</IonLabel>
            <IonSelect
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
            ></IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon icon={helpCircleOutline} slot="start" />
            <IonLabel>Quy trình</IonLabel>
            <IonSelect
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
            ></IonSelect>
          </IonItem>
          <IonItem button lines="full">
            <IonLabel color="danger" className="ion-text-center">
              Đặt lại
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default StageFilterModal;
