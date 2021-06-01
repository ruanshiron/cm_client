import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonLoading,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  calendarOutline,
  cashOutline,
  close,
  textOutline,
} from "ionicons/icons";
import React from "react";
import { usePaymentForm } from "../../hooks/usePaymentForm";
import { currencyString } from "../../utils/data";
import { monthNames } from "../statistics/Datetime";

interface Props {
  form: ReturnType<typeof usePaymentForm>;
}

const PaymentModal: React.FC<Props> = ({ form }) => {
  return (
    <IonModal onWillPresent={() => {}} isOpen={form.showModal}>
      <IonLoading isOpen={form.loading} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => form.setShowModal(false)}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>Thanh toán</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => form.submit()}>Lưu</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonIcon icon={textOutline} slot="start" />
            <IonInput
              placeholder="Nhập ghi chú"
              value={form.note}
              onIonChange={(e) => form.setNote(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonIcon icon={calendarOutline} slot="start" />
            <IonDatetime
              monthNames={monthNames}
              displayFormat="DD MMMM, YYYY"
              doneText="OK!"
              cancelText="Hủy"
              placeholder="Chọn ngày"
              value={form.date}
              onIonChange={(e) => form.setDate(e.detail.value!)}
            />
          </IonItem>
          <IonItem lines="none">
            <IonText slot="end">
              {currencyString(parseInt(form.amount))}
            </IonText>
          </IonItem>
          <IonItem>
            <IonIcon icon={cashOutline} slot="start" />
            <IonInput
              type="number"
              placeholder="Nhập số tiền"
              value={form.amount}
              onIonChange={(e) => form.setAmount(e.detail.value!)}
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default PaymentModal;
