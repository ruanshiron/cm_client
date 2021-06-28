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
import { format } from "date-fns";
import {
  checkboxOutline,
  logInOutline,
  logOutOutline,
  mailOutline,
  notificationsOutline,
  textOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { useSelector } from "../../store";

import { signOut } from "../../store/user/userSlice";
import { toast } from "../../utils/toast";

import { Plugins } from "@capacitor/core";
import { FCM } from "@capacitor-community/fcm";
import FeedbackItem from "../../components/items/FeedbackItem";
const { PushNotifications } = Plugins;
const fcm = new FCM();

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  const dispatch = useDispatch();
  const [present] = useIonAlert();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(auth.currentUser?.displayName);
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
        setName(displayName);
      })
      .catch(() => {
        toast("Có lỗi xảy ra, không thể hoàn thành thao tác!");
      });
  };

  const handleToggleNoti = () => {
    PushNotifications.requestPermission()
      .then(() => {
        PushNotifications.register()
          .then(() => {
            //
            // Subscribe to a specific topic
            // you can use `FCMPlugin` or just `fcm`
            fcm
              .subscribeTo({ topic: user.uid })
              .then((r) =>
                alert(
                  `Thông báo với ${user.uid} đã được bật nếu muốn tắt hãy tắt trong thiết bị của bạn`
                )
              )
              .catch((err) => console.log(err));
          })
          .catch((err) => alert(JSON.stringify(err)));
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };
  useEffect(() => {});
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
                    <IonItem button onClick={() => handleToggleNoti()}>
                      <IonIcon slot="start" icon={notificationsOutline} />
                      <IonLabel>Bật thông báo</IonLabel>
                    </IonItem>
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
                              value: name,
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
                      <IonText slot="end">{name}</IonText>
                    </IonItem>
                    <IonItem>
                      <IonIcon icon={logInOutline} slot="start"></IonIcon>
                      <IonLabel>Ngày đăng ký</IonLabel>
                      <IonText slot="end">
                        {format(
                          new Date(
                            auth.currentUser?.metadata.creationTime || ""
                          ),
                          "dd/MM/yyyy"
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
                    <FeedbackItem />
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
