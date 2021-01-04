import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./CreateProductPage.scss";

interface CreateProductPageProps {}

const CreateProductPage: React.FC<CreateProductPageProps> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/report"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default CreateProductPage;
