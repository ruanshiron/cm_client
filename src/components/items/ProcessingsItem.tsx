import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import React from "react";
import { useSelector } from "../../store";

interface Props {}

export const ProcessingsItem: React.FC<Props> = () => {
  const items = useSelector((state) => {
    return state.workshops.map((w) => {
      const products = state.products.map((p) => {
        const filtered = state.stages.filter(
          (e) => e.workshop === w.id && e.product?.split("/")[0] === p.id
        );
        const fulfilled =
          filtered
            .filter((e) => e.process?.split("/")[1] === "fulfilled")
            .map((v) => v.quantity)
            .reduce((p = 0, c = 0) => p + c, 0) || 0;
        const pending =
          filtered
            .filter((e) => e.process?.split("/")[1] === "pending")
            .map((v) => v.quantity)
            .reduce((p = 0, c = 0) => p + c, 0) || 0;
        const rejected =
          filtered
            .filter((e) => e.process?.split("/")[1] === "rejected")
            .map((v) => v.quantity)
            .reduce((p = 0, c = 0) => p + c, 0) || 0;

        return {
          product: p,
          now_pending: pending - fulfilled - rejected,
        };
      });

      return {
        workshop: w,
        products: products,
      };
    });
  });

  return (
    <>
      {items.length > 0 && (
        <IonCard className="list-card">
          <IonCardHeader style={{ padding: 16 }}>
            <IonCardSubtitle>Đang trong quá trình sản xuất</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList lines="full">
              {items.map((item, i) => (
                <React.Fragment key={i}>
                  <IonItemDivider>{item.workshop.name}</IonItemDivider>
                  {item.products.map(
                    (p, j) =>
                      p.now_pending !== 0 && (
                        <IonItem key={j}>
                          <IonLabel slot="start">{`${p.product.name} (${p.product.code})`}</IonLabel>
                          <IonNote slot="end">
                            <p>{p.now_pending}</p>
                          </IonNote>
                        </IonItem>
                      )
                  )}
                </React.Fragment>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
};
