import { IonButton, IonContent, IonGrid, IonPage, IonText } from "@ionic/react";
import React from "react";

const AnonymousPage = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <div
            style={{
              margin: "auto",
              maxWidth: 340,
              marginTop: "calc(50vh - 152px)",
            }}
          >
            <IonText>
              <h1>Quay lại trang chủ</h1>
            </IonText>
            <IonButton href="/">Trang chủ</IonButton>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AnonymousPage;
