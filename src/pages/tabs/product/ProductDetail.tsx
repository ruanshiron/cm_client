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
  IonListHeader,
  IonLoading,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../../store";
import {
  accessibilityOutline,
  barChartOutline,
  barcodeOutline,
  close,
  ellipsisVertical,
  pencilOutline,
  textOutline,
  trashOutline,
} from "ionicons/icons";
import { destroyProduct } from "../../../models/product";
import { toast } from "../../../utils/toast";
import { useDispatch } from "react-redux";
import {
  findProductById,
  removeProduct,
  statisticSelector,
} from "../../../store/data/productSlice";
import { fetchAllProcesses } from "../../../store/data/processSlice";

interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = () => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const uid = useSelector((state) => state.user.uid);
  const loading = useSelector((state) => state.loading.isLoading);
  const [presentActionSheet] = useIonActionSheet();
  const [presentDeleteAlert] = useIonAlert();
  const product = useSelector((state) =>
    state.products.find((item) => item.id === id)
  );
  const statistic = useSelector((state) => statisticSelector(state, id));
  const processes = useSelector((state) =>
    state.processes.filter((item) => product?.processes?.includes(item.id!))
  );
  const handleDeleteProduct = async () => {
    try {
      if (id) await destroyProduct(uid, id);

      toast("Xóa thành công!");
      dispatch(removeProduct(id));

      router.goBack();
    } catch (error) {
      toast("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  useEffect(() => {
    if (!product) dispatch(findProductById(id));
  }, [dispatch, id, product]);
  useEffect(() => {
    if (processes.length <= 0) dispatch(fetchAllProcesses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <>
      <IonPage className="list-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/product" />
            </IonButtons>
            <IonTitle>{product?.name}</IonTitle>

            <IonButtons slot="end">
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
                                handler: handleDeleteProduct,
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
                <IonIcon slot="icon-only" icon={ellipsisVertical} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonLoading isOpen={!!(loading && !product)} />
              <IonCol size="12" size-md="8" offsetMd="2">
                <IonCard className="list-card">
                  <IonCardContent>
                    <IonList style={{ border: "none " }} lines="full">
                      <IonItem>
                        <IonIcon slot="start" icon={textOutline}></IonIcon>
                        <IonLabel>
                          <b>{product?.name}</b>
                        </IonLabel>
                        <IonNote slot="end">Tên sản phẩm</IonNote>
                      </IonItem>
                      <IonItem>
                        <IonIcon slot="start" icon={barcodeOutline}></IonIcon>
                        <IonLabel>
                          <b>{product?.code}</b>
                        </IonLabel>
                        <IonNote slot="end">Mã sản phẩm</IonNote>
                      </IonItem>
                      <IonItem>
                        <IonIcon
                          slot="start"
                          icon={accessibilityOutline}
                        ></IonIcon>
                        <IonLabel>
                          {product?.sizes?.map((size, i) => (
                            <IonBadge key={i} style={{ marginRight: 4 }}>
                              {size}
                            </IonBadge>
                          ))}
                        </IonLabel>
                        <IonNote slot="end">Kích cỡ</IonNote>
                      </IonItem>
                    </IonList>
                    <IonListHeader>Quy trình sản xuất</IonListHeader>
                    {processes?.map((process, i) => {
                      return (
                        <IonItem key={i}>
                          {process.name}
                          <IonNote slot="end">
                            {process.pending && (
                              <IonBadge
                                color="warning"
                                style={{ marginLeft: 4 }}
                              >
                                {process.pending}
                              </IonBadge>
                            )}
                            {process.fulfilled && (
                              <IonBadge
                                color="success"
                                style={{ marginLeft: 4 }}
                              >
                                {process.fulfilled}
                              </IonBadge>
                            )}
                            {process.rejected && (
                              <IonBadge
                                color="danger"
                                style={{ marginLeft: 4 }}
                              >
                                {process.rejected}
                              </IonBadge>
                            )}
                          </IonNote>
                        </IonItem>
                      );
                    })}
                  </IonCardContent>
                </IonCard>
                <IonCard className="list-card">
                  <IonCardContent>
                    <IonItem lines="none">
                      <IonLabel>
                        <u>
                          <b>Thống kê tự động</b>
                        </u>
                      </IonLabel>
                      <IonNote slot="end">
                        từ {product?.statistic.from || "~"} đến{" "}
                        {product?.statistic.to || "~"}
                      </IonNote>
                    </IonItem>
                    <IonList lines="full" style={{ border: "none " }}>
                      {statistic.map((item, index) => (
                        <React.Fragment key={index}>
                          <IonItem>
                            <IonLabel className="ion-text-center">
                              <b>{item.pending.value}</b>
                              <p>{item.pending.label}</p>
                            </IonLabel>
                            <IonLabel className="ion-text-center">
                              <b>{item.fulfilled.value}</b>
                              <p>{item.fulfilled.label}</p>
                            </IonLabel>
                            <IonLabel className="ion-text-center">
                              <b>{item.rejected.value}</b>
                              <p>{item.rejected.label}</p>
                            </IonLabel>
                          </IonItem>
                        </React.Fragment>
                      ))}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <div style={{ padding: 100 }}></div>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};
