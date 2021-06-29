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
import PriceModal from "../modals/PriceModal";

interface Props {
  hidden?: boolean;
  customer?: boolean;
}

const PricesContent: React.FC<Props> = ({ hidden, customer }) => {
  const [presentAction] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const { id } = useParams<{ id: string }>();
  const { uid } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string>();
  const [prices, setPrices] = useState<any[]>([]);
  const loadData = useCallback(() => {
    database
      .collection("users")
      .doc(uid)
      .collection("prices")
      .where(customer ? "customerId" : "productId", "==", id)
      .get()
      .then((snap) => {
        setPrices(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, [customer, id, uid]);
  const handleDismissModal = () => {
    setEditId(undefined);
    setShowModal(false);
    loadData();
  };
  const handleClickItem = (item: any) => {
    const prompt =
      item.customerName +
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
                      .collection("prices")
                      .doc(item.id)
                      .delete()
                      .then(() => {
                        presentToast({
                          message: "Đã xóa " + prompt,
                          duration: 2000,
                        });
                        setPrices((prices) =>
                          prices.filter((i) => i.id !== item.id)
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
      {customer ? (
        <PriceModal
          isOpen={showModal}
          onDidDismiss={handleDismissModal}
          defaultCustomerId={id}
          id={editId}
        />
      ) : (
        <PriceModal
          isOpen={showModal}
          onDidDismiss={handleDismissModal}
          defaultProductId={id}
          id={editId}
        />
      )}
      <FancyContent isEmpty={prices.length === 0}>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonCard className="list-card">
                <IonCardContent>
                  <IonList style={{ border: "none" }}>
                    {prices.map((item, index) => (
                      <IonItem
                        key={index}
                        button
                        onClick={() => handleClickItem(item)}
                      >
                        <IonLabel>
                          <b>
                            {item.productName} ({item.productCode})
                          </b>
                          <p>👩🏻‍🦳&nbsp;{item.customerName}</p>
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

export default PricesContent;
