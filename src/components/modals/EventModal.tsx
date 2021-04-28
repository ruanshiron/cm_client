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
  useIonAlert,
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
  const [present] = useIonAlert();
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
            value={form.fields?.productId}
            onIonChange={(e) =>
              form.setFieldsValue({
                productId: e.detail.value!,
                productName: form.products.find((i) => i.id === e.detail.value!)
                  ?.name,
              })
            }
          >
            {form.products.map((item) => (
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
            value={form.fields?.productSize}
            onIonChange={(e) =>
              form.setFieldsValue({ productSize: e.detail.value! })
            }
          >
            {form.products
              ?.find((v) => v.id === form.fields?.productId)
              ?.sizes.map((item, index) => (
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
            value={JSON.stringify({
              id: form.fields.processId,
              status: form.fields.processStatus,
            })}
            onIonChange={(e) => {
              const obj = JSON.parse(e.detail.value!);
              const process = form.processes.find((i) => i.id === obj.id);

              if (process) {
                if (obj.status === "pending") {
                  form.setFieldsValue({
                    processId: obj.id,
                    processStatus: obj.status,
                    processLabel: process.pending,
                  });
                }
                if (obj.status === "fulfilled") {
                  form.setFieldsValue({
                    processId: obj.id,
                    processStatus: obj.status,
                    processLabel: process.fulfilled,
                  });
                }
                if (obj.status === "rejected") {
                  form.setFieldsValue({
                    processId: obj.id,
                    processStatus: obj.status,
                    processLabel: process.rejected,
                  });
                }
              }
            }}
          >
            {form.products
              ?.find((v) => v.id === form.fields?.productId)
              ?.processes?.map((process, i) => {
                const p = form.processes.find((v) => v.id === process);
                return (
                  <React.Fragment key={i}>
                    <IonSelectOption
                      value={JSON.stringify({
                        id: p?.id,
                        status: "pending",
                      })}
                    >
                      {p?.pending ? p?.pending : "đang " + p?.name}
                    </IonSelectOption>
                    <IonSelectOption
                      value={JSON.stringify({
                        id: p?.id,
                        status: "fulfilled",
                      })}
                    >
                      {p?.fulfilled ? p?.fulfilled : "đã " + p?.name}
                    </IonSelectOption>
                    <IonSelectOption
                      value={JSON.stringify({
                        id: p?.id,
                        status: "rejected",
                      })}
                    >
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
            value={form.fields?.workshopId}
            onIonChange={(e) =>
              form.setFieldsValue({
                workshopId: e.detail.value!,
                workshopName: form.workshops.find(
                  (i) => i.id === e.detail.value!
                )?.name,
              })
            }
          >
            {form.workshops.map((workshop, i) => (
              <IonSelectOption key={i} value={workshop.id}>
                {workshop.name}
              </IonSelectOption>
            ))}
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
          onClick={() =>
            present({
              header: "Xóa",
              message: "Xác nhận sẽ xóa sự kiện này",
              buttons: [
                "Hủy",
                { text: "Ok", handler: (d) => form.remove() },
              ],
            })
          }
        >
          <IonLabel color="danger" style={{ textAlign: "center" }}>
            Xóa
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};
