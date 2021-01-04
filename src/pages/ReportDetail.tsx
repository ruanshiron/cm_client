import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { shareOutline, shareSharp } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "../store";
import _ from "lodash";
import { Field } from "../models/Report";

interface ReportDetailProps {}

export const ReportDetail: React.FC<ReportDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [fields, setFields] = useState<Field[]>();

  const report = useSelector((state) =>
    state.report.products.find((x) => x.id === id)
  );

  const events = useSelector((state) =>
    state.diary.events.filter((x) => x.productCode === id)
  );

  useEffect(() => {
    if (!report) return;

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
              <IonBackButton defaultHref="/tabs/report" />
            </IonButtons>
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
          <IonList lines="none">
            {fields?.map((field: any) => (
              <IonItem detail={false} key={field.name}>
                <IonLabel>
                  <h3>{field.name}</h3>
                </IonLabel>
                <IonNote slot="end">
                  <h3>{field.value}</h3>
                </IonNote>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};
