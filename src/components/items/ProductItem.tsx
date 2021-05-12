import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import React from "react";
import { Product } from "../../models/product";
import { useSelector } from "../../store";
import { statisticSelector } from "../../store/data/productSlice";

interface Props {
  product: Product;
}

export const ProductItem: React.FC<Props> = ({ product }) => {
  const statistic = useSelector((state) =>
    statisticSelector(state, product.id!)
  );
  return (
    <IonCard
      button
      className="list-card"
      routerLink={"/tabs/product/" + product.id}
    >
      <IonCardContent>
        <IonList lines="full" style={{ border: "none" }}>
          <IonItem detail={false}>
            <IonAvatar slot="start">
              <img src="/assets/icon/icon.png" alt="Speaker profile pic" />
            </IonAvatar>
            <IonLabel>
              <b>{product.name}</b>
              <p>Mã: {product.code}</p>
            </IonLabel>
          </IonItem>
          {statistic?.map((item, index) => (
            <React.Fragment key={index}>
              <IonItem>
                <IonLabel className="ion-text-center">
                  <b>{item.pending.value}</b>
                  <p>{item.pending.label}</p>
                </IonLabel>
                <IonLabel className="ion-text-center">
                  <b>{item.fulfilled.value}</b>
                  <p>{item.fulfilled.label}</p>
                </IonLabel>
                <IonLabel className="ion-text-center">
                  <b>{item.rejected.value}</b>
                  <p>{item.rejected.label}</p>
                </IonLabel>
              </IonItem>
            </React.Fragment>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
