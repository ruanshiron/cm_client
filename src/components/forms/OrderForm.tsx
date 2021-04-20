import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import { useOrderForm } from "../../hooks/useOrderForm";

interface OrderFormProps {
  form: ReturnType<typeof useOrderForm>;
}

const OrderForm: React.FC<OrderFormProps> = ({ form }) => {
  return (
    <>
      <IonCard>
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel>Khách hàng</IonLabel>
            <IonSelect
              okText="Chọn"
              cancelText="Hủy"
              interface="action-sheet"
              placeholder="Khách hàng"
              value={form.fields?.customer}
              onIonChange={(e) =>
                form.setFieldsValue({ customer: e.detail.value! })
              }
            >
              {form.customers.map((item) => (
                <IonSelectOption key={item.id} value={item.id}>
                  {item.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardContent>
          <IonItem lines="none">
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
            <IonCard>
              <IonCardContent>
                <IonItem>
                  <IonLabel>Sản phẩm</IonLabel>
                  <IonSelect
                    okText="Chọn"
                    cancelText="Hủy"
                    interface="action-sheet"
                    placeholder="Sản phẩm"
                    value={form.fields.lines[index].product}
                    onIonChange={(e) =>
                      form.setFieldsValue({
                        lines: form.fields.lines.map((line, i) =>
                          i === index
                            ? { ...line, product: e.detail.value! }
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
                  <IonLabel>Kích cỡ</IonLabel>
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
                      .find((v) => v.id === line.product)
                      ?.sizes?.map((item, index) => (
                        <IonSelectOption key={index} value={item}>
                          {item}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel>Số lượng</IonLabel>
                  <IonInput
                    type="number"
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
