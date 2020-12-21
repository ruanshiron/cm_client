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
import { Event } from "../models/Diary";

interface EventFormModalrops {
  state: any;
}

const selectedDateLabelParser = (text: string) => {
  const date = new Date(text);
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
    return "Hôm nay";
  else if (
    date.getDate() === today.getDate() - 1 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
    return "Hôm qua";
  return "";
};

const EventFormModal: React.FC<EventFormModalrops> = ({ state }) => {
  const [showEventForm, setShowEventForm] = useState<boolean>(false);

  const today = new Date().toISOString().substring(0, 10);
  const [quantity, setQuantity] = useState<number>();
  const [productCode, setProductCode] = useState<string>();
  const [sizeCode, setSizeCode] = useState<string>();
  const [typeCode, setTypeCode] = useState<string>();
  const [workshop, setWorkshop] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [note, setNote] = useState<string>();

  const { save } = state;

  const handleOnSubmit = (e: any) => {
    console.log(e);

    const param: Event = {
      quantity,
      productCode,
      sizeCode,
      typeCode,
      workshop,
      selectedDate,
      note,
    };

    save(param, () => setShowEventForm(false));

    setQuantity(undefined);
    setProductCode(undefined);
    setSizeCode(undefined);
    setTypeCode(undefined);
    setWorkshop(undefined);
    setSelectedDate(today);
    setNote(undefined);
  };

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
              <IonButton type="submit" onClick={handleOnSubmit}>
                Lưu
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem lines="full">
            <IonIcon size="large" icon={readerOutline} color="medium" />
            <IonLabel></IonLabel>
            <IonInput
              type="number"
              placeholder="Số lượng"
              style={{ textAlign: "right", fontSize: 36 }}
              value={quantity}
              onIonChange={(e) => setQuantity(parseInt(e.detail.value!, 0))}
              required
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
              value={productCode}
              onIonChange={(e) => setProductCode(e.detail.value!)}
            >
              <IonSelectOption value="Sản phẩm 1">Sản phẩm 1</IonSelectOption>
              <IonSelectOption value="Sản phẩm 1">Sản phẩm 2</IonSelectOption>
              <IonSelectOption value="Sản phẩm 3">Sản phẩm 3</IonSelectOption>
              <IonSelectOption value="Sản phẩm 4">Sản phẩm 4</IonSelectOption>
              <IonSelectOption value="Sản phẩm 5">Sản phẩm 5</IonSelectOption>
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
              value={sizeCode}
              onIonChange={(e) => setSizeCode(e.detail.value!)}
            >
              <IonSelectOption value="S">S</IonSelectOption>
              <IonSelectOption value="M">M</IonSelectOption>
              <IonSelectOption value="L">L</IonSelectOption>
              <IonSelectOption value="XL">XL</IonSelectOption>
              <IonSelectOption value="XXL">XXL</IonSelectOption>
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
              value={typeCode}
              onIonChange={(e) => setTypeCode(e.detail.value!)}
            >
              <IonSelectOption value="sent">Gửi</IonSelectOption>
              <IonSelectOption value="received">Nhận</IonSelectOption>
              <IonSelectOption value="failure">Sửa Lỗi</IonSelectOption>
              <IonSelectOption value="fixed">Đã Sửa</IonSelectOption>
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
              value={workshop}
              onIonChange={(e) => setWorkshop(e.detail.value!)}
            >
              <IonSelectOption value="Xưởng Hoa Đông">
                Xưởng Hoa Đông
              </IonSelectOption>
              <IonSelectOption value="Xưởng Trung Châu">
                Xưởng Trung Châu
              </IonSelectOption>
              <IonSelectOption value="Xưởng Sơn Tây">
                Xưởng Sơn Tây
              </IonSelectOption>
              <IonSelectOption value="Xưởng Ngọc Tảo">
                Xưởng Ngọc Tảo
              </IonSelectOption>
              <IonSelectOption value="Xưởng Hạ">Xưởng Hạ</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItemDivider color="light"></IonItemDivider>
          <IonItem lines="full">
            <IonIcon size="large" icon={calendarClearOutline} color="medium" />
            <IonLabel color="medium" style={{ paddingLeft: 8 }}>
              {selectedDateLabelParser(selectedDate)}
            </IonLabel>
            <IonInput
              type="date"
              placeholder="ngày tháng"
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
              style={{ textAlign: "right" }}
            />
          </IonItem>
          <IonItem lines="full">
            <IonIcon size="large" icon={readerOutline} color="medium" />
            <IonLabel color="medium"></IonLabel>
            <IonInput
              placeholder="Ghi chú"
              value={note}
              onIonChange={(e) => setNote(e.detail.value!)}
            />
          </IonItem>

          <IonItemDivider color="light"></IonItemDivider>
          <IonItem lines="none" button onClick={() => setShowEventForm(false)}>
            <IonLabel
              color="danger"
              style={{ textAlign: "center" }}
            >
              Hủy
            </IonLabel>
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};

export default EventFormModal;
