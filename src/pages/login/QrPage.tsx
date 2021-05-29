import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router";

const QrPage = () => {
  const [qrValue, setQrValue] = useState<string>();
  const { code } = useParams<{ code: string }>();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);
  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    handleSubmit(data.text);
  };

  const isMobile = isPlatform("hybrid");

  const handleSubmit = async (code = qrValue) => {
    dispatch(setLoading(true));
    if (code) {
      try {
        const response = await functions.httpsCallable("createToken")(code);
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

  useEffect(() => {
    if (code) handleSubmit(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

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
              onClick={() => handleSubmit()}
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
