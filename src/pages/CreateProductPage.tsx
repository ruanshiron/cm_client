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
import { useProductForm } from "../hooks/useProductForm";
import "./CreateProductPage.scss";

interface CreateProductPageProps {}

const CreateProductPage: React.FC<CreateProductPageProps> = () => {
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
            <IonSelectOption value="bacon">Bacon</IonSelectOption>
            <IonSelectOption value="olives">Black Olives</IonSelectOption>
            <IonSelectOption value="xcheese">Extra Cheese</IonSelectOption>
            <IonSelectOption value="peppers">Green Peppers</IonSelectOption>
            <IonSelectOption value="mushrooms">Mushrooms</IonSelectOption>
            <IonSelectOption value="onions">Onions</IonSelectOption>
            <IonSelectOption value="pepperoni">Pepperoni</IonSelectOption>
            <IonSelectOption value="pineapple">Pineapple</IonSelectOption>
            <IonSelectOption value="sausage">Sausage</IonSelectOption>
            <IonSelectOption value="Spinach">Spinach</IonSelectOption>
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

export default CreateProductPage;
