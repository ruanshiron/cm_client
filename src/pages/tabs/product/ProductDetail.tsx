import {
  IonAvatar,
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../../store";
import {
  barChartOutline,
  close,
  ellipsisVertical,
  pencilOutline,
  trashOutline,
} from "ionicons/icons";
import { ProductModal } from "../../../components/modals/ProductModal";
import { destroyProduct } from "../../../models/product";
import { toast } from "../../../utils/toast";
import { useDispatch } from "react-redux";
import {
  findProductById,
  removeProduct,
} from "../../../store/data/productSlice";
import { fetchAllProcesses } from "../../../store/data/processSlice";

interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = () => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const uid = useSelector((state) => state.user.uid);
  const loading = useSelector((state) => state.loading.isLoading);
  const [showReportModal, setShowReportModal] = useState(false);
  const [presentActionSheet] = useIonActionSheet();
  const [presentDeleteAlert] = useIonAlert();
  const product = useSelector((state) =>
    state.products.find((item) => item.id === id)
  );
  const processes = useSelector((state) =>
    state.processes.filter((item) => product?.processes.includes(item.id!))
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
        <ProductModal
          showModal={showReportModal}
          onDismiss={() => setShowReportModal(false)}
        />

        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/product" />
            </IonButtons>
            <IonTitle>{product?.name}</IonTitle>

            <IonButtons slot="end">
              <IonButton onClick={() => setShowReportModal(true)}>
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
                  <IonCardHeader>
                    <IonItem detail={false} lines="none" className="list-item">
                      <IonAvatar slot="start">
                        <img
                          src="/assets/icon/icon.png"
                          alt="Speaker profile pic"
                        />
                      </IonAvatar>
                      <IonLabel>
                        <h2>{product?.name}</h2>
                        <p>{product?.code}</p>
                      </IonLabel>
                    </IonItem>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      <IonItemDivider>
                        Thống kê tự động (đang xử lý)
                      </IonItemDivider>

                      <IonItemDivider>Kích cỡ</IonItemDivider>
                      {product?.sizes?.map((size, i) => (
                        <IonItem key={i}>{size}</IonItem>
                      ))}
                      <IonItemDivider>Quy trình sản xuất</IonItemDivider>
                      {processes?.map((process, i) => {
                        return (
                          <IonItem key={i}>
                            {process.name}
                            <IonNote slot="end">
                              {process.pending && (
                                <IonBadge
                                  color="warning"
                                  style={{ marginRight: 4 }}
                                >
                                  {process.pending}
                                </IonBadge>
                              )}
                              {process.fulfilled && (
                                <IonBadge
                                  color="success"
                                  style={{ marginRight: 4 }}
                                >
                                  {process.fulfilled}
                                </IonBadge>
                              )}
                              {process.rejected && (
                                <IonBadge
                                  color="danger"
                                  style={{ marginRight: 4 }}
                                >
                                  {process.rejected}
                                </IonBadge>
                              )}
                            </IonNote>
                          </IonItem>
                        );
                      })}
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
