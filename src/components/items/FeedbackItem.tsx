import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { close, earOutline } from "ionicons/icons";
import React, { useState } from "react";
import { database } from "../../config/firebase";
import firebase from "firebase/app";
import { useSelector } from "../../store";

const FeedbackItem = () => {
  const [presentToast, dismissToast] = useIonToast();
  const {
    email: authorEmail,
    uid: authorId,
    displayName: authorName,
  } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<string>();
  const handleClick = () => {
    setShowModal(true);
  };
  const handleDismiss = () => {
    setShowModal(false);
  };
  const handleSubmit = () => {
    dismissToast();
    if (content) {
      database
        .collection("feedback")
        .add({
          authorEmail,
          authorId,
          authorName,
          content,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setContent(undefined);
          handleDismiss();
          presentToast({
            message: "Đã gửi góp ý.",
            duration: 2500,
            color: "success",
            buttons: [{ text: "Đóng", handler: () => dismissToast() }],
          });
        })
        .catch(() => {
          presentToast({
            buttons: [{ text: "Thử lại", handler: () => handleSubmit() }],
            message: "Không thể gửi, bạn có muốn thử lại?",
            color: "danger",
          });
        });
    } else {
      presentToast({
        message: "Điền góp ý của bạn vào trước!",
        duration: 2500,
        color: "warning",
      });
    }
  };
  return (
    <>
      <IonItem button detail={false} lines="none" onClick={handleClick}>
        <IonIcon icon={earOutline} slot="start"></IonIcon>
        <IonLabel slot="start">
          <b>Góp ý</b>
        </IonLabel>
      </IonItem>
      <IonModal isOpen={showModal} onDidDismiss={handleDismiss}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleDismiss}>
                <IonIcon icon={close} slot="icon-only" />
              </IonButton>
            </IonButtons>
            <IonTitle>Góp ý</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleSubmit}>Gửi</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Viết góp ý của bạn</IonLabel>
              <IonTextarea
                autofocus
                placeholder="Aa"
                rows={16}
                value={content}
                onIonChange={(e) => setContent(e.detail.value!)}
              ></IonTextarea>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default FeedbackItem;
