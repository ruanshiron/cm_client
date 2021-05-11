import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import {
  accessibilityOutline,
  documentOutline,
  shirtOutline,
} from "ionicons/icons";
import React from "react";
import { useOrderForm } from "../../hooks/useOrderForm";

interface OrderFormProps {
  form: ReturnType<typeof useOrderForm>;
}

const OrderForm: React.FC<OrderFormProps> = ({ form }) => {
  return (
    <>
      <IonCard className="list-card">
        <IonCardContent>
          <IonItem>
            <IonLabel position="floating">Ngày tháng</IonLabel>
            <IonDatetime
              displayFormat="YYYY-MM-DD"
              doneText="OK!"
              cancelText="Hủy"
              value={form.fields.date}
              onIonChange={(e) => {
                form.setFieldsValue({ date: e.detail.value?.substring(0, 10) });
              }}
            />
          </IonItem>
        </IonCardContent>
      </IonCard>
      <IonCard className="list-card">
        <IonCardContent>
          <IonItem>
            <IonLabel position="floating">Ghi chú</IonLabel>
            <IonTextarea
              onIonChange={(e) =>
                form.setFieldsValue({ note: e.detail.value! })
              }
            ></IonTextarea>
          </IonItem>
        </IonCardContent>
      </IonCard>

      <IonRow>
        {form.fields.lines.map((line, index) => (
          <IonCol
            key={index}
            size="12"
            sizeMd={form.fields.lines.length <= 1 ? "12" : "6"}
            style={{ padding: 0 }}
          >
            <IonCard className="list-card">
              <IonCardContent>
                <IonItem>
                  <IonIcon slot="start" icon={shirtOutline} />
                  <IonLabel>
                    <b>Sản phẩm</b>
                  </IonLabel>
                  <IonSelect
                    okText="Chọn"
                    cancelText="Hủy"
                    interface="action-sheet"
                    placeholder="Sản phẩm"
                    value={form.fields.lines[index].productId}
                    onIonChange={(e) =>
                      form.setFieldsValue({
                        lines: form.fields.lines.map((line, i) =>
                          i === index
                            ? { ...line, productId: e.detail.value! }
                            : line
                        ),
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

                <IonItem>
                  <IonIcon slot="start" icon={accessibilityOutline} />
                  <IonLabel>
                    <b>Kích cỡ</b>
                  </IonLabel>
                  <IonSelect
                    okText="Chọn"
                    interface="action-sheet"
                    cancelText="Hủy"
                    placeholder="Kích cỡ"
                    value={form.fields.lines[index].size}
                    onIonChange={(e) =>
                      form.setFieldsValue({
                        lines: form.fields.lines.map((line, i) =>
                          i === index
                            ? { ...line, size: e.detail.value! }
                            : line
                        ),
                      })
                    }
                  >
                    {form.products
                      .find((v) => v.id === line.productId)
                      ?.sizes?.map((item, index) => (
                        <IonSelectOption key={index} value={item}>
                          {item}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonIcon slot="start" icon={documentOutline} />
                  <IonLabel>
                    <b>Số lượng</b>
                  </IonLabel>
                  <IonInput
                    type="number"
                    placeholder="Nhập số lượng"
                    value={form.fields.lines[index].quantity || undefined}
                    style={{ textAlign: "right" }}
                    onIonChange={(e) =>
                      form.setFieldsValue({
                        lines: form.fields.lines.map((line, i) =>
                          i === index
                            ? { ...line, quantity: parseInt(e.detail.value!) }
                            : line
                        ),
                      })
                    }
                  ></IonInput>
                </IonItem>

                {form.fields.lines.length > 1 && (
                  <IonItem
                    button
                    detail={false}
                    onClick={() => form.removeLine(index)}
                  >
                    <IonLabel color="danger" style={{ textAlign: "center" }}>
                      Xóa
                    </IonLabel>
                  </IonItem>
                )}
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>

      <IonButton expand="block" onClick={form.addLine} style={{ margin: 10 }}>
        Thêm sản phẩm
      </IonButton>
    </>
  );
};

export default OrderForm;
