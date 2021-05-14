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
  IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EmployeePagePopover } from "../../../components/popovers/EmployeePagePopover";
import { useSelector } from "../../../store";
import { Item } from "../../../components/items/Item";
import { fetchAllEmployees } from "../../../store/data/employeeSlice";

interface EmployeePageProps {}

const EmployeePage: React.FC<EmployeePageProps> = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<any>();

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

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
            <IonButton onClick={presentPopover}>
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
      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <EmployeePagePopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default EmployeePage;
