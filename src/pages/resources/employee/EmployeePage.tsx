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
  useIonActionSheet,
  useIonRouter,
} from "@ionic/react";
import {
  close,
  create,
  ellipsisHorizontal,
  ellipsisVertical,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store";
import { Item } from "../../../components/items/Item";
import { fetchAllEmployees } from "../../../store/data/employeeSlice";

interface EmployeePageProps {}

const EmployeePage: React.FC<EmployeePageProps> = () => {
  const [presentActionSheet] = useIonActionSheet();
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const router = useIonRouter();

  function handleActionSheet() {
    presentActionSheet({
      buttons: [
        {
          icon: create,
          text: "Thêm nhân viên",
          handler: () => {
            router.push(router.routeInfo.pathname + "/create");
          },
        },
        {
          icon: close,
          text: "Thoát",
        },
      ],
    });
  }

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Công nhân</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleActionSheet}>
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Công nhân</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            {employees.map((employee) => (
              <IonCol size="12" size-lg="8" key={employee.id}>
                <Item
                  title={employee.name!}
                  subtitle={employee.phonenumber!}
                  id={employee.id}
                  baseUrl="/employees"
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EmployeePage;
