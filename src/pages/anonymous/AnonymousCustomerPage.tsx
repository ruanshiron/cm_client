import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import {
  calendarClearOutline,
  calendarNumberOutline,
  ellipsisVertical,
  logOutOutline,
  shirtOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrderItem } from "../../components/items/OrderItem";
import { useSelector } from "../../store";
import { findCustomerById } from "../../store/data/customerSlice";
import { fetchAllOrdersByCustomer, statisticSelector } from "../../store/data/orderSlice";

import { signOut } from "../../store/user/userSlice";
import { formatStringDate } from "../../utils/date";

interface Props {}

const AnonymousCustomerPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [presentActionSheet] = useIonActionSheet();
  const id = useSelector((state) => state.user.id);
  const customer = useSelector((state) =>
    state.customers.find((item) => item.id === state.user.id)
  );
  const { statistic, orders } = useSelector((state) =>
    statisticSelector(state, id)
  );
  useEffect(() => {
    dispatch(findCustomerById(id));
    dispatch(fetchAllOrdersByCustomer(id));
  }, [dispatch, id]);

  return (
    <IonPage className="list-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>
              {customer?.name} ・ {customer?.phonenumber}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() =>
                  presentActionSheet({
                    buttons: [
                      {
                        text: "Đăng xuất",
                        icon: logOutOutline,
                        handler: () => {
                          dispatch(signOut());
                        },
                      },
                    ],
                  })
                }
              >
                <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          {customer && (
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeLg="8">
                <IonCard className="list-card">
                  <IonCardContent>
                    <IonList style={{ border: "none " }} lines="full">
                      <IonItem>
                        <IonIcon slot="start" icon={calendarClearOutline} />
                        <IonLabel>
                          <b>{formatStringDate(customer?.statistic?.from)}</b>
                        </IonLabel>
                        <IonNote slot="end">Từ ngày</IonNote>
                      </IonItem>
                      <IonItem>
                        <IonIcon slot="start" icon={calendarNumberOutline} />
                        <IonLabel>
                          <b>{formatStringDate(customer?.statistic?.to)}</b>
                        </IonLabel>
                        <IonNote slot="end">Đến ngày</IonNote>
                      </IonItem>
                    </IonList>
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
                  <OrderItem readonly key={index} order={order} />
                ))}
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AnonymousCustomerPage;
