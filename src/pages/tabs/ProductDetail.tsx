import {
  IonAvatar,
  IonBackButton,
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
import React, { useEffect } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import { ProcessEnum } from "../../models";
import { useSelector } from "../../store";
import { useProductForm } from "../../hooks/useProductForm";
import { pencil } from "ionicons/icons";

interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams<{ id: string }>();

  const product = useSelector((state) =>
    state.data.products.find((x) => x.id === id)
  );

  const processes = useSelector((state) => state.data.processes);

  const fields = useSelector((state) => {
    const result = _.groupBy(state.data.events, "process");

    return Object.keys(result).map((key) => {
      return {
        name: key,
        value: result[key].reduce((a, b) => a + (b ? b?.quantity! : 0), 0),
      };
    });
  });

  const router = useIonRouter();

  const form = useProductForm();

  useEffect(() => {
    if (product) form.setFieldsValue(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <>
      <IonPage class="list-page">
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink={router.routeInfo.pathname + "/update"}>
            <IonIcon icon={pencil}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/product" />
            </IonButtons>
            <IonTitle>{product?.name}</IonTitle>

            <IonButtons slot="end"></IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="8" offsetMd="2">
                {fields && fields?.length > 0 && (
                  <IonCard className="list-card">
                    <IonCardContent>
                      <IonList lines="full" style={{ borderTop: "none" }}>
                        {fields?.map((field: any) => {
                          const [id, type] = field.name.split("/");
                          return (
                            <IonItem detail={false} key={field.name}>
                              <IonLabel>
                                {ProcessEnum[type] +
                                  processes.find((i) => i.id === id)?.name}
                              </IonLabel>
                              <IonNote slot="end">
                                <p>{field.value}</p>
                              </IonNote>
                            </IonItem>
                          );
                        })}
                      </IonList>
                    </IonCardContent>
                  </IonCard>
                )}
                <IonCard className="list-card">
                  <IonCardHeader>
                    <IonItem
                      button
                      detail={false}
                      lines="none"
                      className="list-item"
                    >
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
                      <IonItemDivider>Kích cỡ</IonItemDivider>
                      {product?.sizes?.map((size, i) => (
                        <IonItem>{size}</IonItem>
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
