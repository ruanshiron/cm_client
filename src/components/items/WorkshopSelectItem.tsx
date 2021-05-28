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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, peopleCircleOutline } from "ionicons/icons";
import React, { useState } from "react";
import { Workshop } from "../../models/workshop";
import { useSelector } from "../../store";

interface Props {
  value?: Workshop;
  onChange: (value: Workshop) => void;
}

const WorkshopSelectItem: React.FC<Props> = ({ value, onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const workshops = useSelector((state) => state.workshops);
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleClickItem = (item: any) => {
    onChange(item);
    setShowModal(false);
  };
  return (
    <>
      <IonItem button onClick={() => setShowModal(true)}>
        <IonIcon slot="start" icon={peopleCircleOutline} />
        {value ? (
          <IonLabel>{value.name}</IonLabel>
        ) : (
          <IonLabel color="medium">Chọn xưởng</IonLabel>
        )}
      </IonItem>
      <IonModal isOpen={showModal} onDidDismiss={handleCancel}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleCancel}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Chọn xưởng</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList lines="full">
            {workshops.map((item, index) => (
              <IonItem key={index} button onClick={() => handleClickItem(item)}>
                <IonText slot="start">
                  <b>{item.name}</b>
                </IonText>
                <IonText slot="end">&nbsp;({item.phonenumber})</IonText>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default WorkshopSelectItem;
