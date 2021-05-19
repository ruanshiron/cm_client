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
} from "@ionic/react";
import { keyOutline, mailOutline } from "ionicons/icons";
import { toast } from "../../utils/toast";
import { createUserWithEmail } from "../../helpers/firebaseHelper";
import { useSelector } from "../../store";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loading/loadingSlice";

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const submit = async () => {
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      return toast("Hãy nhập email và mật khẩu");
    }

    if (!validateEmail(email)) {
      return toast("Hãy nhập đúng email");
    }

    if (password !== confirmPassword) {
      return toast("Nhập lại mật khẩu");
    }

    dispatch(setLoading(true));
    const res = await createUserWithEmail(email, password);

    if (res) {
      dispatch(setLoading(false));
      toast("Đăng ký thành công");
    } else {
      dispatch(setLoading(false));
      toast("Email hoặc mật khẩu không chính xác");
      setPassword("");
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
            <IonCard>
              <IonItem>
                <IonIcon icon={mailOutline} slot="start"></IonIcon>
                <IonInput
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  type="email"
                  name="email"
                  placeholder="Email đang sử dụng"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonIcon icon={keyOutline} slot="start"></IonIcon>
                <IonInput
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonIcon icon={keyOutline} slot="start"></IonIcon>
                <IonInput
                  value={confirmPassword}
                  onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                  type="password"
                  name="password"
                  placeholder="Nhập lại mật khẩu"
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
              routerLink="/login"
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
