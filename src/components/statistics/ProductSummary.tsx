import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import React from "react";
import { stringFromToDate } from "../../utils/date";
import { Product } from "../../models/product";

interface Props {
  product?: Product;
  statistic?: {
    pending: {
      label: string;
      value: any;
    };
    fulfilled: {
      label: string;
      value: any;
    };
    rejected: {
      label: string;
      value: any;
    };
  }[];
}

const ProductSummary: React.FC<Props> = ({ statistic, product }) => {
  return (
    <IonCard className="list-card">
      <IonCardContent>
        <IonItem lines="none">
          <IonLabel>
            <u>
              <b>Tổng hợp</b>
            </u>
          </IonLabel>
          <IonNote className="ion-text-wrap" slot="end">
            {stringFromToDate(product?.statistic?.from, product?.statistic?.to)}
          </IonNote>
        </IonItem>
        {statistic?.map((item, index) => (
          <React.Fragment key={index}>
            <IonItem>
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
          </React.Fragment>
        ))}
      </IonCardContent>
    </IonCard>
  );
};

export default ProductSummary;
