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
import { createUserWithEmail } from "../../helpers/firebaseHelper";

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = async () => {
    if (email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
      return toast("Hãy nhập email và mật khẩu");
    }

    if (!validateEmail(email)) {
      return toast("Hãy nhập đúng email")
    }

    if (password !== confirmPassword) {
      return toast("Nhập lại mật khẩu")
    }

    const res = await createUserWithEmail(email, password);

    if (res) {
      toast("Đăng ký thành công");
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
              <IonItem>
                <IonIcon icon={keyOutline} slot="start"></IonIcon>
                <IonInput
                  value={confirmPassword}
                  onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                  type="password"
                ></IonInput>
              </IonItem>
            </IonCard>
            <IonButton
              onClick={() => submit()}
              style={{ margin: 10 }}
              fill="solid"
              expand="block"
              type="submit"
            >
              Đăng Ký
            </IonButton>
            <IonButton
              style={{ margin: 10 }}
              fill="default"
              expand="block"
              href="/login"
            >
              Đăng nhập
            </IonButton>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
