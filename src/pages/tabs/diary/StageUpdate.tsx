import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { StageForm } from "../../../components/forms/StageForm";
import { useStageForm } from "../../../hooks/useStageForm";
import { useSelector } from "../../../store";

interface StageUpdateProps {}

const StageUpdate: React.FC<StageUpdateProps> = () => {
  const { id } = useParams<{ id: string }>();
  const stage = useSelector((state) => state.stages.find((i) => i.id === id));
  const form = useStageForm();

  useEffect(() => {
    if (stage) form.setFieldsValue(stage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/diary"></IonBackButton>
          </IonButtons>
          <IonTitle>Sửa</IonTitle>
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
              <StageForm form={form} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default StageUpdate;
