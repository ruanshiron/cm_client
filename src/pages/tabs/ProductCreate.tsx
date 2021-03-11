import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import React from "react";
import { useProductForm } from "../../hooks/useProductForm";
import "./ProductCreate.scss";

interface ProductCreateProps {}

const ProductCreate: React.FC<ProductCreateProps> = () => {
  const form = useProductForm();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/product"></IonBackButton>
          </IonButtons>
          <IonTitle>Thêm sản phẩm</IonTitle>
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
          <IonLabel position="floating">Tên</IonLabel>
          <IonInput
            onIonChange={(e) => form.setFieldsValue({ name: e.detail.value! })}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Mã</IonLabel>
          <IonInput
            onIonChange={(e) => form.setFieldsValue({ code: e.detail.value! })}
          ></IonInput>
        </IonItem>
        <div className="ion-padding-top ion-padding-start"></div>
        <IonItem>
          <IonLabel position="floating">Kích cỡ</IonLabel>
          <IonSelect
            onIonChange={(e) => form.setFieldsValue({ sizes: e.detail.value! })}
            multiple={true}
            cancelText="Hủy"
            okText="Ok!"
          >
            <IonSelectOption value="XS">XS</IonSelectOption>
            <IonSelectOption value="S">S</IonSelectOption>
            <IonSelectOption value="M">M</IonSelectOption>
            <IonSelectOption value="L">L</IonSelectOption>
            <IonSelectOption value="XL">XL</IonSelectOption>
            <IonSelectOption value="XXL">XXL</IonSelectOption>
            <IonSelectOption value="XXXL">XXXL</IonSelectOption>
          </IonSelect>
        </IonItem>
        <div className="ion-padding-top ion-padding-start"></div>
        <IonItem lines="full" button>
          <IonIcon icon={cameraOutline} slot="start"></IonIcon>
          <IonThumbnail slot="end">
            <img
              alt=""
              src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
            />
          </IonThumbnail>
        </IonItem>
        <div className="ion-padding-top ion-padding-start"></div>
        <IonItem button>
          <IonLabel position="floating">Ghi chú</IonLabel>
          <IonInput></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ProductCreate;
