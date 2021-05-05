import {
  IonBackButton,
  IonBadge,
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
  IonList,
  IonLoading,
  IonNote,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  accessibilityOutline,
  calendarNumberOutline,
  close,
  createOutline,
  cubeOutline,
  documentTextOutline,
  ellipsisVertical,
  help,
  peopleCircleOutline,
  shirtOutline,
  trashOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { destroyStage } from "../../../models/stage";
import { useSelector } from "../../../store";
import { findStageById, removeStage } from "../../../store/data/stageSlice";
import { toast } from "../../../utils/toast";

interface StageDetailProps {}

const StageDetail: React.FC<StageDetailProps> = () => {
  const [presentDeleteAlert] = useIonAlert();
  const [presentActionSheet] = useIonActionSheet();
  const dispatch = useDispatch();
  const router = useIonRouter();
  const { id } = useParams<{ id: string }>();
  const uid = useSelector((state) => state.user.uid);
  const stage = useSelector((state) =>
    state.stages.find((item) => item.id === id)
  );
  const loading = useSelector((state) => state.loading.isLoading);
  const handleDeleteStage = async () => {
    try {
      if (id) await destroyStage(uid, id);

      toast("Xóa thành công!");
      dispatch(removeStage(id));

      router.goBack();
    } catch (error) {
      toast("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  useEffect(() => {
    if (!stage) dispatch(findStageById(id));
  }, [dispatch, id, stage]);
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/diary"></IonBackButton>
          </IonButtons>
          <IonTitle>Chi tiết</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={router.routeInfo.pathname + "/update"}>
              <IonIcon slot="icon-only" icon={createOutline} title="sửa" />
            </IonButton>
            <IonButton
              onClick={() =>
                presentActionSheet({
                  buttons: [
                    {
                      text: "Xóa",
                      icon: trashOutline,
                      handler: () => {
                        presentDeleteAlert({
                          header: "Xóa sản phẩm",
                          message: "Bạn có chắc muốn xóa?",
                          buttons: [
                            "Hủy",
                            {
                              text: "OK!",
                              handler: handleDeleteStage,
                            },
                          ],
                          onDidDismiss: (e) => console.log("did dismiss"),
                        });
                      },
                    },
                    {
                      text: "Sửa",
                      icon: createOutline,
                      handler: () => {
                        router.push(router.routeInfo.pathname + "/update");
                      },
                    },
                    { text: "Thoát", icon: close },
                  ],
                })
              }
            >
              <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              <IonLoading isOpen={!!(loading && !stage)} />
              <IonCard className="list-card">
                <IonCardContent>
                  {stage && (
                    <IonList
                      lines="full"
                      className="ion-no-padding"
                      style={{ border: "none" }}
                    >
                      <IonItem>
                        <IonIcon icon={calendarNumberOutline} slot="start" />
                        <IonLabel>
                          <b>
                            {format(
                              new Date(stage.date),
                              "EEEE, dd MMMM, yyyy",
                              { locale: vi }
                            )}
                          </b>
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={peopleCircleOutline} slot="start" />
                        <IonLabel>
                          <b>Xưởng:</b> {stage.workshopName}
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={help} slot="start" />
                        <IonLabel>
                          <IonBadge>{stage.processLabel}</IonBadge>
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={cubeOutline} slot="start" />
                        <IonLabel>
                          <b>{stage.quantity}</b>
                        </IonLabel>
                        <IonNote slot="end">số lượng</IonNote>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={shirtOutline} slot="start" />
                        <IonLabel>
                          <b>{stage.productName}</b>
                        </IonLabel>
                        <IonNote slot="end">sản phẩm</IonNote>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={accessibilityOutline} slot="start" />
                        <IonLabel>
                          <b>{stage.productSize}</b>
                        </IonLabel>
                        <IonNote slot="end">kích cỡ</IonNote>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={documentTextOutline} slot="start" />
                        <IonLabel position="stacked">
                          <b>Ghi chú</b>
                        </IonLabel>
                        <IonTextarea
                          readonly
                          value="heek"
                          unselectable="off"
                        ></IonTextarea>
                      </IonItem>
                    </IonList>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default StageDetail;