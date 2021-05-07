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
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import { ellipsisVertical, logOutOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import { findEmployeeById } from "../../store/data/employeeSlice";

import { signOut } from "../../store/user/userSlice";

interface Props {}

const AnonymousEmployeePage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [presentActionSheet] = useIonActionSheet();
  const id = useSelector((state) => state.user.id);
  const employee = useSelector((state) =>
    state.employees.find((item) => item.id === state.user.id)
  );

  useEffect(() => {
    dispatch(findEmployeeById(id));
  }, [dispatch, id]);

  return (
    <IonPage className="list-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>
              {employee?.name} ・ {employee?.phonenumber}
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
          {employee && (
            <IonRow>
              <IonCol>
                <IonCard className="list-card">
                  <IonCardContent></IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AnonymousEmployeePage;
