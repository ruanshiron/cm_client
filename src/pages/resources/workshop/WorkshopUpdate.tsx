import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import WorkshopForm from "../../../components/forms/WorkshopForm";
import AmountModal from "../../../components/modals/AmountModal";
import { useWorkshopForm } from "../../../hooks/useWorkshopForm";
import {
  addAmountToWorkshop,
  removeAmountFromWorkshop,
  Amount,
} from "../../../models/workshop";
import { useSelector } from "../../../store";

interface WorkshopUpdateProps {}

const WorkshopUpdate: React.FC<WorkshopUpdateProps> = () => {
  const { id } = useParams<{ id: string }>();
  const workshop = useSelector((state) =>
    state.workshops.find((i) => i.id === id)
  );
  const products = useSelector((state) => state.products);
  const form = useWorkshopForm(workshop);
  const handleSubmitAmount = (amount: Amount) => {
    if (workshop?.id)
      addAmountToWorkshop(workshop?.id, amount)
        .then((doc) => console.log(doc))
        .catch((e) => console.log(e));
  };
  const handleDeleteAmount = (amount: Amount) => {
    if (workshop?.id)
      removeAmountFromWorkshop(workshop?.id, amount)
        .then((doc) => console.log(doc))
        .catch((e) => console.log(e));
  };
  const [present, dismiss] = useIonModal(AmountModal, {
    onDismiss: () => dismiss(),
    onSubmit: (amount: Amount) => handleSubmitAmount(amount),
    workshopName: workshop?.name,
    products: products,
  });
  const stringFromToDate = (from?: string, to?: string) => {
    return (
      (from?.substring(0, 10) || "trước") +
      " ~ " +
      (to?.substring(0, 10) || "nay")
    );
  };
  useEffect(() => {
    if (workshop) form.setFieldsValue(workshop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workshop]);
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/workshops"></IonBackButton>
          </IonButtons>
          <IonTitle>Thêm xưởng may</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={form.submit}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              <WorkshopForm form={form} />
              <IonCard className="list-card">
                <IonCardContent>
                  <IonList style={{ borderTop: "none" }}>
                    <IonListHeader>
                      <IonLabel>Giá công</IonLabel>
                      <IonButton
                        className="ion-margin-end"
                        size="small"
                        onClick={() => present()}
                      >
                        Thêm
                      </IonButton>
                    </IonListHeader>

                    {workshop?.amounts.map((item, index) => (
                      <IonItemSliding key={index}>
                        <IonItem>
                          <IonLabel>
                            <p>
                              <b>{item.productName}</b>
                            </p>
                            <p>
                              {stringFromToDate(item.fromDate, item.toDate)}
                            </p>
                          </IonLabel>
                          <IonText color="tertiary">
                            {item.amount + " VND"}
                          </IonText>
                        </IonItem>
                        <IonItemOptions side="end">
                          <IonItemOption
                            color="danger"
                            expandable
                            onClick={() => handleDeleteAmount(item)}
                          >
                            Xóa
                          </IonItemOption>
                        </IonItemOptions>
                      </IonItemSliding>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WorkshopUpdate;
