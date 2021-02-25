import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
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
  bodyOutline,
  calendarClearOutline,
  closeOutline,
  helpCircleOutline,
  peopleCircleOutline,
  readerOutline,
  shirtOutline,
} from "ionicons/icons";
import { useEventForm } from "../../hooks/useEventForm";
import { selectedDateLabelParser } from "../../utils/date";

interface EventModalProps {
  form: ReturnType<typeof useEventForm>;
}

export const EventModal: React.FC<EventModalProps> = ({ form }) => {
  return (
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
          <IonTitle>{form.fields.id ? "Cập nhật" : "Thêm mới"}</IonTitle>
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
            value={form.fields?.quantity}
            onIonChange={(e) =>
              form.setFieldsValue({ quantity: parseInt(e.detail.value!, 0) })
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
            value={form.fields?.productCode}
            onIonChange={(e) =>
              form.setFieldsValue({ productCode: e.detail.value! })
            }
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
            value={form.fields?.sizeCode}
            onIonChange={(e) =>
              form.setFieldsValue({ sizeCode: e.detail.value! })
            }
          >
            {form.products
              ?.find((v) => v.id === form.fields?.productCode)
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
            value={form.fields?.typeCode}
            onIonChange={(e) =>
              form.setFieldsValue({ typeCode: e.detail.value! })
            }
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
            value={form.fields?.workshop}
            onIonChange={(e) =>
              form.setFieldsValue({ workshop: e.detail.value! })
            }
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
            {selectedDateLabelParser(form.fields?.selectedDate)}
          </IonLabel>
          <IonInput
            type="date"
            placeholder="ngày tháng"
            value={form.fields?.selectedDate}
            onIonChange={(e) =>
              form.setFieldsValue({ selectedDate: e.detail.value! })
            }
            style={{ textAlign: "right" }}
          />
        </IonItem>
        <IonItem lines="full">
          <IonIcon size="large" icon={readerOutline} color="medium" />
          <IonLabel color="medium"></IonLabel>
          <IonInput
            placeholder="Ghi chú"
            value={form.fields?.note}
            onIonChange={(e) => form.setFieldsValue({ note: e.detail.value! })}
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
  );
};
