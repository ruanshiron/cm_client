import {
  IonAlert,
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
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import { Field } from "../../models";
import { useSelector } from "../../store";
import ProductForm from "../../components/forms/ProductForm";
import { useProductForm } from "../../hooks/useProductForm";
import { closeOutline, pencil } from "ionicons/icons";

const parseFieldName = (key: string) => {
  switch (key) {
    case "sent":
      return "Đã sản xuất";

    case "failure":
      return "Lỗi";

    case "received":
      return "Trong kho";

    case "fixed":
      return "Đã sửa";

    default:
      return "???";
  }
};

interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [fields, setFields] = useState<Field[]>();
  const [edit, setEdit] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const product = useSelector((state) =>
    state.data.products.find((x) => x.id === id)
  );

  const events = useSelector((state) =>
    state.data.events.filter((x) => x.productCode === id)
  );

  useEffect(() => {
    if (!product || !events) return;

    const result = _.groupBy(events, "typeCode");

    const newFields = Object.keys(result).map((key) => {
      return {
        name: key,
        value: result[key].reduce((a, b) => a + (b ? b?.quantity! : 0), 0),
      };
    });

    setFields(newFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useProductForm();

  const fabHanler = () => {
    if (edit) {
      form.submit();
      return;
    }
    setEdit(true);
  };

  useEffect(() => {
    if (product) form.setFieldsValue(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <>
      <IonPage class="list-page">
        {!edit && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => fabHanler()}>
              <IonIcon icon={pencil}></IonIcon>
            </IonFabButton>
          </IonFab>
        )}

        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              {edit ? (
                <IonButton onClick={() => setShowCancelAlert(true)}>
                  <IonIcon slot="icon-only" icon={closeOutline} />
                </IonButton>
              ) : (
                <IonBackButton defaultHref="/tabs/product" />
              )}
            </IonButtons>
            <IonTitle>{product?.name}</IonTitle>

            <IonButtons slot="end">
              {edit && (
                <IonButton type="submit" onClick={form.submit}>
                  Lưu
                </IonButton>
              )}
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="8" offsetMd="2">
                {fields && fields?.length > 0 && (
                  <IonCard>
                    <IonCardContent>
                      {fields?.map((field: any) => (
                        <IonItem detail={false} key={field.name}>
                          <IonLabel>
                            <h3>{parseFieldName(field.name)}</h3>
                          </IonLabel>
                          <IonNote slot="end">
                            <h3>{field.value}</h3>
                          </IonNote>
                        </IonItem>
                      ))}
                    </IonCardContent>
                  </IonCard>
                )}
                {edit ? (
                  <>
                    <ProductForm form={form} />
                  </>
                ) : (
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
                            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
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
                          <IonItem>{process}</IonItem>
                        ))}
                      </IonList>
                    </IonCardContent>
                  </IonCard>
                )}
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
                console.log("Confirm Cancel: blah");
              },
            },
            {
              text: "thoát",
              handler: () => {
                setEdit(false);
                if (product) form.setFieldsValue(product);
              },
            },
          ]}
        />
      </IonPage>
    </>
  );
};
