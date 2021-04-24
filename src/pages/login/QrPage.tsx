import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  isPlatform,
} from "@ionic/react";
import { arrowBack, qrCodeOutline } from "ionicons/icons";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { findWorkshopByCode } from "../../models/workshop";

const QrPage = () => {
  const [qrValue, setQrValue] = useState<string>();

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);
  };

  const isMobile = isPlatform("mobile");

  const handleSubmit = async () => {
    if (qrValue) {
      const workshop = await findWorkshopByCode(qrValue);
      console.log(workshop);
    }
  };

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
            <IonButtons slot="end">
              <IonButton routerLink="/login">
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonCard>
              <IonItem>
                <IonIcon icon={qrCodeOutline} slot="start"></IonIcon>
                <IonInput
                  placeholder="Nhập mã"
                  value={qrValue}
                  onIonChange={(e) => setQrValue(e.detail.value!)}
                  type="email"
                ></IonInput>
              </IonItem>
            </IonCard>
            <IonButton
              style={{ margin: 10 }}
              fill="solid"
              expand="block"
              onClick={handleSubmit}
            >
              Đi đến
            </IonButton>
            {isMobile && (
              <IonButton
                style={{ margin: 10 }}
                fill="outline"
                expand="block"
                onClick={openScanner}
              >
                Quét
              </IonButton>
            )}
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default QrPage;
