import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import { shirtOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { saveCustomer } from "../../models/customer";
import { useSelector } from "../../store";
import {
  findCustomerById,
  updateFromDate,
  updateToDate,
} from "../../store/data/customerSlice";
import {
  fetchAllOrdersByCustomer,
  statisticSelector,
} from "../../store/data/orderSlice";
import { toast } from "../../utils/toast";
import { OrderItem } from "../items/OrderItem";
import Datetime from "./Datetime";

interface Props {
  hide?: boolean;
}

const OrderTab: React.FC<Props> = ({ hide }) => {
  const { id } = useParams<{ id: string }>();
  const uid = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const customer = useSelector((state) =>
    state.customers.find((item) => item.id === id)
  );
  const { statistic, orders } = useSelector((state) =>
    statisticSelector(state, id)
  );
  useEffect(() => {
    if (!customer) dispatch(findCustomerById(id));
    if (orders.length <= 0) dispatch(fetchAllOrdersByCustomer(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const handleSaveOrder = async () => {
    if (customer) {
      try {
        await saveCustomer(uid, customer);
        toast("Lưu thành công.");
      } catch (error) {
        toast("Có lỗi xảy ra không thể lưu!");
      }
    }
  };

  if (hide) return null;

  return (
    <>
      <Datetime
        fromValue={customer?.statistic?.from}
        toValue={customer?.statistic?.to}
        onChangeFrom={(e) => {
          dispatch(
            updateFromDate({
              id,
              from: e.detail.value || "",
            })
          );
        }}
        onChangeTo={(e) => {
          dispatch(
            updateToDate({
              id,
              to: e.detail.value || "",
            })
          );
        }}
        onCancelFrom={() => {}}
        onCancelTo={() => {}}
        onReset={() => {
          dispatch(
            updateToDate({
              id,
              to: "",
            })
          );
          dispatch(
            updateFromDate({
              id,
              from: "",
            })
          );
        }}
        onSave={handleSaveOrder}
      />

      <IonCard className="list-card">
        <IonCardContent>
          <IonItem>
            <b>
              <u>Tổng hợp</u>
            </b>
            <IonNote slot="end">
              {orders.length <= 0 && " (Bạn chưa tạo đơn nào)"}
            </IonNote>
          </IonItem>
          <IonList lines="full">
            {statistic.map((item, index) => (
              <IonItem key={index}>
                <IonIcon icon={shirtOutline} slot="start" />
                <IonLabel>
                  <b>{item.productName}</b> đã bán&nbsp;
                  <b>{item.quantity}</b> sp
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </>
  );
};

export default OrderTab;
