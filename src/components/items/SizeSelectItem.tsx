import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  checkboxOutline,
  checkmark,
  close,
  resizeOutline,
  squareOutline,
} from "ionicons/icons";
import React, { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface Props {
  values: string[];
  onConfirm: (values: string[]) => void;
}

const SizeSelectItem: React.FC<Props> = ({ values, onConfirm }) => {
  const [sizes, setSizes] = useState<string[]>(values);
  const [showModal, setShowModal] = useState(false);
  const isSelected = (size: string) => {
    return sizes.includes(size);
  };
  const handleClickItem = (size: string) => {
    if (isSelected(size)) {
      setSizes((sizes) => {
        const state = sizes.filter((item) => item !== size);
        return state;
      });
    } else {
      setSizes((sizes) => [...sizes, size]);
    }
  };
  const handleConfirm = () => {
    onConfirm(sizes);
    setShowModal(false);
  };
  const handleCancel = () => {
    setSizes(values);
    setShowModal(false);
  };
  return (
    <>
      <IonItem button onClick={() => setShowModal(true)}>
        <IonIcon slot="start" icon={resizeOutline} />
        <IonLabel color="medium">
          {values.length === 0
            ? "Chọn size"
            : values.map((item) => (
                <IonBadge style={{ marginRight: 4 }} key={item} color="darker">
                  {item}
                </IonBadge>
              ))}
        </IonLabel>
      </IonItem>
      <IonModal isOpen={showModal} onDidDismiss={handleCancel}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleCancel}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Chọn size</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleConfirm}>
                <IonIcon slot="icon-only" icon={checkmark} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {sizes.length > 0 ? (
              <IonItem button onClick={() => setSizes([])}>
                <IonLabel style={{ textAlign: "center" }}>
                  Bỏ chọn tất cả
                </IonLabel>
              </IonItem>
            ) : (
              <IonItem button onClick={() => setSizes(SIZES)}>
                <IonLabel style={{ textAlign: "center" }}>Chọn tất cả</IonLabel>
              </IonItem>
            )}

            {SIZES.map((item, index) => (
              <IonItem key={index} button onClick={() => handleClickItem(item)}>
                {isSelected(item) ? (
                  <IonIcon
                    slot="start"
                    icon={checkboxOutline}
                    color="success"
                  />
                ) : (
                  <IonIcon slot="start" icon={squareOutline} />
                )}
                <b>{item}</b>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default SizeSelectItem;
