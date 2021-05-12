import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { add, saveOutline, shirtOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { OrderItem } from "../../../../components/items/OrderItem";
import { useSelector } from "../../../../store";
import {
  fetchAllOrdersByCustomer,
  statisticSelector,
} from "../../../../store/data/orderSlice";
import {
  findCustomerById,
  updateFromDate,
  updateToDate,
} from "../../../../store/data/customerSlice";
import { saveCustomer } from "../../../../models/customer";
import { toast } from "../../../../utils/toast";

interface OrderPageProps {}

const OrderPage: React.FC<OrderPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const uid = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const router = useIonRouter();
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

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={"/customers/" + id} />
          </IonButtons>
          <IonTitle>Đơn hàng của {customer?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={router.routeInfo.pathname + "/create"}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
            <IonButton onClick={handleSaveOrder}>
              <IonIcon slot="icon-only" icon={saveOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol size="6" sizeLg="4">
              <IonCard className="list-card">
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="stacked">
                      <b>Từ ngày</b>
                    </IonLabel>
                    <IonDatetime
                      displayFormat="YYYY-MM-DD"
                      doneText="OK!"
                      cancelText="Hủy"
                      placeholder="Quá khứ"
                      value={customer?.statistic?.from || ""}
                      onIonChange={(e) => {
                        dispatch(
                          updateFromDate({
                            id,
                            from: e.detail.value?.substring(0, 10),
                          })
                        );
                      }}
                      onIonCancel={() => {
                        dispatch(
                          updateFromDate({
                            id,
                            from: "",
                          })
                        );
                      }}
                    />
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6" sizeLg="4">
              <IonCard className="list-card">
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="stacked">
                      <b>Đến ngày</b>
                    </IonLabel>
                    <IonDatetime
                      displayFormat="YYYY-MM-DD"
                      doneText="OK!"
                      cancelText="Hủy"
                      placeholder="Hiện tại"
                      value={customer?.statistic?.to}
                      onIonChange={(e) => {
                        dispatch(
                          updateToDate({
                            id,
                            to: e.detail.value?.substring(0, 10),
                          })
                        );
                      }}
                      onIonCancel={() => {
                        dispatch(
                          updateToDate({
                            id,
                            to: "",
                          })
                        );
                      }}
                    />
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="8">
              <IonCard className="list-card">
                <IonCardContent>
                  <IonListHeader>
                    <b>
                      <u>Tổng hợp</u>
                    </b>
                  </IonListHeader>
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
            </IonCol>
            <IonCol size="12" sizeLg="8">
              {orders.map((order, index) => (
                <OrderItem key={index} order={order} />
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OrderPage;
