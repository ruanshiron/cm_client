import React from "react";
import {
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonList,
  IonTextarea,
} from "@ionic/react";
import {
  bodyOutline,
  calendarClearOutline,
  helpCircleOutline,
  peopleCircleOutline,
  readerOutline,
  shirtOutline,
} from "ionicons/icons";
import { useStageForm } from "../../hooks/useStageForm";
import { selectedDateLabelParser } from "../../utils/date";

interface StageFormProps {
  form: ReturnType<typeof useStageForm>;
}

export const StageForm: React.FC<StageFormProps> = ({ form }) => {
  return (
    <IonCard className="list-card">
      <IonList lines="full" style={{ border: "none" }}>
        <IonItem>
          <IonIcon slot="start" size="large" icon={calendarClearOutline} />
          <IonLabel>
            <b>{selectedDateLabelParser(form.fields?.date)}</b>
          </IonLabel>
          <IonInput
            type="date"
            placeholder="ngày tháng"
            value={form.fields?.date}
            onIonChange={(e) => form.setFieldsValue({ date: e.detail.value! })}
            style={{ textAlign: "right" }}
          />
        </IonItem>
        <IonItem>
          <IonIcon slot="start" size="large" icon={readerOutline} />
          <IonLabel>
            <b>Số lượng</b>
          </IonLabel>
          <IonInput
            type="number"
            style={{ textAlign: "right", fontSize: 36 }}
            value={form.fields?.quantity}
            onIonChange={(e) =>
              form.setFieldsValue({ quantity: parseInt(e.detail.value!, 0) })
            }
            required
          />
        </IonItem>
        <IonItem>
          <IonIcon slot="start" size="large" icon={shirtOutline} />
          <IonLabel>
            <b>Sản phẩm</b>
          </IonLabel>
          <IonSelect
            okText="Chọn"
            cancelText="Hủy"
            interface="action-sheet"
            placeholder="chọn sản phẩm"
            value={form.fields?.productId}
            onIonChange={(e) =>
              form.setFieldsValue({
                productId: e.detail.value!,
                productName: form.products.find((i) => i.id === e.detail.value!)
                  ?.name,
              })
            }
          >
            {form.products.length > 0 ? (
              form.products.map((item) => (
                <IonSelectOption key={item.id} value={item.id}>
                  {item.name}
                </IonSelectOption>
              ))
            ) : (
              <IonSelectOption value={form.fields.productId}>
                {form.fields.productName}
              </IonSelectOption>
            )}
          </IonSelect>
        </IonItem>
        {form.fields.productSize ? (
          <IonItem>
            <IonIcon slot="start" size="large" icon={bodyOutline} />
            <IonLabel>
              <b>Kích cỡ</b>
            </IonLabel>
            <IonSelect
              okText="Chọn"
              cancelText="Hủy"
              interface="action-sheet"
              placeholder="chọn kích cỡ"
              value={form.fields?.productSize}
              onIonChange={(e) =>
                form.setFieldsValue({ productSize: e.detail.value! })
              }
            >
              {form.selectedProcduct ? (
                form.selectedProcduct.sizes.map((item, index) => (
                  <IonSelectOption key={index} value={item}>
                    {item}
                  </IonSelectOption>
                ))
              ) : (
                <IonSelectOption value={form.fields.productSize}>
                  {form.fields.productSize}
                </IonSelectOption>
              )}
            </IonSelect>
          </IonItem>
        ) : (
          <IonItem>
            <IonIcon slot="start" size="large" icon={bodyOutline} />
            <IonLabel>
              <b>Kích cỡ</b>
            </IonLabel>
            <IonSelect
              okText="Chọn"
              cancelText="Hủy"
              interface="action-sheet"
              placeholder="chọn kích cỡ"
              value={form.fields?.productSizes}
              onIonChange={(e) =>
                form.setFieldsValue({ productSizes: e.detail.value! })
              }
            >
              {form.selectedProcduct ? (
                form.selectedProcduct.sizes.map((item, index) => (
                  <IonSelectOption key={index} value={item}>
                    {item}
                  </IonSelectOption>
                ))
              ) : (
                <IonSelectOption value={form.fields.productSize}>
                  {form.fields.productSize}
                </IonSelectOption>
              )}
            </IonSelect>
          </IonItem>
        )}
        <IonItem>
          <IonIcon slot="start" size="large" icon={peopleCircleOutline} />
          <IonLabel>
            <b>Xưởng</b>
          </IonLabel>
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
            {form.workshops.length > 0 ? (
              form.workshops.map((workshop, i) => (
                <IonSelectOption key={i} value={workshop.id}>
                  {workshop.name}
                </IonSelectOption>
              ))
            ) : (
              <IonSelectOption value={form.fields.workshopId}>
                {form.fields.workshopName}
              </IonSelectOption>
            )}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonIcon slot="start" size="large" icon={helpCircleOutline} />
          <IonLabel>
            <b>Quy trình</b>
          </IonLabel>
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
            {form.products.length > 0 ? (
              form.processes.map((process, i) => {
                return (
                  <React.Fragment key={i}>
                    <IonSelectOption
                      value={JSON.stringify({
                        id: process.id,
                        status: "pending",
                      })}
                    >
                      {process.pending}
                    </IonSelectOption>
                    <IonSelectOption
                      value={JSON.stringify({
                        id: process.id,
                        status: "fulfilled",
                      })}
                    >
                      {process.fulfilled}
                    </IonSelectOption>
                    <IonSelectOption
                      value={JSON.stringify({
                        id: process.id,
                        status: "rejected",
                      })}
                    >
                      {process.rejected}
                    </IonSelectOption>
                  </React.Fragment>
                );
              })
            ) : (
              <IonSelectOption
                value={JSON.stringify({
                  id: form.fields.processId,
                  status: form.fields.processStatus,
                })}
              >
                {form.fields.processLabel}
              </IonSelectOption>
            )}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" size="large" icon={readerOutline} />
          <IonLabel position="stacked">Ghi chú</IonLabel>
          <IonTextarea
            placeholder="Ghi chú"
            value={form.fields?.note}
            onIonChange={(e) => form.setFieldsValue({ note: e.detail.value! })}
          />
        </IonItem>
      </IonList>
    </IonCard>
  );
};
