import {
  IonCard,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonPage,
  IonText,
} from "@ionic/react";
import { homeOutline, logOutOutline } from "ionicons/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import { signOut } from "../../store/user/userSlice";

const AnonymousPage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signOut());
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
              {isLoggedIn ? (
                <IonItem onClick={handleLogout} button>
                  <IonIcon slot="start" icon={logOutOutline} />
                  <IonText>Đăng xuất</IonText>
                </IonItem>
              ) : (
                <IonItem href="/" button>
                  <IonIcon slot="start" icon={homeOutline} />
                  <IonText>Trang chủ</IonText>
                </IonItem>
              )}
            </IonCard>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AnonymousPage;
