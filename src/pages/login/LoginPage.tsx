import React from "react";
import {
  IonCard,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { logoFacebook, logoGoogle } from "ionicons/icons";
import { loginWithGoogle } from "../../helpers/firebaseHelper";

const LoginPage = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonImg
            style={{ maxWidth: 300, margin: "auto" }}
            src="/assets/icon/icon.png"
          ></IonImg>
          <IonCard
            button
            style={{ margin: "auto" }}
            className="social-login-btn"
            onClick={loginWithGoogle}
          >
            <IonIcon className="social-login-icon" icon={logoGoogle} />
            <IonTitle>Đăng nhập với Google</IonTitle>
          </IonCard>
          <IonCard
            button
            style={{ margin: "auto", marginTop: 12 }}
            className="social-login-btn"
          >
            <IonIcon className="social-login-icon" icon={logoFacebook} />
            <IonTitle>Đăng nhập với Facebook</IonTitle>
          </IonCard>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
