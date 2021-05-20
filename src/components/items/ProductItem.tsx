import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { storage } from "../../config/firebase";
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
  const { uid } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    storage
      .ref()
      .child(`users/${uid}/products/${product.id}`)
      .getDownloadURL()
      .then((url) => {
        setAvatar(url);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              <img
                src={avatar || "/assets/icon/icon.png"}
                alt="Speaker profile pic"
              />
            </IonAvatar>
            <IonLabel>
              <b>{product.name}</b>
              <p>Mã: {product.code}</p>
            </IonLabel>
          </IonItem>
          {statistic?.map((item, index) => (
            <IonItem key={index}>
              <IonLabel color="warning" className="ion-text-center">
                <b>{item.pending.value}</b>
                <p>{item.pending.label}</p>
              </IonLabel>
              <IonLabel color="success" className="ion-text-center">
                <b>{item.fulfilled.value}</b>
                <p>{item.fulfilled.label}</p>
              </IonLabel>
              <IonLabel color="danger" className="ion-text-center">
                <b>{item.rejected.value}</b>
                <p>{item.rejected.label}</p>
              </IonLabel>
              <IonLabel className="ion-text-center">
                <b>
                  {item.pending.value +
                    item.rejected.value -
                    item.fulfilled.value}
                </b>
                <p>Chưa&nbsp;{item.fulfilled.label}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
