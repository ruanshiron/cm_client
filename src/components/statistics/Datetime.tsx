import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonDatetime,
} from "@ionic/react";
import { calendarClearOutline, calendarNumberOutline } from "ionicons/icons";
import { DatetimeChangeEventDetail } from "@ionic/core";
import React from "react";

export const monthNames = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

interface Props {
  fromValue?: string;
  toValue?: string;
  onChangeFrom: (e: CustomEvent<DatetimeChangeEventDetail>) => void;
  onCancelFrom: (e: CustomEvent<void>) => void;
  onChangeTo: (e: CustomEvent<DatetimeChangeEventDetail>) => void;
  onCancelTo: (e: CustomEvent<void>) => void;
}

const Datetime: React.FC<Props> = ({
  fromValue,
  toValue,
  onChangeFrom,
  onChangeTo,
  onCancelFrom,
  onCancelTo,
}) => {
  return (
    <IonCard className="list-card">
      <IonCardContent>
        <IonList style={{ border: "none " }}>
          <IonItem>
            <IonIcon slot="start" icon={calendarClearOutline} />
            <IonLabel>
              <b>Từ ngày</b>
            </IonLabel>
            <IonDatetime
              displayFormat="DD MMMM, YYYY"
              doneText="OK!"
              cancelText="Hủy"
              monthNames={monthNames}
              value={fromValue || ""}
              onIonChange={onChangeFrom}
              onIonCancel={onCancelFrom}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={calendarNumberOutline} />
            <IonLabel>
              <b>Đến ngày</b>
            </IonLabel>
            <IonDatetime
              displayFormat="DD MMMM, YYYY"
              monthNames={monthNames}
              doneText="OK!"
              cancelText="Hủy"
              value={toValue || ""}
              onIonChange={onChangeTo}
              onIonCancel={onCancelTo}
            ></IonDatetime>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default Datetime;
