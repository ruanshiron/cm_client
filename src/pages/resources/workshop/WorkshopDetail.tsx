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
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import {
  barChartOutline,
  cashOutline,
  close,
  copyOutline,
  ellipsisVertical,
  pencilOutline,
  personOutline,
  phonePortraitOutline,
  qrCodeOutline,
  shirtOutline,
  trashOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
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
import { stringFromToDate } from "../../../utils/date";
import { fetchAllProcesses } from "../../../store/data/processSlice";

interface WorkshopDetailProps {}

export const WorkshopDetail: React.FC<WorkshopDetailProps> = () => {
  const [presentDeleteAlert] = useIonAlert();
  const [presentActionSheet] = useIonActionSheet();
  const loading = useSelector((state) => state.loading.isLoading);
  const router = useIonRouter();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
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
    copy(workshop?.code || "Hãy tạo mã trước!");
    toast(workshop?.code ? "Sao chép thành công!" : "Hãy tạo mã trước!");
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
          </IonToolbar>
        </IonHeader>
        <IonLoading isOpen={!!(loading && !workshop)} />
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
                        readonly
                        onIonChange={() => {}}
                      />
                      <IonButtons slot="end">
                        <IonButton onClick={handleCopy}>
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
                      <IonLabel>
                        <b>Giá công</b>
                      </IonLabel>
                    </IonListHeader>
                    {workshop?.amounts.map((item, index) => (
                      <IonItem key={index}>
                        <IonIcon slot="start" icon={cashOutline} />
                        <IonLabel>
                          <b>{item.productName}</b>
                          <p>{stringFromToDate(item.fromDate, item.toDate)}</p>
                        </IonLabel>
                        <IonText color="dark">{item.amount}&nbsp;₫</IonText>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
              <IonCard className="list-card">
                <IonCardContent>
                  <IonList lines="none" style={{ border: "none" }} color="dark">
                    <IonListHeader>
                      <IonLabel>
                        <b>Thống kê tự động</b>
                      </IonLabel>
                    </IonListHeader>
                    {workshop?.statistic.products &&
                      Object.values(workshop?.statistic.products).map(
                        (item, index) => (
                          <div className="border-full ion-margin" key={index}>
                            <IonItemGroup>
                              <IonItem lines="full">
                                <IonIcon slot="start" icon={shirtOutline} />
                                <IonLabel>
                                  <b>{item.name}</b>
                                  <p>{item?.code}</p>
                                </IonLabel>
                              </IonItem>
                              {Object.keys(item.processes).map((i, j) => (
                                <IonItem lines="full" key={j}>
                                  <IonLabel
                                    className="ion-text-center ion-text-wrap"
                                    style={{ maxWidth: "40%" }}
                                  >
                                    <b>
                                      {(item.processes[i].pending || 0) +
                                        (item.processes[i].rejected || 0) -
                                        (item.processes[i].fulfilled || 0)}
                                    </b>
                                    &nbsp;
                                    <p>
                                      {
                                        processes.find((v) => v.id === i)
                                          ?.pending
                                      }
                                      &nbsp;(hiện tại)
                                    </p>
                                  </IonLabel>
                                  <IonLabel>
                                    <table className="small-table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <b>
                                              {item.processes[i].pending || 0}
                                            </b>
                                          </td>
                                          <td>
                                            <p>
                                              <i>
                                                {
                                                  processes.find(
                                                    (v) => v.id === i
                                                  )?.pending
                                                }
                                                &nbsp;(toàn bộ)
                                              </i>
                                            </p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <b>
                                              {item.processes[i].fulfilled || 0}
                                            </b>
                                          </td>
                                          <td>
                                            <p>
                                              <i>
                                                {
                                                  processes.find(
                                                    (v) => v.id === i
                                                  )?.fulfilled
                                                }
                                              </i>
                                            </p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <b>
                                              {item.processes[i].rejected || 0}
                                            </b>
                                          </td>
                                          <td>
                                            <p>
                                              <i>
                                                {
                                                  processes.find(
                                                    (v) => v.id === i
                                                  )?.rejected
                                                }
                                              </i>
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </IonLabel>
                                </IonItem>
                              ))}
                            </IonItemGroup>
                          </div>
                        )
                      )}
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
