import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { close, create, shirtOutline, trashOutline } from "ionicons/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { destroyOrder, Order } from "../../models/order";
import { useSelector } from "../../store";
import { removeOrder } from "../../store/data/orderSlice";
import { toast } from "../../utils/toast";

export const OrderItem: React.FC<{ order: Order; readonly?: boolean }> = ({
  order,
  readonly = false,
}) => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const role = useSelector((state) => state.user.role);
  const [presentAlert] = useIonAlert();
  const [presentActions] = useIonActionSheet();
  const handleActions = () => {
    if (readonly) return;
    presentActions({
      buttons: [
        {
          icon: create,
          text: "Sửa",
          handler: () => {
            router.push(
              router.routeInfo.pathname + "/orders/" + order.id + "/update"
            );
          },
        },
        {
          icon: trashOutline,
          text: "Xóa",
          handler: handleDeleteOrder,
        },
        {
          icon: close,
          text: "thoát",
        },
      ],
    });
  };
  const handleDeleteOrder = () => {
    if (role !== "owner") {
      presentAlert({
        header: "Bạn không thể xóa",
        message: "Bạn không có quyền xóa khi không phải chủ sở hữu",
        buttons: ["OK!"],
      });
      return;
    }
    presentAlert({
      header: "Xác nhận xóa",
      message: "Bạn sẽ xóa đơn hàng này?",
      buttons: [
        "Hủy",
        {
          text: "OK!",
          handler: async () => {
            try {
              if (order.id && order.customerId) {
                await destroyOrder(uid, order.customerId, order.id);
                toast("Xóa thành công!");
                dispatch(removeOrder(order.id));
              } else {
                toast("Có lỗi xảy ra, vui lòng thử lại!");
              }
            } catch (error) {
              toast("Có lỗi xảy ra, vui lòng thử lại!");
            }
          },
        },
      ],
    });
  };
  return (
    <IonCard button className="list-card" onClick={handleActions}>
      <IonCardContent>
        <IonList style={{ border: "none" }} lines="inset">
          <IonItem>
            <IonLabel>
              <b>{order.date}</b>
            </IonLabel>
          </IonItem>
          {order.lines.map((line, index) => (
            <IonItem detail={false} key={index}>
              <IonIcon icon={shirtOutline} slot="start" />
              <IonLabel slot="start">
                {line.productName}・{line.size}
              </IonLabel>
              <IonNote slot="end">
                <p>{line.quantity}&nbsp;sp</p>
              </IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
