import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonDatetime,
  IonButton,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  calendarClearOutline,
  calendarNumberOutline,
  refreshOutline,
  saveOutline,
} from "ionicons/icons";
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
  onReset?: () => void;
  onSave?: () => void;
}

const Datetime: React.FC<Props> = ({
  fromValue,
  toValue,
  onChangeFrom,
  onChangeTo,
  onCancelFrom,
  onCancelTo,
  onReset,
  onSave,
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
          <IonRow>
            {onReset && (
              <IonCol>
                <IonButton
                  fill="clear"
                  expand="block"
                  onClick={() => onReset()}
                >
                  <IonIcon icon={refreshOutline} slot="start" />
                  Đặt lại
                </IonButton>
              </IonCol>
            )}
            {onSave && (
              <IonCol>
                <IonButton fill="clear" expand="block" onClick={() => onSave()}>
                  <IonIcon icon={saveOutline} slot="start" />
                  Lưu
                </IonButton>
              </IonCol>
            )}
          </IonRow>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default Datetime;
