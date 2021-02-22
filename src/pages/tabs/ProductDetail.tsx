import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { shareOutline, shareSharp } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import { Field } from "../../models";
import { useSelector } from "../../store";

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

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/product" />
            </IonButtons>
            <IonTitle>{product?.name}</IonTitle>
            <IonButtons slot="end">
              <IonButton>
                <IonIcon
                  slot="icon-only"
                  ios={shareOutline}
                  md={shareSharp}
                ></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
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
        </IonContent>
      </IonPage>
    </>
  );
};
