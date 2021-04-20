import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import React from "react";
import { useSelector } from "../../store";

export const FulfilledsItem: React.FC = () => {
  const items = useSelector((state) => {
    return state.products.map((p) => {
      const filtered = state.stages.filter(
        (e) => e.product?.split("/")[0] === p.id
      );
      const fulfilled =
        filtered
          .filter((e) => e.process?.split("/")[1] === "fulfilled")
          .map((v) => v.quantity)
          .reduce((p = 0, c = 0) => p + c, 0) || 0;

      return {
        product: p,
        fulfilled,
      };
    });
  });

  return (
    <>
      {items.length > 0 && (
        <IonCard className="list-card">
          <IonCardHeader style={{ padding: 16 }}>
            <IonCardSubtitle>Sản phẩm sẵn sàng</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList lines="full">
              {items.map(
                (item, i) =>
                  item.fulfilled !== 0 && (
                    <IonItem key={i}>
                      <IonLabel slot="start">{`${item.product.name} (${item.product.code})`}</IonLabel>
                      <IonNote slot="end">
                        <p>{item.fulfilled}</p>
                      </IonNote>
                    </IonItem>
                  )
              )}
            </IonList>
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
};
