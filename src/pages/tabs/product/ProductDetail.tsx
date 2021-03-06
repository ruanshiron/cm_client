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
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../../store";
import {
  accessibilityOutline,
  barChartOutline,
  barcodeOutline,
  close,
  ellipsisVertical,
  pencilOutline,
  refresh,
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
import EmptyComponent from "../../../components/EmptyComponent";
import ProductSummary from "../../../components/statistics/ProductSummary";
import ImageCard from "../../../components/items/ImageCard";
import PricesContent from "../../../components/contents/PricesContent";
import AmountsContent from "../../../components/contents/AmountsContent";

interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = () => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const [segment, setSegment] = useState("info");
  const { id } = useParams<{ id: string }>();
  const { uid, role } = useSelector((state) => state.user);
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

      router.push("/tabs/product");
    } catch (error) {
      toast(error.message);
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
            {product && (
              <IonButtons slot="end">
                <IonButton onClick={() => dispatch(findProductById(id))}>
                  <IonIcon slot="icon-only" icon={refresh} />
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
            )}
          </IonToolbar>
          <IonToolbar hidden={!product}>
            <IonSegment
              value={segment}
              onIonChange={(e) => setSegment(e.detail.value!)}
            >
              <IonSegmentButton value="info">Thông tin</IonSegmentButton>
              <IonSegmentButton value="prices">Giá bán</IonSegmentButton>
              <IonSegmentButton value="amounts">Giá công</IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
        <IonContent hidden={segment !== "info"}>
          <EmptyComponent isEmpty={!product}>
            <IonGrid>
              <IonRow className="ion-justify-content-center">
                <IonLoading isOpen={!!(loading && !product)} />
                <IonCol size="12" size-md="8">
                  <ImageCard storageRef={`users/${uid}/products/${id}`} />
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
                  <ProductSummary product={product} statistic={statistic} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </EmptyComponent>
        </IonContent>
        <PricesContent hidden={segment !== "prices"} />
        <AmountsContent hidden={segment !== "amounts"} />
      </IonPage>
    </>
  );
};
