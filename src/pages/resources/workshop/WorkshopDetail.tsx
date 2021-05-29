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
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import {
  barChartOutline,
  barcodeOutline,
  close,
  earthOutline,
  ellipsisVertical,
  pencilOutline,
  personOutline,
  phonePortraitOutline,
  qrCodeOutline,
  refresh,
  trashOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../../store";
import { destroyWorkshop } from "../../../models/workshop";
import { useDispatch } from "react-redux";
import {
  removeWorkshop,
  findWorkshopById,
} from "../../../store/data/workshopSlice";
import { toast } from "../../../utils/toast";
import QRCode from "qrcode.react";
import copy from "copy-to-clipboard";
import { fetchAllProcesses } from "../../../store/data/processSlice";
import FancyContent from "../../../components/EmptyComponent";
import AmountCard from "../../../components/statistics/AmountCard";
import WorkshopInstantSummary from "../../../components/statistics/WorkshopInstantSummary";

interface WorkshopDetailProps {}

export const WorkshopDetail: React.FC<WorkshopDetailProps> = () => {
  const [presentDeleteAlert] = useIonAlert();
  const [presentActionSheet] = useIonActionSheet();
  const [segment, setSegment] =
    useState<"info" | "statistic" | "amount">("statistic");
  const loading = useSelector((state) => state.loading.isLoading);
  const router = useIonRouter();
  const dispatch = useDispatch();
  const { uid, role } = useSelector((state) => state.user);
  const { id } = useParams<{ id: string }>();
  const workshop = useSelector((state) =>
    state.workshops.find((v) => v.id === id)
  );
  const processes = useSelector((state) => state.processes);
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
  const handleCopy = () => {
    presentActionSheet({
      buttons: [
        {
          icon: earthOutline,
          text: "Sao chép liên kết",
          handler: () => {
            if (workshop?.code) {
              copy(window.location.hostname + "/qr/" + workshop.code);
            }
            toast(
              workshop?.code ? "Sao chép thành công!" : "Hãy tạo mã trước!"
            );
          },
        },
        {
          icon: barcodeOutline,
          text: "Chỉ sao chép mã",
          handler: () => {
            if (workshop?.code) {
              copy(workshop.code);
            }
            toast(
              workshop?.code ? "Sao chép thành công!" : "Hãy tạo mã trước!"
            );
          },
        },
        {
          icon: close,
          text: "Hủy",
        },
      ],
    });
  };
  useEffect(() => {
    if (!workshop) dispatch(findWorkshopById(id));
  }, [dispatch, id, workshop]);
  useEffect(() => {
    if (processes.length <= 0) dispatch(fetchAllProcesses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/workshops" />
          </IonButtons>
          <IonTitle>{workshop?.name}</IonTitle>
          {workshop && (
            <IonButtons slot="end">
              <IonButton onClick={() => dispatch(findWorkshopById(id))}>
                <IonIcon slot="icon-only" icon={refresh}></IonIcon>
              </IonButton>
              <IonButton routerLink={router.routeInfo.pathname + "/update"}>
                <IonIcon slot="icon-only" icon={pencilOutline}></IonIcon>
              </IonButton>
              <IonButton
                routerLink={
                  router.routeInfo.pathname +
                  (router.routeInfo.pathname.endsWith("/")
                    ? "statistic"
                    : "/statistic")
                }
              >
                <IonIcon slot="icon-only" icon={barChartOutline} />
              </IonButton>
              <IonButton
                onClick={() =>
                  presentActionSheet({
                    buttons: [
                      {
                        text: "Xóa",
                        icon: trashOutline,
                        handler: () => {
                          if (role !== "owner") {
                            presentDeleteAlert({
                              header: "Bạn không thể xóa",
                              message:
                                "Bạn không có quyền xóa khi không phải chủ sở hữu",
                              buttons: ["OK!"],
                            });
                            return;
                          }
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
                          router.push(
                            router.routeInfo.pathname +
                              (router.routeInfo.pathname.endsWith("/")
                                ? "statistic"
                                : "/statistic")
                          );
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
          )}
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={segment}
            onIonChange={(e) => {
              if (
                e.detail.value === "info" ||
                e.detail.value === "statistic" ||
                e.detail.value === "amount"
              )
                setSegment(e.detail.value!);
            }}
          >
            <IonSegmentButton value="info">
              <IonLabel>Thông tin</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="statistic">
              <IonLabel>Thống kê</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="amount">
              <IonLabel>Giá công</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonLoading isOpen={!!loading} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2">
              <FancyContent isEmpty={!workshop}>
                <IonCard hidden={segment !== "info"} className="list-card">
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
                      <IonItem button onClick={handleCopy}>
                        <IonIcon icon={qrCodeOutline} slot="start"></IonIcon>
                        <IonInput
                          value={workshop?.code || "Hãy tạo code mới"}
                          readonly
                          onIonChange={() => {}}
                        />
                      </IonItem>
                      {workshop?.code && (
                        <IonItem  button onClick={handleCopy}>
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
                <AmountCard hide={segment !== "amount"} />
                <WorkshopInstantSummary hide={segment !== "statistic"} />
              </FancyContent>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
