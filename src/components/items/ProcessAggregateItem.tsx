import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonText,
} from "@ionic/react";
import React from "react";
import * as Process from "../../models/process";
import { useSelector } from "../../store";

interface Props {
  process: Process.Skeleton;
}

export const ProcessAggregateItem: React.FC<Props> = ({ process }) => {
  const aggregate = useSelector((state) =>
    state.data.events
      .filter(
        (v) =>
          v.process?.split("/")[0] === process.id &&
          v.process?.split("/")[1] === "fulfilled"
      )
      .map((v) => v.quantity)
      .reduce((p = 0, c = 0) => p + c, 0)
  );

  return (
    <IonCard className="stat" style={{ border: "none" }}>
      <IonCardHeader>
        <IonCardSubtitle>{`${Process.ProcessEnum["fulfilled"]}${process.name}`}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText color="dark">
          <h1>{aggregate}</h1>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};
