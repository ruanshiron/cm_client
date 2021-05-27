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
import { close, shirtOutline } from "ionicons/icons";
import React, { useState } from "react";
import { Product } from "../../models/product";
import { useSelector } from "../../store";

interface Props {
  value?: Product;
  onChange: (value: Product) => void;
}

const ProductSelectItem: React.FC<Props> = ({ value, onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const products = useSelector((state) => state.products);
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
        <IonIcon slot="start" icon={shirtOutline} />
        {value ? (
          <IonLabel>
            {value.name} ({value.code})
          </IonLabel>
        ) : (
          <IonLabel color="medium">Chọn sản phẩm</IonLabel>
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
            <IonTitle>Chọn sản phẩm</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {products.map((item, index) => (
              <IonItem key={index} button onClick={() => handleClickItem(item)}>
                <IonText slot="start">
                  <b>{item.name}</b>
                </IonText>
                <IonText slot="end">&nbsp;({item.code})</IonText>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ProductSelectItem;
