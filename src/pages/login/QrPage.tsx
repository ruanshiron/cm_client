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
  IonLoading,
  IonPage,
  isPlatform,
} from "@ionic/react";
import { arrowBack, qrCodeOutline } from "ionicons/icons";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { functions } from "../../config/firebase";
import { loginWithToken } from "../../helpers/firebaseHelper";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loading/loadingSlice";
import { useSelector } from "../../store";

const QrPage = () => {
  const [qrValue, setQrValue] = useState<string>();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);
  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);
  };

  const isMobile = isPlatform("mobile");

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    if (qrValue) {
      try {
        const response = await functions.httpsCallable("createToken")(qrValue);
        const { token } = response.data;
        if (token) {
          loginWithToken(token);
        }
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    }
  };

  return (
    <IonPage>
      <IonLoading isOpen={isLoading} />
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
