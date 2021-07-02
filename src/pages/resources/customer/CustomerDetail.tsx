import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import {
  add,
  close,
  ellipsisVertical,
  pencilOutline,
  trashOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { destroyCustomer } from "../../../models/customer";
import { useSelector } from "../../../store";
import {
  findCustomerById,
  removeCustomer,
} from "../../../store/data/customerSlice";
import { toast } from "../../../utils/toast";
import FancyContent from "../../../components/EmptyComponent";
import CustomerInfoTab from "../../../components/statistics/CustomerInfoTab";
import OrderTab from "../../../components/statistics/OrderTab";
import PricesContent from "../../../components/contents/PricesContent";

interface CustomerDetailProps {}

export const CustomerDetail: React.FC<CustomerDetailProps> = () => {
  const [presentDeleteAlert] = useIonAlert();
  const [presentActionSheet] = useIonActionSheet();
  const { uid, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useIonRouter();
  const { id } = useParams<{ id: string }>();
  const customer = useSelector((state) =>
    state.customers.find((v) => v.id === id)
  );
  const { isLoading } = useSelector((state) => state.loading);
  const [segment, setSegment] = useState("order");

  const handleDeleteCustomer = async () => {
    try {
      if (id) await destroyCustomer(uid, id);

      toast("Xóa thành công!");
      dispatch(removeCustomer(id));

      router.goBack();
    } catch (error) {
      toast(error.message);
    }
  };

  const handleActionClick = () => {
    presentActionSheet({
      buttons: [
        {
          text: "Xóa",
          icon: trashOutline,
          handler: () => {
            if (role !== "owner") {
              presentDeleteAlert({
                header: "Bạn không thể xóa",
                message: "Bạn không có quyền xóa khi không phải chủ sở hữu",
                buttons: ["OK!"],
              });
              return;
            }
            presentDeleteAlert({
              header: "Xóa khách hàng",
              message: "Bạn có chắc muốn xóa?",
              buttons: [
                "Hủy",
                {
                  text: "OK!",
                  handler: handleDeleteCustomer,
                },
              ],
              onDidDismiss: (e) => console.log("did dismiss"),
            });
          },
        },
        {
          text: "Sửa",
          icon: pencilOutline,
          handler: () => {
            router.push(router.routeInfo.pathname + "/update");
          },
        },
        { text: "Thoát", icon: close },
      ],
    });
  };

  useEffect(() => {
    if (!customer) dispatch(findCustomerById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/customers" />
          </IonButtons>
          <IonTitle>{customer?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              routerLink={router.routeInfo.pathname + "/orders/create"}
            >
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
            <IonButton onClick={handleActionClick}>
              <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar hidden={!customer}>
          <IonSegment
            value={segment}
            onIonChange={(e) => {
              setSegment(e.detail.value!);
            }}
          >
            <IonSegmentButton value="info">
              Thông tin khách hàng
            </IonSegmentButton>
            <IonSegmentButton value="order">Đơn hàng</IonSegmentButton>
            <IonSegmentButton value="prices">Đơn giá</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonLoading isOpen={isLoading} />
      <IonContent hidden={segment === "prices"}>
        <FancyContent isEmpty={!customer}>
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeLg="8">
                <CustomerInfoTab hide={segment !== "info"} />
                <OrderTab hide={segment !== "order"} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </FancyContent>
      </IonContent>
      <PricesContent hidden={segment !== "prices"} customer />
    </IonPage>
  );
};
