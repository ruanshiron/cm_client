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
import { findCustomerById } from "../../store/data/customerSlice";

import { signOut } from "../../store/user/userSlice";

interface Props {}

const AnonymousCustomerPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [presentActionSheet] = useIonActionSheet();
  const id = useSelector((state) => state.user.id);
  const customer = useSelector((state) =>
    state.customers.find((item) => item.id === state.user.id)
  );

  useEffect(() => {
    dispatch(findCustomerById(id));
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

export default AnonymousCustomerPage;
