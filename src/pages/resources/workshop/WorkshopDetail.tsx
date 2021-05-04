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
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import {
  barChartOutline,
  close,
  copyOutline,
  ellipsisVertical,
  pencilOutline,
  personOutline,
  phonePortraitOutline,
  qrCodeOutline,
  refresh,
  trashOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";
import { WorkshopModal } from "../../../components/modals/WorkshopModal";
import { useSelector } from "../../../store";
import { v4 as uuidv4 } from "uuid";
import { destroyWorkshop, saveWorkshop } from "../../../models/workshop";
import { useDispatch } from "react-redux";
import {
  statisticsForWorkshop,
  statisticsForWorkshopAndGroupByProduct,
  removeWorkshop,
  updateWorkshopCode,
} from "../../../store/data/workshopSlice";
import { toast } from "../../../utils/toast";
import QRCode from "qrcode.react";

interface WorkshopDetailProps {}

export const WorkshopDetail: React.FC<WorkshopDetailProps> = () => {
  const [presentDeleteAlert] = useIonAlert();
  const [presentActionSheet] = useIonActionSheet();
  const [showReportModal, setShowReportModal] = useState(false);
  const router = useIonRouter();
  const uid = useSelector((state) => state.user.uid);
  const { id } = useParams<{ id: string }>();
  const workshop = useSelector((state) =>
    state.workshops.find((v) => v.id === id)
  );

  const statistics = useSelector((state) =>
    statisticsForWorkshopAndGroupByProduct(statisticsForWorkshop(state, id))
  );

  const dispatch = useDispatch();

  const handleUpdateCode = async () => {
    const code = uuidv4();
    try {
      await saveWorkshop(uid, {
        ...workshop,
        code,
      });
      toast("Lưu thành công.");
      dispatch(updateWorkshopCode({ id, code }));
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handleDeleteWorkshop = async () => {
    try {
      if (id) await destroyWorkshop(uid, id);

      toast("Xóa thành công!");
      dispatch(removeWorkshop(id));

      router.goBack();
    } catch (error) {
      toast("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <>
      <IonPage className="list-page">
        <WorkshopModal
          showModal={showReportModal}
          onDismiss={() => setShowReportModal(false)}
        />
        <IonContent>
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/workshops" />
              </IonButtons>
              <IonTitle>Xưởng</IonTitle>
              <IonButtons slot="end">
                <IonButton routerLink={router.routeInfo.pathname + "/update"}>
                  <IonIcon slot="icon-only" icon={pencilOutline}></IonIcon>
                </IonButton>
                <IonButton onClick={() => setShowReportModal(true)}>
                  <IonIcon slot="icon-only" icon={barChartOutline}></IonIcon>
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
                                  handler: handleDeleteWorkshop,
                                },
                              ],
                              onDidDismiss: (e) => console.log("did dismiss"),
                            });
                          },
                        },
                        {
                          text: "Xem thống kê chi tiết",
                          icon: barChartOutline,
                          handler: () => {
                            setShowReportModal(true);
                          },
                        },
                        {
                          text: "Sửa",
                          icon: pencilOutline,
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
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="8" offsetMd="2">
                <IonCard className="list-card">
                  <IonCardContent>
                    <IonList lines="full" style={{ border: "none" }}>
                      <IonItem>
                        <IonIcon icon={personOutline} slot="start"></IonIcon>
                        <IonLabel>{workshop?.name}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon
                          icon={phonePortraitOutline}
                          slot="start"
                        ></IonIcon>
                        <IonLabel>{workshop?.phonenumber}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={qrCodeOutline} slot="start"></IonIcon>
                        <IonInput
                          value={workshop?.code || "Hãy tạo code mới"}
                          onIonChange={() => {}}
                        />
                        <IonButtons slot="end">
                          <IonButton onClick={handleUpdateCode}>
                            <IonIcon slot="icon-only" icon={refresh}></IonIcon>
                          </IonButton>
                          <IonButton>
                            <IonIcon
                              slot="icon-only"
                              icon={copyOutline}
                            ></IonIcon>
                          </IonButton>
                        </IonButtons>
                      </IonItem>
                      {workshop?.code && (
                        <IonItem>
                          <QRCode
                            style={{ margin: "auto" }}
                            id="qrcode"
                            value={workshop?.code}
                            size={290}
                            level={"H"}
                            includeMargin={true}
                          />
                        </IonItem>
                      )}
                    </IonList>
                  </IonCardContent>
                </IonCard>

                <IonCard className="list-card">
                  <IonCardContent>
                    <IonList lines="none" style={{ border: "none" }}>
                      <IonListHeader>
                        <IonLabel>Thống kê nhanh</IonLabel>
                      </IonListHeader>
                      {statistics.map((item, index) => (
                        <IonItemGroup key={index}>
                          <IonItemDivider style={{ border: "none" }}>
                            <IonLabel>{item.product}</IonLabel>
                          </IonItemDivider>
                          {item.statistics.map((childItem, childIndex) => (
                            <IonItem key={childIndex}>
                              <IonLabel>{childItem.process}</IonLabel>
                              <IonNote slot="end">
                                <p>{childItem.value}</p>
                              </IonNote>
                            </IonItem>
                          ))}
                        </IonItemGroup>
                      ))}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};
