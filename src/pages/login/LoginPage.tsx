import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
} from "@ionic/react";
import { keyOutline, mailOutline } from "ionicons/icons";
import { toast } from "../../utils/toast";
import { loginWithEmail } from "../../helpers/firebaseHelper";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (email.trim() === "" || password.trim() === "") {
      return toast("Hãy nhập email và mật khẩu");
    }

    const res = await loginWithEmail(email, password);

    if (res) {
      toast("Đăng nhập thành công");
    } else {
      toast("Email hoặc mật khẩu không chính xác");
      setPassword("");
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
            <IonCard>
              <IonItem>
                <IonIcon icon={mailOutline} slot="start"></IonIcon>
                <IonInput
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  type="email"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonIcon icon={keyOutline} slot="start"></IonIcon>
                <IonInput
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  type="password"
                ></IonInput>
              </IonItem>
            </IonCard>
            <IonButton
              onClick={() => login()}
              style={{ margin: 10 }}
              fill="solid"
              expand="block"
            >
              Đăng nhập
            </IonButton>
            <IonButton
              style={{ margin: 10 }}
              fill="outline"
              expand="block"
              routerLink="/signup"
            >
              Đăng ký
            </IonButton>
            <IonButton
              style={{ margin: 10 }}
              fill="outline"
              expand="block"
              routerLink="/qr"
            >
              Quét mã
            </IonButton>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
