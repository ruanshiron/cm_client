import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonItemDivider,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  bodyOutline,
  calendarClearOutline,
  closeOutline,
  helpCircleOutline,
  peopleCircleOutline,
  readerOutline,
  shirtOutline,
} from "ionicons/icons";

interface EventFormModalrops {}

const EventFormModal: React.FC<EventFormModalrops> = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 10));

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setShowEventForm(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal
        isOpen={showEventForm}
        swipeToClose={true}
        onDidDismiss={() => setShowEventForm(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowEventForm(false)}>
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle>Thêm vào nhật ký</IonTitle>
            <IonButtons slot="end">
              <IonButton>Lưu</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem lines="full">
              <IonIcon size="large" icon={readerOutline} color="medium" />
              <IonLabel></IonLabel>
              <IonInput
                type="number"
                placeholder="Số lượng"
                style={{ textAlign: "right", fontSize: 36 }}
              />
            </IonItem>
            <IonItem lines="full">
              <IonIcon size="large" icon={shirtOutline} color="medium" />
              <IonLabel></IonLabel>
              <IonSelect
                okText="Chọn"
                cancelText="Hủy"
                interface="action-sheet"
                placeholder="Sản phẩm"
              >
                <IonSelectOption value="1">Sản phẩm 1</IonSelectOption>
                <IonSelectOption value="2">Sản phẩm 2</IonSelectOption>
                <IonSelectOption value="3">Sản phẩm 3</IonSelectOption>
                <IonSelectOption value="4">Sản phẩm 4</IonSelectOption>
                <IonSelectOption value="5">Sản phẩm 5</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem lines="full">
              <IonIcon size="large" icon={bodyOutline} color="medium" />
              <IonLabel></IonLabel>
              <IonSelect
                okText="Chọn"
                cancelText="Hủy"
                interface="action-sheet"
                placeholder="Kích cỡ"
              >
                <IonSelectOption value="1">S</IonSelectOption>
                <IonSelectOption value="2">M</IonSelectOption>
                <IonSelectOption value="3">L</IonSelectOption>
                <IonSelectOption value="4">XL</IonSelectOption>
                <IonSelectOption value="5">XXL</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItemDivider color="light"></IonItemDivider>
            <IonItem lines="full">
              <IonIcon size="large" icon={helpCircleOutline} color="medium" />
              <IonLabel></IonLabel>
              <IonSelect
                okText="Chọn"
                cancelText="Hủy"
                interface="action-sheet"
                placeholder="Nhóm"
              >
                <IonSelectOption value="sent">Yêu cầu sản xuất</IonSelectOption>
                <IonSelectOption value="received">
                  Nhận sản phẩm
                </IonSelectOption>
                <IonSelectOption value="fix-sent">
                  Yêu cầu sửa lỗi
                </IonSelectOption>
                <IonSelectOption value="fix-received">
                  Nhận sản phẩm đã sửa lỗi
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem lines="full">
              <IonIcon size="large" icon={peopleCircleOutline} color="medium" />
              <IonLabel></IonLabel>
              <IonSelect
                okText="Chọn"
                cancelText="Hủy"
                interface="action-sheet"
                placeholder="Xưởng"
              >
                <IonSelectOption value="id">Xưởng 1</IonSelectOption>
                <IonSelectOption value="id">Xưởng 1</IonSelectOption>
                <IonSelectOption value="id">Xưởng 1</IonSelectOption>
                <IonSelectOption value="id">Xưởng 1</IonSelectOption>
                <IonSelectOption value="id">Xưởng 1</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItemDivider color="light"></IonItemDivider>
            <IonItem lines="full">
              <IonIcon size="large" icon={calendarClearOutline} color="medium" />
              <IonLabel></IonLabel>
              <IonInput type="date" placeholder="ngày tháng" value={selectedDate} onIonChange={(e) => setSelectedDate(e.detail.value || selectedDate)}/>
            </IonItem>
            <IonItem lines="full">
              <IonIcon size="large" icon={readerOutline} color="medium" />
              <IonLabel></IonLabel>
              <IonInput placeholder="Ghi chú" />
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default EventFormModal;
