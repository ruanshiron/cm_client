import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
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
  close,
  ellipsisVertical,
  pencilOutline,
  refresh,
  trashOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../../store";
import { destroyWorkshop, findWorkshop } from "../../../models/workshop";
import { useDispatch } from "react-redux";
import {
  removeWorkshop,
  findWorkshopById,
  updateWorkshop,
} from "../../../store/data/workshopSlice";
import { toast } from "../../../utils/toast";
import { fetchAllProcesses } from "../../../store/data/processSlice";
import FancyContent from "../../../components/EmptyComponent";
import AmountCard from "../../../components/statistics/AmountCard";
import WorkshopInstantSummary from "../../../components/statistics/WorkshopInstantSummary";
import { RefresherEventDetail } from "@ionic/core";
import WorkshopInfoTab from "../../../components/statistics/WorkshopInfoTab";
import WorkshopPaymentTab from "../../../components/statistics/WorkshopPaymentTab";
import AmountsContent from "../../../components/contents/AmountsContent";

interface WorkshopDetailProps {}

export const WorkshopDetail: React.FC<WorkshopDetailProps> = () => {
  const [presentDeleteAlert] = useIonAlert();
  const [presentActionSheet] = useIonActionSheet();
  const [segment, setSegment] = useState<
    "info" | "statistic" | "amount" | "payment"
  >("statistic");
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
      toast(error.message);
    }
  };
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    findWorkshop(uid, id)
      .then((doc) => {
        if (doc) {
          dispatch(updateWorkshop(doc));
        }
        event.detail.complete();
      })
      .catch(() => {
        toast("Có lỗi xảy ra, không thể làm mới!");
        event.detail.complete();
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
        <IonToolbar hidden={!workshop}>
          <IonSegment
            scrollable
            value={segment}
            onIonChange={(e) => {
              if (
                e.detail.value === "info" ||
                e.detail.value === "statistic" ||
                e.detail.value === "payment" ||
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
            <IonSegmentButton value="payment">
              <IonLabel>Thanh toán</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonProgressBar
        className={loading ? "" : "ion-hide"}
        type="indeterminate"
        slot="fixed"
      />
      <IonContent hidden={segment === "amount"}>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <FancyContent isEmpty={!workshop}>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="8" offsetMd="2">
                <WorkshopInfoTab hide={segment !== "info"} />
                <AmountCard hide={segment !== "amount"} />
                <WorkshopInstantSummary hide={segment !== "statistic"} />
                <WorkshopPaymentTab hide={segment !== "payment"} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </FancyContent>
      </IonContent>
      <AmountsContent hidden={segment !== "amount"} workshop />
    </IonPage>
  );
};
