import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  useIonModal,
} from "@ionic/react";
import { cashOutline } from "ionicons/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  addAmountToWorkshop,
  Amount,
  removeAmountFromWorkshop,
} from "../../models/workshop";
import { useSelector } from "../../store";
import { addAmount, removeAmount } from "../../store/data/workshopSlice";
import { stringFromToDate } from "../../utils/date";
import { toast } from "../../utils/toast";
import AmountModal from "../modals/AmountModal";

interface Props {
  hide?: boolean;
}

const AmountCard: React.FC<Props> = ({ hide }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);
  const workshop = useSelector((state) =>
    state.workshops.find((i) => i.id === id)
  );
  const products = useSelector((state) => state.products);
  const processes = useSelector((state) => state.processes);
  const handleSubmitAmount = (amount: Amount) => {
    if (workshop?.id)
      addAmountToWorkshop(uid, workshop.id, amount)
        .then((doc) => {
          dispatch(addAmount({ id: workshop.id!, amount }));
          dismiss();
        })
        .catch((e) => {
          toast("Có lỗi xảy ra, vui lòng thử lại!");
        });
  };
  const handleDeleteAmount = (amount: Amount, index: number) => {
    document.querySelector("ion-item-sliding")?.closeOpened();

    if (workshop?.id)
      removeAmountFromWorkshop(uid, workshop?.id, amount)
        .then((doc) => {
          dispatch(removeAmount({ id: workshop.id!, index }));
          dismiss();
        })
        .catch((e) => {
          toast("Có lỗi xảy ra, vui lòng thử lại!");
        });
  };
  const [present, dismiss] = useIonModal(AmountModal, {
    onDismiss: () => dismiss(),
    onSubmit: (amount: Amount) => handleSubmitAmount(amount),
    workshopName: workshop?.name,
    products: products,
    processes: processes,
  });
  if (hide) {
    return null;
  }
  return (
    <IonCard className="list-card">
      <IonCardContent>
        <IonList style={{ borderTop: "none" }}>
          <IonListHeader>
            <IonLabel>Giá công</IonLabel>
            <IonButton
              className="ion-margin-end"
              size="small"
              onClick={() => present()}
            >
              Thêm
            </IonButton>
          </IonListHeader>

          {workshop?.amounts.map((item, index) => (
            <IonItemSliding key={index}>
              <IonItem>
                <IonIcon slot="start" icon={cashOutline} />
                <IonLabel>
                  <b>{item.productName}</b>
                  <p>{stringFromToDate(item.fromDate, item.toDate)}</p>
                </IonLabel>
                <IonText color="dark">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.amount)}
                </IonText>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption
                  color="danger"
                  expandable
                  onClick={() => handleDeleteAmount(item, index)}
                >
                  Xóa
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default AmountCard;
