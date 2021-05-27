import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, close } from "ionicons/icons";
import StageFullModalForm from "../forms/StageFullModalForm";
import { useStageFullModalForm } from "../../hooks/useStageFullModalForm";
import { toast } from "../../utils/toast";
const StageFab = () => {
  const [showModal, setShowModal] = useState(false);
  const form = useStageFullModalForm();
  const handleSubmit = () => {
    form
      .submit()
      .then(() => {
        setShowModal(false);
      })
      .catch((e) => {
        toast(e.message);
      });
  };
  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton
          onClick={() => {
            setShowModal(true);
          }}
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowModal(false)}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Thêm mới</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleSubmit}>Lưu</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <StageFullModalForm form={form} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default StageFab;
