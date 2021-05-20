import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLoading,
  IonPage,
  IonText,
} from "@ionic/react";
import { useSelector } from "../../store";
import { auth } from "../../config/firebase";
import { toast } from "../../utils/toast";
import { checkmarkCircleOutline } from "ionicons/icons";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { isLoading } = useSelector((state) => state.loading);
  const handlePasswordReset = () => {
    if (email)
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          setSubmitted(true);
        })
        .catch(() => {
          toast("Có lỗi xảy ra vui lòng nhập đúng email, thử lại!");
        });
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
            {submitted ? (
              <IonCard>
                <IonItem routerLink="/">
                  <IonIcon
                    slot="start"
                    icon={checkmarkCircleOutline}
                    color="success"
                  />
                  <br />
                  <IonText>Nhấn để quay lại trang chủ</IonText>
                </IonItem>
              </IonCard>
            ) : (
              <>
                <IonCard>
                  <IonItem>
                    <IonInput
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                      type="email"
                      name="email"
                      placeholder="Nhập email"
                    ></IonInput>
                  </IonItem>
                </IonCard>
                <IonButton
                  onClick={() => handlePasswordReset()}
                  style={{ margin: 10 }}
                  fill="solid"
                  expand="block"
                >
                  Gửi mail lấy lại mật khẩu
                </IonButton>
                <IonButton
                  style={{ margin: 10 }}
                  fill="default"
                  expand="block"
                  routerLink="/login"
                >
                  Quay lại trang đăng nhập
                </IonButton>
              </>
            )}
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PasswordResetPage;
