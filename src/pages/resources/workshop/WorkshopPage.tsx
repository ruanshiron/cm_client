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
import { Item } from "../../../components/items/Item";
import { useSelector } from "../../../store";
import { fetchAllWorkshops } from "../../../store/data/workshopSlice";

interface WorkshopPageProps {}

const WorkshopPage: React.FC<WorkshopPageProps> = () => {
  const workshops = useSelector((state) => state.workshops);
  const router = useIonRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllWorkshops());
  }, [dispatch]);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Xưởng</IonTitle>
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
            <IonTitle size="large">Xưởng</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            {workshops.map((workshop) => (
              <IonCol size="12" size-md="8" key={workshop.id}>
                <Item
                  title={workshop.name!}
                  subtitle={workshop.phonenumber!}
                  id={workshop.id}
                  baseUrl="/workshops"
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WorkshopPage;
