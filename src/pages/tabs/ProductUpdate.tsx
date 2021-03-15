import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../store";
import ProductForm from "../../components/forms/ProductForm";
import { useProductForm } from "../../hooks/useProductForm";
import { closeOutline } from "ionicons/icons";

interface ProductUpdateProps {}

export const ProductUpdate: React.FC<ProductUpdateProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const product = useSelector((state) =>
    state.data.products.find((x) => x.id === id)
  );
  
  const form = useProductForm();

  const router = useIonRouter();

  useEffect(() => {
    if (product) form.setFieldsValue(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <>
      <IonPage class="list-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowCancelAlert(true)}>
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle>SỬA</IonTitle>

            <IonButtons slot="end">
              <IonButton type="submit" onClick={form.submit}>
                Lưu
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="8" offsetMd="2">
                <ProductForm form={form} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>

        <IonAlert
          isOpen={showCancelAlert}
          onDidDismiss={() => setShowCancelAlert(false)}
          header="Hủy?"
          message={
            "Bạn có thực sự muốn thoát và không lưu thông tin này lại không?"
          }
          buttons={[
            {
              text: "ở lại",
              role: "cancel",
              handler: (blah) => {
                console.log("Stay");
              },
            },
            {
              text: "thoát",
              handler: () => {
                if (product) form.setFieldsValue(product);
                router.goBack();
              },
            },
          ]}
        />
      </IonPage>
    </>
  );
};
