import { IonButton, IonContent, IonGrid, IonPage, IonText } from "@ionic/react";
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
            <IonText>
              <h1>Quay lại trang chủ</h1>
            </IonText>
            {isLoggedIn ? (
              <IonButton onClick={handleLogout}>Đăng xuất</IonButton>
            ) : (
              <IonButton href="/">Trang chủ</IonButton>
            )}
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AnonymousPage;
