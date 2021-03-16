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
            value={form.fields?.product}
            onIonChange={(e) =>
              form.setFieldsValue({ product: e.detail.value! })
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
            value={form.fields?.size}
            onIonChange={(e) => form.setFieldsValue({ size: e.detail.value! })}
          >
            {form.products
              ?.find((v) => v.id === form.fields?.product)
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
            value={form.fields?.process}
            onIonChange={(e) =>
              form.setFieldsValue({ process: e.detail.value! })
            }
          >
            {form.products
              ?.find((v) => v.id === form.fields?.product)
              ?.processes?.map((process, i) => {
                const p = form.processes.find((v) => v.id === process);
                return (
                  <React.Fragment key={i}>
                    <IonSelectOption value={`${p?.id}/pending`}>
                      {p?.pending ? p?.pending : "đang " + p?.name}
                    </IonSelectOption>
                    <IonSelectOption value={`${p?.id}/fulfilled`}>
                      {p?.fulfilled ? p?.fulfilled : "đã " + p?.name}
                    </IonSelectOption>
                    <IonSelectOption value={`${p?.id}/rejected`}>
                      {p?.rejected ? p?.rejected : p?.name + " lỗi"}
                    </IonSelectOption>
                  </React.Fragment>
                );
              })}
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
            {selectedDateLabelParser(form.fields?.date)}
          </IonLabel>
          <IonInput
            type="date"
            placeholder="ngày tháng"
            value={form.fields?.date}
            onIonChange={(e) => form.setFieldsValue({ date: e.detail.value! })}
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
