import {
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  useIonActionSheet,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../store";
import PaymentModal from "../modals/PaymentModal";
import { useDispatch } from "react-redux";
import {
  fetchAllPaymentsByWorkshop,
  removePayment,
} from "../../store/data/paymentSlice";
import { usePaymentForm } from "../../hooks/usePaymentForm";
import { Payment } from "../../models/payment";
import { close, createOutline, trashOutline } from "ionicons/icons";
import { stringFromToDate } from "../../utils/date";

interface Props {
  hide?: boolean;
}

const WorkshopPaymentTab: React.FC<Props> = ({ hide }) => {
  const dispatch = useDispatch();
  const [present] = useIonActionSheet();
  const { id } = useParams<{ id: string }>();
  const workshop = useSelector((state) =>
    state.workshops.find((v) => v.id === id)
  );
  const form = usePaymentForm();
  const payments = useSelector((state) => state.payments[id] || []);
  const handleClickItem = (payment: Payment) => {
    present({
      buttons: [
        {
          icon: trashOutline,
          text: "Xóa thanh toán",
          handler: () => {
            dispatch(removePayment({ workshopId: id, paymentId: payment.id! }));
          },
        },
        {
          icon: createOutline,
          text: "Sửa thanh toán",
          handler: () => {
            form.preset(payment);
            form.setShowModal(true);
          },
        },
        {
          icon: close,
          text: "Hủy",
        },
      ],
    });
  };
  const handleAdd = () => {
    form.preset();
    form.setShowModal(true);
  };
  useEffect(() => {
    dispatch(
      fetchAllPaymentsByWorkshop({
        workshopId: id,
        from: workshop?.statistic?.from,
        to: workshop?.statistic?.to,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workshop]);
  if (hide) return null;
  return (
    <>
      <PaymentModal form={form} />
      <IonCard className="list-card">
        <IonCardContent>
          <IonList style={{ border: "none" }}>
            <IonListHeader>
              <IonLabel>
                {stringFromToDate(
                  workshop?.statistic?.from,
                  workshop?.statistic?.to
                )}
              </IonLabel>
              <IonButton onClick={handleAdd}>Thêm</IonButton>
            </IonListHeader>
            {payments.map((item, index) => (
              <IonItem button onClick={() => handleClickItem(item)} key={index}>
                <IonLabel className="ion-text-wrap" color="dark">
                  <p>{item.note}</p>
                  <p>{item.date}</p>
                </IonLabel>
                <IonText slot="end">
                  <b>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.amount)}
                  </b>
                </IonText>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default WorkshopPaymentTab;
