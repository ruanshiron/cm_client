import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
  useIonActionSheet,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { add, close, createOutline, trashOutline } from "ionicons/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { database } from "../../config/firebase";
import { useSelector } from "../../store";
import { stringFromToDate } from "../../utils/date";
import FancyContent from "../EmptyComponent";
import Amount2Modal from "../modals/Amount2Modal";

interface Props {
  hidden?: boolean;
  workshop?: boolean;
}

const AmountsContent: React.FC<Props> = ({ hidden, workshop }) => {
  const [presentAction] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const { id } = useParams<{ id: string }>();
  const { uid } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string>();
  const [amounts, setAmounts] = useState<any[]>([]);
  const loadData = useCallback(() => {
    database
      .collection("users")
      .doc(uid)
      .collection("amounts")
      .where(workshop ? "workshopId" : "productId", "==", id)
      .get()
      .then((snap) => {
        setAmounts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, [workshop, id, uid]);
  const handleDismissModal = () => {
    setEditId(undefined);
    setShowModal(false);
    loadData();
  };
  const handleClickItem = (item: any) => {
    const prompt =
      item.workshopName +
      " | " +
      item.productName +
      " | " +
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(item.value);
    presentAction(
      [
        {
          icon: createOutline,
          text: "Sửa",
          handler: () => {
            setEditId(item.id);
            setShowModal(true);
          },
        },
        {
          icon: trashOutline,
          text: "Xóa",
          handler: () => {
            presentAlert({
              header: "Xóa giá bán",
              message: "Bạn có chắc chắn xóa giá bán này?",
              buttons: [
                "Hủy",
                {
                  text: "Xóa",
                  handler: (d) => {
                    database
                      .collection("users")
                      .doc(uid)
                      .collection("amounts")
                      .doc(item.id)
                      .delete()
                      .then(() => {
                        presentToast({
                          message: "Đã xóa " + prompt,
                          duration: 2000,
                        });
                        setAmounts((amounts) =>
                          amounts.filter((i) => i.id !== item.id)
                        );
                      })
                      .catch(() => {
                        presentToast({
                          message: "Có lỗi xảy ra không thể xóa " + prompt,
                          duration: 2000,
                          color: "danger",
                        });
                      });
                  },
                },
              ],
            });
          },
        },
        {
          icon: close,
          text: "Hủy",
        },
      ],
      prompt
    );
  };
  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <IonContent hidden={hidden}>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setShowModal(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      {workshop ? (
        <Amount2Modal
          isOpen={showModal}
          onDidDismiss={handleDismissModal}
          defaultWorkshopId={id}
          id={editId}
        />
      ) : (
        <Amount2Modal
          isOpen={showModal}
          onDidDismiss={handleDismissModal}
          defaultProductId={id}
          id={editId}
        />
      )}
      <FancyContent isEmpty={amounts.length === 0}>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonCard className="list-card">
                <IonCardContent>
                  <IonList style={{ border: "none" }}>
                    {amounts.map((item, index) => (
                      <IonItem
                        key={index}
                        button
                        onClick={() => handleClickItem(item)}
                      >
                        <IonLabel>
                          <b>
                            {item.productName} ({item.productCode})
                          </b>
                          <p>👩🏻‍🏭&nbsp;{item.workshopName}</p>
                        </IonLabel>
                        <IonText className="ion-text-right" color="dark">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.value)}
                          <p>{stringFromToDate(item.from, item.to)}</p>
                        </IonText>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </FancyContent>
    </IonContent>
  );
};

export default AmountsContent;
