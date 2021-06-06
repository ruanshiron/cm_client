import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRow,
  IonText,
} from "@ionic/react";
import { checkmark, trashOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { color } from "../components/items/StageItem";
import { getAllPendingStages, PendingStage } from "../models/pendingStage";
import { useSelector } from "../store";
import { usePendingStageForm } from "../hooks/usePendingStageForm";
import PendingStageModal from "./modals/PendingStageModal";
import { toast } from "../utils/toast";
import { format } from "date-fns";

const TYPE: { [key: string]: string } = {
  added: "➕thêm",
  removed: "🗑xóa",
  modified: "📝sửa",
};

const PendingStageList = () => {
  const { uid, role } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [pendingStages, setPendingStages] = useState<PendingStage[]>([]);
  const form = usePendingStageForm();
  const handleItemClicked = (stage: PendingStage) => {
    form.reset(stage);
    setShowModal(true);
  };
  const shakeIt = (id: string) => {
    document.getElementById(id)?.classList.add("shake");
    setTimeout(
      () => document.getElementById(id)?.classList.remove("shake"),
      200
    );
  };

  const handleSubmitItem = () => {
    form
      .update()
      .then(() => setShowModal(false))
      .catch((error) => toast(error.message));
  };

  const handleResolveItem = (item: PendingStage) => {
    form
      .resolve(item)
      .then(() => {
        toast("Đã lưu vào nhật ký theo đề xuất!");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const handleRejectItem = (item: PendingStage) => {
    form
      .reject(item)
      .then(() => {
        toast("Đã xóa khỏi hàng đợi");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  useEffect(() => {
    const unsubcribe = getAllPendingStages(uid).onSnapshot((snap) => {
      snap.docChanges().forEach((change) => {
        if (change.type === "added") {
          if (!pendingStages.find((item) => item.id === change.doc.id)) {
            setPendingStages((pendingStages) => [
              ...pendingStages,
              { id: change.doc.id, ...change.doc.data() } as PendingStage,
            ]);
          }
        }

        if (change.type === "modified") {
          setPendingStages((pendingStages) =>
            pendingStages.map((item) =>
              item.id === change.doc.id
                ? ({ id: change.doc.id, ...change.doc.data() } as PendingStage)
                : item
            )
          );
          shakeIt(change.doc.id);
          if (role === "owner")
            toast(
              `${change.doc.data()?.modifier || "Ai đó"} đã sửa một sự kiện!`
            );
        }

        if (change.type === "removed") {
          setPendingStages((pendingStages) =>
            pendingStages.filter((item) => item.id !== change.doc.id)
          );
        }
      });
    });

    return () => unsubcribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PendingStageModal
        disableMore
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        onSubmit={handleSubmitItem}
        form={form}
      />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol style={{ paddingBottom: 100 }} size="12" size-md="8">
              {pendingStages.map((item, index) => (
                <IonList
                  lines="none"
                  key={index}
                  id={item.id}
                  className="border-full ion-margin-top"
                >
                  <IonListHeader>
                    {`${format(new Date(item.data.date), "dd/MM/yyyy")}, 
                    ${item.modifier || "Ai đó"} đã đề xuất ${TYPE[item.type]}`}
                  </IonListHeader>
                  <IonItem button onClick={() => handleItemClicked(item)}>
                    <IonLabel className={color(item.data.processStatus)}>
                      <b>{item.data.workshopName}</b>
                      <p>{item.data.productName}</p>
                    </IonLabel>
                    <IonNote
                      className="ion-text-right"
                      slot="end"
                      color={color(item.data.processStatus)}
                    >
                      <IonText>{item.data.processLabel}</IonText>
                      <br />
                      <IonText style={{ fontSize: 18, fontWeight: 700 }}>
                        {item.data.quantity}
                      </IonText>
                    </IonNote>
                  </IonItem>
                  {role === "owner" && (
                    <IonRow>
                      <IonCol>
                        <IonButton
                          className="ion-no-margin"
                          expand="full"
                          fill="clear"
                          color="success"
                          onClick={() => handleResolveItem(item)}
                        >
                          <IonIcon slot="start" icon={checkmark} />
                        </IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton
                          color="danger"
                          className="ion-no-margin"
                          expand="full"
                          fill="clear"
                          onClick={() => handleRejectItem(item)}
                        >
                          <IonIcon slot="start" icon={trashOutline} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  )}
                </IonList>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default PendingStageList;
