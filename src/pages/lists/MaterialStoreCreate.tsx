import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useMaterialStoreForm } from "../../hooks/useMaterialStoreForm";
import "./MaterialStoreCreate.scss";

interface MaterialStoreCreateProps {}

const MaterialStoreCreate: React.FC<MaterialStoreCreateProps> = () => {
  const form = useMaterialStoreForm();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/materials"></IonBackButton>
          </IonButtons>
          <IonTitle>Thêm nguồn nguyên liệu</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={form.submit}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <div className="ion-padding-top ion-padding-start"></div>
        <IonItem>
          <IonLabel position="floating">Tên cửa hàng (người cùng cấp)</IonLabel>
          <IonInput
            onIonChange={(e) => form.setFieldsValue({ name: e.detail.value! })}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Số điện thoại</IonLabel>
          <IonInput
            onIonChange={(e) =>
              form.setFieldsValue({ phonenumber: e.detail.value! })
            }
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Loại nguyên liệu</IonLabel>
          <IonSelect
            onIonChange={(e) => form.setFieldsValue({ types: e.detail.value! })}
            multiple={true}
            cancelText="Hủy"
            okText="Ok!"
          >
            <IonSelectOption value="fabric">Vải</IonSelectOption>
            <IonSelectOption value="thread">Chỉ</IonSelectOption>
            <IonSelectOption value="zipper">Khóa kéo</IonSelectOption>
            <IonSelectOption value="button">Khuy Bấm</IonSelectOption>
            <IonSelectOption value="wrapper">Túi bọc</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default MaterialStoreCreate;
