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
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import * as Process from "../../../models/process";
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
import { removeProduct } from "../../../store/data/productSlice";

interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = () => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const uid = useSelector((state) => state.user.uid);

  const [showReportModal, setShowReportModal] = useState(false);

  const [presentActionSheet] = useIonActionSheet();
  const [presentDeleteAlert] = useIonAlert();

  const { product, processes, fields } = useSelector((state) => {
    const _product = state.products.find((x) => x.id === id);
    const _processes = state.processes;

    const events = state.stages.filter((v) => v.productId === id);
    const result = _.groupBy(events, "process");

    return {
      product: _product,
      processes: _processes,
      fields: Object.keys(result).map((key) => {
        const [id, type] = key.split("/");
        return {
          name:
            Process.ProcessEnum[type] +
            state.processes.find((i) => i.id === id)?.name,
          value: result[key].reduce((a, b) => a + (b ? b?.quantity! : 0), 0),
        };
      }),
    };
  });

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
                      <IonItemDivider>Thống kê tự động</IonItemDivider>
                      {fields &&
                        fields?.length > 0 &&
                        fields?.map((field: any, i) => {
                          return (
                            <IonItem detail={false} key={i}>
                              <IonLabel>{field.name}</IonLabel>
                              <IonNote slot="end">
                                <p>{field.value}</p>
                              </IonNote>
                            </IonItem>
                          );
                        })}
                      <IonItemDivider>Kích cỡ</IonItemDivider>
                      {product?.sizes?.map((size, i) => (
                        <IonItem key={i}>{size}</IonItem>
                      ))}
                      <IonItemDivider>Quy trình sản xuất</IonItemDivider>
                      {product?.processes?.map((process, i) => {
                        const item = processes.find((p) => process === p.id);
                        return (
                          <IonItem key={i}>
                            {item?.name}
                            <IonNote slot="end">
                              {item?.pending && (
                                <IonBadge
                                  color="warning"
                                  style={{ marginRight: 4 }}
                                >
                                  {item.pending}
                                </IonBadge>
                              )}
                              {item?.fulfilled && (
                                <IonBadge
                                  color="success"
                                  style={{ marginRight: 4 }}
                                >
                                  {item.fulfilled}
                                </IonBadge>
                              )}
                              {item?.rejected && (
                                <IonBadge
                                  color="danger"
                                  style={{ marginRight: 4 }}
                                >
                                  {item.rejected}
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
