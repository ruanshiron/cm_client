import React from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonItemDivider,
  IonAvatar,
} from "@ionic/react";

import * as _ from "lodash";

const samples = _.groupBy(
  [
    {
      date: "11.10",
      quatity: 202,
      productCode: "56",
      role: "receive",
    },
    {
      date: "11.7",
      quatity: 217,
      productCode: "35",
      role: "receive",
    },
    {
      date: "11.5",
      quatity: 217,
      productCode: "35",
      role: "receive",
    },
    {
      date: "11.1",
      quatity: 203,
      productCode: "45",
      role: "receive",
    },
    {
      date: "10.30",
      quatity: 612,
      productCode: "38.XXL",
      role: "receive",
    },
    {
      date: "10.26",
      quatity: 242,
      productCode: "35.XXL",
      role: "receive",
    },
    {
      date: "10.24",
      quatity: 205,
      productCode: "45.XL",
      role: "receive",
    },
    // return
    {
      date: "11.5",
      quatity: 170,
      productCode: "45",
      role: "return",
    },
    {
      date: "10.30",
      quatity: 612,
      productCode: "38.XXL",
      role: "return",
    },
    {
      date: "10.28",
      quatity: 274,
      productCode: "38.XXL",
      role: "return",
    },
    {
      date: "10.28",
      quatity: 274,
      productCode: "38.XXL",
      role: "return",
    },
    {
      date: "10.27",
      quatity: 60,
      productCode: "38.XL",
      role: "return",
    },
    {
      date: "10.27",
      quatity: 165,
      productCode: "38.XL",
      role: "return",
    },
  ],
  "date"
);

export const EventList: React.FC = () => {
  return (
    <IonList lines="none">
      {Object.keys(samples).map((group) => (
        <>
          <IonItemDivider sticky>{group}</IonItemDivider>
          {samples[group].map((item) => (
            <IonItem>
              <IonAvatar slot="start">
                <img alt="" src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              </IonAvatar>
              <IonLabel>
                <h2>Xưởng 1</h2>
                <h3>
                  <b>{item.role === "return" ? "Trả" : "Nhận"}</b>{" "}
                  {item.quatity} {item.productCode}
                </h3>
                <p>Dự định về kho vào ngày 22.8</p>
              </IonLabel>
            </IonItem>
          ))}
        </>
      ))}
    </IonList>
  );
};
