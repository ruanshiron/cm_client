import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import OrderForm from "../../components/forms/OrderForm";
import { useOrderForm } from "../../hooks/useOrderForm";
import "./OrderCreate.scss";

interface OrderCreateProps {}

const OrderCreate: React.FC<OrderCreateProps> = () => {
  const form = useOrderForm();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/product"></IonBackButton>
          </IonButtons>
          <IonTitle>Thêm đơn hàng</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={form.submit}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {/* <IonContent color="light">
        <div className="ion-padding-top ion-padding-start"></div>
        <IonItem lines="full">
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
            {form.customers?.map((item) => (
              <IonSelectOption key={item.id} value={item.id}>
                {item.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        {form.fields.lines.map((line, index) => (
          <>
            <div className="ion-padding-top ion-padding-start"></div>
            <IonItem lines="full">
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
                      i === index ? { ...line, product: e.detail.value! } : line
                    ),
                  })
                }
              >
                {form.products?.map((item) => (
                  <IonSelectOption key={item.id} value={item.id}>
                    {item.name}
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

            <IonItem lines="full">
              <IonLabel>Kích cỡ</IonLabel>
              <IonSelect
                okText="Chọn"
                cancelText="Hủy"
                interface="action-sheet"
                placeholder="Kích cỡ"
                value={form.fields.lines[index].size}
                onIonChange={(e) =>
                  form.setFieldsValue({
                    lines: form.fields.lines.map((line, i) =>
                      i === index ? { ...line, size: e.detail.value! } : line
                    ),
                  })
                }
              >
                {form.products
                  ?.find((v) => v.id === line.product)
                  ?.sizes?.map((item, index) => (
                    <IonSelectOption key={index} value={item}>
                      {item}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>
            {form.fields.lines.length > 1 && (
              <IonItem
                button
                detail={false}
                onClick={() => form.removeLine(index)}
              >
                <IonLabel color="danger" slot="end">
                  Xóa
                </IonLabel>
              </IonItem>
            )}
          </>
        ))}

        <div className="ion-padding-top ion-padding-start"></div>
        <IonButton expand="full" onClick={form.addLine}>
          Thêm sản phẩm
        </IonButton>

        <div className="ion-padding-top ion-padding-start"></div>
        <IonItem button>
          <IonLabel position="floating">Ghi chú</IonLabel>
          <IonTextarea
            onIonChange={(e) => form.setFieldsValue({ note: e.detail.value! })}
          ></IonTextarea>
        </IonItem>
      </IonContent>
      */}
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2">
              <OrderForm form={form} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OrderCreate;
