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
  IonListHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import { ellipsisVertical, logOutOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { stringFromToDate } from "../../utils/date";
import { useSelector } from "../../store";
import { findWorkshopById } from "../../store/data/workshopSlice";

import { signOut } from "../../store/user/userSlice";

interface Props {}

const AnonymousWorkshopPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [presentActionSheet] = useIonActionSheet();
  const id = useSelector((state) => state.user.id);
  const workshop = useSelector((state) =>
    state.workshops.find((item) => item.id === state.user.id)
  );

  useEffect(() => {
    dispatch(findWorkshopById(id));
  }, [dispatch, id]);

  return (
    <IonPage className="list-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>
              {workshop?.name} ・ {workshop?.phonenumber}
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
          {workshop && (
            <IonRow>
              <IonCol>
                <IonCard className="list-card">
                  <IonCardContent>
                    <IonListHeader>
                      <IonLabel>
                        {workshop.amounts.length <= 0 ? (
                          <p>
                            <b>Bảng giá công</b> (Chưa có định giá nào)
                          </p>
                        ) : (
                          <b>Bảng giá công</b>
                        )}
                      </IonLabel>
                    </IonListHeader>
                    {workshop.amounts.map((item, index) => (
                      <IonItem>
                        <IonLabel>
                          <p>
                            <b>{item.productName}</b>
                          </p>
                          <p>{stringFromToDate(item.fromDate, item.toDate)}</p>
                        </IonLabel>
                        <IonText color="tertiary">
                          {item.amount + " VND"}
                        </IonText>
                      </IonItem>
                    ))}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AnonymousWorkshopPage;
