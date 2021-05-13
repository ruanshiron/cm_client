import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import {
  checkboxOutline,
  logInOutline,
  logOutOutline,
  mailOutline,
  textOutline,
} from "ionicons/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { useSelector } from "../../store";

import { signOut } from "../../store/user/userSlice";
import { formatDate } from "../../utils/date";
import { toast } from "../../utils/toast";

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  const dispatch = useDispatch();
  const [present] = useIonAlert();
  const user = useSelector((state) => state.user);
  const handleVerify = () => {
    if (!auth.currentUser?.emailVerified) {
      auth.currentUser?.sendEmailVerification();
      toast("Đã gửi email xác thực!");
    } else {
      toast("Email đã được xác thực!");
    }
  };

  const handleUpdateDisplayName = (displayName: string) => {
    auth.currentUser
      ?.updateProfile({ displayName })
      .then(() => {
        toast("Đã sửa tên hiển thị!");
      })
      .catch(() => {
        toast("Có lỗi xảy ra, không thể hoàn thành thao tác!");
      });
  };
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Cài đặt</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeLg="8">
              <IonCard className="list-card ion-margin-top">
                <IonCardContent>
                  <IonList style={{ border: "none" }}>
                    <IonItem>
                      <IonIcon icon={mailOutline} slot="start"></IonIcon>
                      <IonLabel>Email</IonLabel>
                      <IonText slot="end">{user.email}</IonText>
                    </IonItem>
                    <IonItem
                      button
                      onClick={() => {
                        present({
                          header: "Nhập tên hiển thị",
                          inputs: [
                            {
                              name: "name",
                              placeholder: "Tên hiển thị",
                              type: "text",
                              value: user.displayName,
                            },
                          ],
                          buttons: [
                            "huỷ",
                            {
                              text: "Ok",
                              handler: (data) => {
                                handleUpdateDisplayName(data.name);
                              },
                            },
                          ],
                        });
                      }}
                    >
                      <IonIcon icon={textOutline} slot="start"></IonIcon>
                      <IonLabel>Tên hiển thị</IonLabel>
                      <IonText slot="end">
                        {auth.currentUser?.displayName}
                      </IonText>
                    </IonItem>
                    <IonItem>
                      <IonIcon icon={logInOutline} slot="start"></IonIcon>
                      <IonLabel>Ngày đăng ký</IonLabel>
                      <IonText slot="end">
                        {formatDate(
                          new Date(
                            auth.currentUser?.metadata.creationTime || ""
                          )
                        )}
                      </IonText>
                    </IonItem>
                    <IonItem button onClick={handleVerify}>
                      <IonIcon icon={checkboxOutline} slot="start"></IonIcon>
                      <IonLabel>Xác thực email</IonLabel>
                      {auth.currentUser?.emailVerified ? (
                        <IonText slot="end" color="success">
                          đã xác thực
                        </IonText>
                      ) : (
                        <IonText slot="end" color="danger">
                          chưa xác thực
                        </IonText>
                      )}
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="8">
              <IonCard className="list-card ion-margin-top">
                <IonCardContent>
                  <IonItem
                    button
                    detail={false}
                    lines="none"
                    onClick={() => dispatch(signOut())}
                  >
                    <IonIcon
                      icon={logOutOutline}
                      slot="start"
                      color="danger"
                    ></IonIcon>
                    <IonLabel slot="start" color="danger">
                      <b>Đăng xuất</b>
                    </IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
