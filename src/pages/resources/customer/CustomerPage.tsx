import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CustomerItem } from "../../../components/items/CustomerItem";
import { useSelector } from "../../../store";
import { fetchAllCustomers } from "../../../store/data/customerSlice";

interface CustomerPageProps {}

const CustomerPage: React.FC<CustomerPageProps> = () => {
  const dispatch = useDispatch();
  const router = useIonRouter();
  const customers = useSelector((state) => state.customers);
  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Khách hàng</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={router.routeInfo.pathname + "/create"}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Khách hàng</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            {customers.map((customer) => (
              <IonCol size="12" size-lg="8" key={customer.id}>
                <CustomerItem data={customer} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CustomerPage;
