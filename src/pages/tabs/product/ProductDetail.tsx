import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
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
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import * as Process from "../../../models/process";
import { useSelector } from "../../../store";
import { analyticsOutline, pencil } from "ionicons/icons";
import { ProductModal } from "../../../components/modals/ProductModal";

interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams<{ id: string }>();

  const [showReportModal, setShowReportModal] = useState(false);

  const { product, processes, fields } = useSelector((state) => {
    const _product = state.data.products.find((x) => x.id === id);
    const _processes = state.data.processes;

    const events = state.data.events.filter((v) => v.product === id);
    const result = _.groupBy(events, "process");

    return {
      product: _product,
      processes: _processes,
      fields: Object.keys(result).map((key) => {
        const [id, type] = key.split("/");
        return {
          name:
            Process.ProcessEnum[type] +
            state.data.processes.find((i) => i.id === id)?.name,
          value: result[key].reduce((a, b) => a + (b ? b?.quantity! : 0), 0),
        };
      }),
    };
  });

  const router = useIonRouter();

  return (
    <>
      <IonPage className="list-page">
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink={router.routeInfo.pathname + "/update"}>
            <IonIcon icon={pencil}></IonIcon>
          </IonFabButton>
        </IonFab>

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
                <IonIcon slot="icon-only" icon={analyticsOutline} />
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
                      {product?.processes?.map((process, i) => (
                        <IonItem key={i}>
                          {processes.find((p) => process === p.id)?.name}
                        </IonItem>
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
