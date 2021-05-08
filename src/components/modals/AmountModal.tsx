import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  calendarClearOutline,
  calendarNumberOutline,
  closeOutline,
  pricetagOutline,
  shirtOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { Product } from "../../models/product";
import { Amount } from "../../models/workshop";
import { toast } from "../../utils/toast";

interface Props {
  onDismiss: () => void;
  onSubmit: (amount: Amount) => void;
  workshopName: string;
  products: Product[];
  amount: number;
  fromDate?: string;
  toDate?: string;
}

const AmountModal: React.FC<Props> = ({
  onDismiss,
  onSubmit,
  workshopName,
  products,
  fromDate: propFromDate,
  toDate: propToDate,
}) => {
  const [productId, setProductId] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [fromDate, setFromDate] = useState<string | undefined>(propFromDate);
  const [toDate, setToDate] = useState<string | undefined>(propToDate);
  const handleSubmit = () => {
    if (productId && amount) {
      onSubmit({
        productId,
        productName: products.find((i) => i.id === productId)?.name || "",
        amount: parseInt(amount, 0),
        fromDate,
        toDate,
      });
    } else {
      toast("Hãy điền sản phẩm và giá công");
    }
  };
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Thêm giá công sản phẩm</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => handleSubmit()}>Lưu lại</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>Xưởng:&nbsp;<b>{workshopName}</b></IonListHeader>
          <IonItem>
            <IonIcon icon={shirtOutline} slot="start" />
            <IonLabel>Sản phẩm</IonLabel>
            <IonSelect
              value={productId}
              onIonChange={(e) => setProductId(e.detail.value!)}
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
            >
              {products.map((item, index) => (
                <IonSelectOption key={index} value={item.id}>
                  {item.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon icon={pricetagOutline} slot="start" />
            <IonLabel position="fixed">Giá</IonLabel>
            <IonInput
              value={amount}
              onIonChange={(e) => setAmount(e.detail.value!)}
              type="number"
              style={{ textAlign: "right" }}
            />
          </IonItem>
          <IonListHeader>Thời gian</IonListHeader>
          <IonItem>
            <IonIcon
              icon={calendarClearOutline}
              slot="start"
              onClick={() => setFromDate(undefined)}
            />
            <IonLabel>Từ ngày</IonLabel>
            <IonDatetime
              displayFormat="YYYY-MM-DD"
              doneText="OK!"
              cancelText="Hủy"
              value={fromDate}
              onIonChange={(e) => setFromDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={calendarNumberOutline}
              slot="start"
              onClick={() => setToDate(undefined)}
            />
            <IonLabel>Đến ngày</IonLabel>
            <IonDatetime
              displayFormat="YYYY-MM-DD"
              doneText="OK!"
              cancelText="Hủy"
              value={toDate}
              onIonChange={(e) => setToDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
        </IonList>
      </IonContent>
    </>
  );
};

export default AmountModal;
