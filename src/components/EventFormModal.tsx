import React from "react";
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
import { useEventForm } from "../hooks/useEventForm";

interface EventFormModalrops {}

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

const EventFormModal: React.FC<EventFormModalrops> = () => {
  const form = useEventForm();

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => form.setShowEventForm(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal
        isOpen={form.showEventForm}
        swipeToClose={true}
        onDidDismiss={() => form.setShowEventForm(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => form.setShowEventForm(false)}>
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle>Thêm vào nhật ký</IonTitle>
            <IonButtons slot="end">
              <IonButton type="submit" onClick={form.submit}>
                Lưu
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent color="light">
          <IonItem lines="full">
            <IonIcon size="large" icon={readerOutline} color="medium" />
            <IonLabel></IonLabel>
            <IonInput
              type="number"
              placeholder="Số lượng"
              style={{ textAlign: "right", fontSize: 36 }}
              value={form.quantity}
              onIonChange={(e) =>
                form.setQuantity(parseInt(e.detail.value!, 0))
              }
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
              value={form.productCode}
              onIonChange={(e) => form.setProductCode(e.detail.value!)}
            >
              {form.products?.map((item) => (
                <IonSelectOption key={item.id} value={item.id}>
                  {item.name}
                </IonSelectOption>
              ))}
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
              value={form.sizeCode}
              onIonChange={(e) => form.setSizeCode(e.detail.value!)}
            >
              {form.products
                ?.find((v) => v.id === form.productCode)
                ?.sizes?.map((item, index) => (
                  <IonSelectOption key={index} value={item}>
                    {item}
                  </IonSelectOption>
                ))}
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
              value={form.typeCode}
              onIonChange={(e) => form.setTypeCode(e.detail.value!)}
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
              value={form.workshop}
              onIonChange={(e) => form.setWorkshop(e.detail.value!)}
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
              {selectedDateLabelParser(form.selectedDate)}
            </IonLabel>
            <IonInput
              type="date"
              placeholder="ngày tháng"
              value={form.selectedDate}
              onIonChange={(e) => form.setSelectedDate(e.detail.value!)}
              style={{ textAlign: "right" }}
            />
          </IonItem>
          <IonItem lines="full">
            <IonIcon size="large" icon={readerOutline} color="medium" />
            <IonLabel color="medium"></IonLabel>
            <IonInput
              placeholder="Ghi chú"
              value={form.note}
              onIonChange={(e) => form.setNote(e.detail.value!)}
            />
          </IonItem>

          <IonItemDivider color="light"></IonItemDivider>
          <IonItem
            lines="full"
            button
            onClick={() => form.setShowEventForm(false)}
          >
            <IonLabel color="danger" style={{ textAlign: "center" }}>
              Hủy
            </IonLabel>
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};

export default EventFormModal;
