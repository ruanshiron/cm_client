import React from "react";
import { IonNote, IonItem, IonLabel } from "@ionic/react";
import * as Event from "../../models/stage";
import { useEventForm } from "../../hooks/useEventForm";
import { EventModal } from "../modals/EventModal";

interface EventItemProps {
  data: Event.Stage;
}

const EventItem: React.FC<EventItemProps> = ({ data }) => {
  const form = useEventForm(data);

  const noteColor = (status?: string) => {
    if (!status) return "primary";
    if (status.endsWith("fulfilled")) return "success";
    if (status.endsWith("pending")) return "warning";
    if (status.endsWith("rejected")) return "danger";
  };

  return (
    <>
      <IonItem
        onClick={() => form.setShowEventForm(true)}
        button
        detail={false}
      >
        <>
          <IonLabel className={noteColor(data.processStatus)}>
            <h2>
              {data.workshopName}・<b>{data.processLabel}</b>
            </h2>
            <p>
              {data.productName} / {data.productSize}
            </p>
          </IonLabel>
          <IonNote slot="end" color={noteColor(data.processStatus)}>
            <h4>{data.quantity}</h4>
          </IonNote>
        </>
      </IonItem>

      <EventModal form={form} />
    </>
  );
};

export default React.memo(EventItem);
